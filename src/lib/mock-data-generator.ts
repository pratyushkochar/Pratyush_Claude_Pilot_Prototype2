import { format, subHours, subMinutes } from "date-fns";
import {
  TransactionStatus,
  RiskLevel,
  PaymentMethod,
  PaymentStepStatus,
  type OfferTransaction,
  type VendorInfo,
  type RiskAssessment,
  type PaymentStep,
  type PayloadEntry,
  type RiskVendorAssessment,
  type LifecycleStep,
  type RiskDecision,
  type OrchestrationPhase,
} from "@/types/offer-transaction";

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const vendorNames = [
  { name: "Stripe", code: "STRIPE" },
  { name: "Adyen", code: "ADYEN" },
  { name: "Braintree", code: "BRAINTREE" },
  { name: "Worldpay", code: "WORLDPAY" },
  { name: "Checkout.com", code: "CHECKOUT" },
];

const customerNames = [
  "Alice Wong", "Bob Martinez", "Carol Davis", "Dan Lee",
  "Eva Schmidt", "Frank Brown", "Grace Kim", "Henry Adams",
];

function generateVendor(): VendorInfo {
  const vendor = randomElement(vendorNames);
  return {
    id: `vendor-${vendor.code.toLowerCase()}-${randomNumber(100, 999)}`,
    name: vendor.name,
    code: vendor.code,
    riskScore: randomNumber(1, 100),
    successRate: randomNumber(85, 99) + Math.random(),
  };
}

