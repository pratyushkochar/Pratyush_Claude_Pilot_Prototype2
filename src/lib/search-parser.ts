import Fuse, { type IFuseOptions } from "fuse.js";
import type { OfferTransaction } from "@/types/offer-transaction";

// ---------------------------------------------------------------------------
// NL Mappings (from spec)
// ---------------------------------------------------------------------------

const NL_VENDOR_MAP: Record<string, string> = {
  forter: "Forter",
  lexisnexis: "LexisNexis",
  lexis: "LexisNexis",
  accertify: "Accertify",
  sdn: "LexisNexis",
  ofac: "LexisNexis",
  stripe: "Stripe",
  adyen: "Adyen",
  braintree: "Braintree",
  worldpay: "Worldpay",
  "checkout.com": "Checkout.com",
  checkout: "Checkout.com",
};

const NL_DECISION_MAP: Record<string, string> = {
  declined: "decline",
  declines: "decline",
  decline: "decline",
  approved: "approve",
  approvals: "approve",
  approve: "approve",
  review: "review",
  reviews: "review",
  rejected: "decline",
  hit: "decline",
  clear: "approve",
};

const NL_PAYMENT_STEP_MAP: Record<string, string> = {
  authorized: "Authorization",
  authorization: "Authorization",
  auth: "Authorization",
  captured: "Capture",
  capture: "Capture",
  refunded: "Refund",
  refund: "Refund",
  credited: "Credit",
  credit: "Credit",
  settled: "Capture",
  settlement: "Capture",
};

const NL_STATUS_MAP: Record<string, string> = {
  pending: "pending",
  processing: "processing",
  completed: "completed",
  failed: "failed",
  cancelled: "cancelled",
};

const NL_RISK_MAP: Record<string, string> = {
  low: "low",
  medium: "medium",
  high: "high",
  critical: "critical",
};

const NL_TIMEFRAME_MAP: Record<string, number> = {
  today: 0,
  yesterday: 1,
  "this week": 7,
  "last week": 14,
  "this month": 30,
};

// Amount patterns: "over $500", "above $1,000", "greater than 500", "> $200"
const NL_AMOUNT_GT =
  /(?:over|above|greater\s+than|more\s+than|>)\s*\$?([\d,]+(?:\.\d+)?)/i;
// "under $500", "below $1,000", "less than 500", "< $200"
const NL_AMOUNT_LT =
  /(?:under|below|less\s+than|<)\s*\$?([\d,]+(?:\.\d+)?)/i;

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

export interface SearchFilters {
  status?: string;
  riskVendor?: string;
  riskDecision?: string;
  paymentStep?: string;
  riskLevel?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  paymentMethod?: string;
  daysAgo?: number;
  offerIdLookup?: string;
}

export interface ParsedQuery {
  filters: SearchFilters;
  remainingText: string;
}

// ---------------------------------------------------------------------------
// Parser
// ---------------------------------------------------------------------------

function isOfferLookup(query: string): string | null {
  const trimmed = query.trim();
  // Pure numeric -> offer lookup
  if (/^\d{5,}$/.test(trimmed)) return trimmed;
  // OFR-prefixed
  const ofrMatch = trimmed.match(/^OFR-?(\d+)$/i);
  if (ofrMatch) return ofrMatch[0].toUpperCase();
  return null;
}

