import Fuse, { type IFuseOptions } from "fuse.js";
import type { OfferTransaction } from "@/types/offer-transaction";

export interface SearchFilters {
  status?: string;
  vendor?: string;
  riskLevel?: string;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  paymentMethod?: string;
}

export interface ParsedQuery {
  filters: SearchFilters;
  remainingText: string;
}

const STATUS_KEYWORDS = ["pending", "processing", "completed", "failed", "cancelled", "refunded"];
const RISK_KEYWORDS = ["low", "medium", "high", "critical"];
const VENDOR_KEYWORDS = ["stripe", "adyen", "braintree", "worldpay", "checkout.com", "checkout"];

/**
 * Parses a search query into structured filters and remaining free text.
 *
 * Supports:
 * - Key:value pairs: `status:failed`, `vendor:Stripe`, `risk:high`, `method:credit_card`, `currency:USD`
 * - Amount comparisons: `amount>1000`, `amount<500`
 * - Natural language keywords: "failed" → status filter, "Stripe" → vendor filter
 */
export function parseSearchQuery(query: string): ParsedQuery {
  const filters: SearchFilters = {};
  let remaining = query;

  // Extract key:value pairs
  const keyValuePattern = /\b(status|vendor|risk|method|currency):(\S+)/gi;
  let match;
  while ((match = keyValuePattern.exec(remaining)) !== null) {
    const key = match[1].toLowerCase();
    const value = match[2];

    switch (key) {
      case "status":
        filters.status = value.toLowerCase();
        break;
      case "vendor":
        filters.vendor = value;
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
    }
  }
  remaining = remaining.replace(keyValuePattern, "").trim();

  // Extract amount comparisons
  const amountGtPattern = /amount\s*>\s*(\d+(?:\.\d+)?)/gi;
  const amountLtPattern = /amount\s*<\s*(\d+(?:\.\d+)?)/gi;

  let amountMatch;
  while ((amountMatch = amountGtPattern.exec(remaining)) !== null) {
    filters.minAmount = parseFloat(amountMatch[1]);
  }
  remaining = remaining.replace(amountGtPattern, "").trim();

  while ((amountMatch = amountLtPattern.exec(remaining)) !== null) {
    filters.maxAmount = parseFloat(amountMatch[1]);
  }
  remaining = remaining.replace(amountLtPattern, "").trim();

  // Natural language keyword matching on remaining text
  if (remaining) {
    const words = remaining.toLowerCase().split(/\s+/);

    for (const word of words) {
      if (!filters.status && STATUS_KEYWORDS.includes(word)) {
        filters.status = word;
        remaining = remaining.replace(new RegExp(`\\b${word}\\b`, "i"), "").trim();
      } else if (!filters.riskLevel && RISK_KEYWORDS.includes(word)) {
        filters.riskLevel = word;
        remaining = remaining.replace(new RegExp(`\\b${word}\\b`, "i"), "").trim();
      } else if (!filters.vendor && VENDOR_KEYWORDS.includes(word)) {
        filters.vendor = word;
        remaining = remaining.replace(new RegExp(`\\b${word}\\b`, "i"), "").trim();
      }
    }

    // Clean up extra whitespace
    remaining = remaining.replace(/\s+/g, " ").trim();
  }

  return { filters, remainingText: remaining };
}

function applyFilters(
  transactions: OfferTransaction[],
  filters: SearchFilters
): OfferTransaction[] {
  return transactions.filter((tx) => {
    if (filters.status && tx.status !== filters.status) return false;
    if (
      filters.vendor &&
      !tx.vendor.name.toLowerCase().includes(filters.vendor.toLowerCase()) &&
      !tx.vendor.code.toLowerCase().includes(filters.vendor.toLowerCase())
    )
      return false;
    if (filters.riskLevel && tx.risk.level !== filters.riskLevel) return false;
    if (filters.minAmount != null && tx.amount < filters.minAmount) return false;
    if (filters.maxAmount != null && tx.amount > filters.maxAmount) return false;
    if (filters.currency && tx.currency !== filters.currency) return false;
    if (
      filters.paymentMethod &&
      tx.paymentMethod !== filters.paymentMethod
    )
      return false;
    return true;
  });
}

const fuseOptions: IFuseOptions<OfferTransaction> = {
  keys: [
    "offerId",
    "vendor.name",
    "vendor.code",
    "status",
    "paymentMethod",
    "currency",
  ],
  threshold: 0.3,
  includeScore: true,
};

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
  let filtered = hasFilters ? applyFilters(transactions, filters) : transactions;

  // Apply fuzzy search on remaining text
  if (remainingText) {
    const fuse = new Fuse(filtered, fuseOptions);
    const results = fuse.search(remainingText);
    filtered = results.map((result) => result.item);
  }

  return filtered;
}