function generateRisk(): RiskAssessment {
  const level = randomElement(Object.values(RiskLevel));
  const scoreRanges: Record<RiskLevel, [number, number]> = {
    [RiskLevel.Low]: [1, 25],
    [RiskLevel.Medium]: [26, 50],
    [RiskLevel.High]: [51, 75],
    [RiskLevel.Critical]: [76, 100],
  };
  const [min, max] = scoreRanges[level];
  return {
    level,
    score: randomNumber(min, max),
    factors: [
      randomElement(["velocity_check", "geo_mismatch", "amount_threshold", "new_customer", "device_fingerprint"]),
      randomElement(["bin_check", "address_verification", "3ds_result", "fraud_model_v2"]),
    ],
    reviewRequired: level === RiskLevel.High || level === RiskLevel.Critical,
    assessedAt: format(subMinutes(new Date(), randomNumber(1, 120)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
  };
}

function generateRiskVendors(): RiskVendorAssessment[] {
  const decisions: RiskDecision[] = ["approve", "decline", "review"];
  const result: RiskVendorAssessment[] = [];
  const riskVendors = ["LexisNexis", "Forter", "Accertify"];

  for (const vendor of riskVendors) {
    result.push({
      vendorName: vendor,
      vendorCode: vendor.toUpperCase().replace(/\s/g, "_"),
      decision: randomElement(decisions),
      riskScore: randomNumber(1, 100),
      latencyMs: randomNumber(80, 400),
      phase: "pre_auth" as OrchestrationPhase,
      rulesTriggered: [randomElement(["velocity_check", "device_trust", "geo_match", "amount_check"])],
      matchDetails: {},
    });
  }

  // Add post-auth for Forter and Accertify
  for (const vendor of ["Forter", "Accertify"]) {
    result.push({
      vendorName: vendor,
      vendorCode: vendor.toUpperCase(),
      decision: randomElement(decisions),
      riskScore: randomNumber(1, 50),
      latencyMs: randomNumber(50, 150),
      phase: "post_auth" as OrchestrationPhase,
      rulesTriggered: ["post_auth_check"],
      matchDetails: {},
    });
  }

  return result;
}

function generatePaymentSteps(): PaymentStep[] {
  const steps = [
    "LexisNexis Check", "Forter Pre-Auth", "Accertify Pre-Auth",
    "Payment Authorization", "Forter Post-Auth", "Accertify Post-Auth",
  ];
  const processors = [
    "LexisNexis", "Forter", "Accertify",
    randomElement(vendorNames).name, "Forter", "Accertify",
  ];

  return steps.map((name, index) => ({
    id: `step-${index + 1}-${randomNumber(1000, 9999)}`,
    name,
    status: randomElement(Object.values(PaymentStepStatus)),
    processor: processors[index],
    startedAt: format(subMinutes(new Date(), randomNumber(60, 120) - index * 10), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    completedAt:
      Math.random() > 0.2
        ? format(subMinutes(new Date(), randomNumber(1, 59) - index * 5), "yyyy-MM-dd'T'HH:mm:ss'Z'")
        : null,
    duration: Math.random() > 0.2 ? randomNumber(50, 3000) : null,
    details: {},
  }));
}

function generateLifecycleSteps(amount: number): LifecycleStep[] {
  const names: LifecycleStep["name"][] = ["Authorization", "Capture", "Refund", "Credit"];
  return names.map((name) => ({
    name,
    status: randomElement(Object.values(PaymentStepStatus)),
    amount: Math.random() > 0.4 ? amount : null,
    responseCode: Math.random() > 0.3 ? "00" : null,
    message: Math.random() > 0.3 ? "Processed" : null,
    timestamp: Math.random() > 0.3
      ? format(subMinutes(new Date(), randomNumber(1, 60)), "yyyy-MM-dd'T'HH:mm:ss'Z'")
      : null,
    isPartial: Math.random() > 0.8,
  }));
}

function generatePayloads(): PayloadEntry[] {
  const vendors = ["LexisNexis", "Forter", "Accertify", randomElement(vendorNames).name];
  const phases: OrchestrationPhase[] = ["pre_auth", "pre_auth", "pre_auth", "payment"];

  return vendors.flatMap((vendor, i) => [
    {
      id: `payload-${randomNumber(10000, 99999)}`,
      timestamp: format(subMinutes(new Date(), randomNumber(30, 120)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      direction: "request" as const,
      endpoint: `/api/v1/${vendor.toLowerCase().replace(/\./g, "")}/check`,
      method: "POST",
      statusCode: null,
      headers: { "Content-Type": "application/json" },
      body: { amount: randomNumber(100, 10000), currency: "USD" },
      vendor,
      phase: phases[i],
    },
    {
      id: `payload-${randomNumber(10000, 99999)}`,
      timestamp: format(subMinutes(new Date(), randomNumber(1, 29)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      direction: "response" as const,
      endpoint: `/api/v1/${vendor.toLowerCase().replace(/\./g, "")}/check`,
      method: "POST",
      statusCode: randomElement([200, 201, 400, 500]),
      headers: { "Content-Type": "application/json" },
      body: { status: randomElement(["approved", "declined"]), transactionId: `txn-${randomNumber(100000, 999999)}` },
      vendor,
      phase: phases[i],
    },
  ]);
}

export function generateTransaction(): OfferTransaction {
  const now = new Date();
  const amount = randomNumber(10, 50000) + Math.random();
  return {
    offerId: `OFR-${randomNumber(100000, 999999)}`,
    customerName: randomElement(customerNames),
    status: randomElement(Object.values(TransactionStatus)),
    amount,
    currency: randomElement(["USD", "EUR", "GBP", "CAD"]),
    paymentMethod: randomElement(Object.values(PaymentMethod)),
    vendor: generateVendor(),
    risk: generateRisk(),
    riskVendors: generateRiskVendors(),
    paymentSteps: generatePaymentSteps(),
    lifecycleSteps: generateLifecycleSteps(amount),
    payloads: generatePayloads(),
    tokenVendor: randomElement(["VGS", "Basis Theory"]),
    pspName: randomElement(vendorNames).name,
    pspSuccess: Math.random() > 0.3,
    createdAt: format(subHours(now, randomNumber(1, 72)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    updatedAt: format(subMinutes(now, randomNumber(1, 60)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
  };
}

export function generateTransactions(count: number): OfferTransaction[] {
  return Array.from({ length: count }, () => generateTransaction());
}