export function parseSearchQuery(query: string): ParsedQuery {
  const filters: SearchFilters = {};
  let remaining = query;

  // --- Mode 1: Offer lookup ---
  const offerLookup = isOfferLookup(remaining);
  if (offerLookup) {
    filters.offerIdLookup = offerLookup;
    return { filters, remainingText: "" };
  }

  // --- Mode 2: NL query parsing ---

  // 1. Extract explicit key:value pairs first (power-user syntax)
  const keyValuePattern =
    /\b(status|vendor|risk|method|currency|decision|step):(\S+)/gi;
  let match;
  while ((match = keyValuePattern.exec(remaining)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[2];
    switch (key) {
      case "status":
        filters.status = value.toLowerCase();
        break;
      case "vendor":
        filters.riskVendor = NL_VENDOR_MAP[value.toLowerCase()] ?? value;
        break;
      case "risk":
        filters.riskLevel = value.toLowerCase();
        break;
      case "method":
        filters.paymentMethod = value.toLowerCase();
        break;
      case "currency":
        filters.currency = value.toUpperCase();
        break;
      case "decision":
        filters.riskDecision =
          NL_DECISION_MAP[value.toLowerCase()] ?? value.toLowerCase();
        break;
      case "step":
        filters.paymentStep =
          NL_PAYMENT_STEP_MAP[value.toLowerCase()] ?? value;
        break;
    }
  }
  remaining = remaining.replace(keyValuePattern, "").trim();

  // 2. Extract explicit amount comparisons (amount>1000, amount<500)
  const amountGtExplicit = /amount\s*>\s*([\d,]+(?:\.\d+)?)/gi;
  const amountLtExplicit = /amount\s*<\s*([\d,]+(?:\.\d+)?)/gi;
  let amountMatch;
  while ((amountMatch = amountGtExplicit.exec(remaining)) !== null) {
    filters.minAmount = parseFloat(amountMatch[1].replace(/,/g, ""));
  }
  remaining = remaining.replace(amountGtExplicit, "").trim();
  while ((amountMatch = amountLtExplicit.exec(remaining)) !== null) {
    filters.maxAmount = parseFloat(amountMatch[1].replace(/,/g, ""));
  }
  remaining = remaining.replace(amountLtExplicit, "").trim();

  // 3. Extract NL amount phrases ("over $500", "under $1,000")
  const gtMatch = NL_AMOUNT_GT.exec(remaining);
  if (gtMatch && filters.minAmount == null) {
    filters.minAmount = parseFloat(gtMatch[1].replace(/,/g, ""));
    remaining = remaining.replace(gtMatch[0], "").trim();
  }
  const ltMatch = NL_AMOUNT_LT.exec(remaining);
  if (ltMatch && filters.maxAmount == null) {
    filters.maxAmount = parseFloat(ltMatch[1].replace(/,/g, ""));
    remaining = remaining.replace(ltMatch[0], "").trim();
  }

  // 4. Extract timeframe phrases (multi-word first, then single-word)
  const lowerRemaining = remaining.toLowerCase();
  for (const [phrase, days] of Object.entries(NL_TIMEFRAME_MAP).sort(
    (a, b) => b[0].length - a[0].length
  )) {
    if (lowerRemaining.includes(phrase)) {
      filters.daysAgo = days;
      remaining = remaining.replace(new RegExp(phrase, "i"), "").trim();
      break;
    }
  }

  // 5. Extract NL keywords from remaining words
  const words = remaining.split(/\s+/).filter(Boolean);
  const unconsumed: string[] = [];

  for (const word of words) {
    const lower = word.toLowerCase().replace(/[^a-z.]/g, "");
    if (!lower) {
      unconsumed.push(word);
      continue;
    }

    if (!filters.riskVendor && NL_VENDOR_MAP[lower]) {
      filters.riskVendor = NL_VENDOR_MAP[lower];
    } else if (!filters.riskDecision && NL_DECISION_MAP[lower]) {
      filters.riskDecision = NL_DECISION_MAP[lower];
    } else if (!filters.paymentStep && NL_PAYMENT_STEP_MAP[lower]) {
      filters.paymentStep = NL_PAYMENT_STEP_MAP[lower];
    } else if (!filters.status && NL_STATUS_MAP[lower]) {
      filters.status = NL_STATUS_MAP[lower];
    } else if (!filters.riskLevel && NL_RISK_MAP[lower]) {
      filters.riskLevel = NL_RISK_MAP[lower];
    } else {
      // Skip common filler words
      const FILLER = new Set([
        "show",
        "me",
        "all",
        "the",
        "with",
        "for",
        "from",
        "in",
        "a",
        "an",
        "and",
        "or",
        "of",
        "to",
        "that",
        "are",
        "is",
        "transactions",
        "offers",
        "payments",
      ]);
      if (!FILLER.has(lower)) {
        unconsumed.push(word);
      }
    }
  }

  remaining = unconsumed.join(" ").replace(/\s+/g, " ").trim();
  return { filters, remainingText: remaining };
}

// ---------------------------------------------------------------------------
// Filter application
// ---------------------------------------------------------------------------

function applyFilters(
  transactions: OfferTransaction[],
  filters: SearchFilters
): OfferTransaction[] {
  const now = new Date();

  return transactions.filter((tx) => {
    // Offer ID direct lookup
    if (filters.offerIdLookup) {
      const lookup = filters.offerIdLookup;
      if (
        tx.offerId !== lookup &&
        !tx.offerId.includes(lookup) &&
        !tx.offerId.replace("OFR-", "").includes(lookup)
      ) {
        return false;
      }
    }

    // Transaction status
    if (filters.status && tx.status !== filters.status) return false;

    // Risk vendor (check riskVendors array, not just the PSP vendor)
    if (filters.riskVendor) {
      const vendorLower = filters.riskVendor.toLowerCase();
      const hasVendor = tx.riskVendors.some(
        (rv) => rv.vendorName.toLowerCase() === vendorLower
      );
      const isPsp = tx.vendor.name.toLowerCase() === vendorLower;
      if (!hasVendor && !isPsp) return false;
    }

    // Risk decision (check riskVendors decisions)
    if (filters.riskDecision) {
      const hasDecision = tx.riskVendors.some(
        (rv) =>
          rv.decision === filters.riskDecision &&
          (!filters.riskVendor ||
            rv.vendorName.toLowerCase() ===
              filters.riskVendor!.toLowerCase())
      );
      if (!hasDecision) return false;
    }

    // Payment lifecycle step status
    if (filters.paymentStep) {
      const step = tx.lifecycleSteps.find(
        (ls) => ls.name === filters.paymentStep
      );
      if (!step || step.status === "skipped" || step.status === "pending")
        return false;
    }

    // Risk level
    if (filters.riskLevel && tx.risk.level !== filters.riskLevel) return false;

    // Amount range
    if (filters.minAmount != null && tx.amount < filters.minAmount)
      return false;
    if (filters.maxAmount != null && tx.amount > filters.maxAmount)
      return false;

    // Currency
    if (filters.currency && tx.currency !== filters.currency) return false;

    // Payment method
    if (filters.paymentMethod && tx.paymentMethod !== filters.paymentMethod)
      return false;

    // Timeframe
    if (filters.daysAgo != null) {
      const txDate = new Date(tx.createdAt);
      const cutoff = new Date(now);
      cutoff.setDate(cutoff.getDate() - filters.daysAgo);
      cutoff.setHours(0, 0, 0, 0);
      if (txDate < cutoff) return false;
    }

    return true;
  });
}

// ---------------------------------------------------------------------------
// Fuse.js fuzzy fallback
// ---------------------------------------------------------------------------

const fuseOptions: IFuseOptions<OfferTransaction> = {
  keys: [
    "offerId",
    "customerName",
    "vendor.name",
    "vendor.code",
    "status",
    "paymentMethod",
    "currency",
    "riskVendors.vendorName",
  ],
  threshold: 0.3,
  includeScore: true,
};

// ---------------------------------------------------------------------------
// Main search entry point
// ---------------------------------------------------------------------------

export function searchTransactions(
  transactions: OfferTransaction[],
  query: string
): OfferTransaction[] {
  if (!query.trim()) {
    return transactions;
  }

  const { filters, remainingText } = parseSearchQuery(query);

  // Apply structured filters first
  const hasFilters = Object.keys(filters).length > 0;
  let filtered = hasFilters
    ? applyFilters(transactions, filters)
    : transactions;

  // Apply fuzzy search on remaining text
  if (remainingText) {
    const fuse = new Fuse(filtered, fuseOptions);
    const results = fuse.search(remainingText);
    filtered = results.map((result) => result.item);
  }

  return filtered;
}
