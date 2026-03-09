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

function generatePaymentSteps(): PaymentStep[] {
  const steps = ["Authorization", "Fraud Check", "Capture", "Settlement"];
  return steps.map((name, index) => ({
    id: `step-${index + 1}-${randomNumber(1000, 9999)}`,
    name,
    status: randomElement(Object.values(PaymentStepStatus)),
    processor: randomElement(vendorNames).name,
    startedAt: format(subMinutes(new Date(), randomNumber(60, 120) - index * 15), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    completedAt:
      Math.random() > 0.2
        ? format(subMinutes(new Date(), randomNumber(1, 59) - index * 10), "yyyy-MM-dd'T'HH:mm:ss'Z'")
        : null,
    duration: Math.random() > 0.2 ? randomNumber(50, 5000) : null,
    details: {},
  }));
}

function generatePayloads(): PayloadEntry[] {
  return [
    {
      id: `payload-${randomNumber(10000, 99999)}`,
      timestamp: format(subMinutes(new Date(), randomNumber(30, 120)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      direction: "request",
      endpoint: "/api/v1/payments/authorize",
      method: "POST",
      statusCode: null,
      headers: { "Content-Type": "application/json" },
      body: { amount: randomNumber(100, 10000), currency: "USD" },
    },
    {
      id: `payload-${randomNumber(10000, 99999)}`,
      timestamp: format(subMinutes(new Date(), randomNumber(1, 29)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
      direction: "response",
      endpoint: "/api/v1/payments/authorize",
      method: "POST",
      statusCode: randomElement([200, 201, 400, 500]),
      headers: { "Content-Type": "application/json" },
      body: { status: "authorized", transactionId: `txn-${randomNumber(100000, 999999)}` },
    },
  ];
}

export function generateTransaction(): OfferTransaction {
  const now = new Date();
  return {
    offerId: `OFR-${randomNumber(100000, 999999)}`,
    status: randomElement(Object.values(TransactionStatus)),
    amount: randomNumber(10, 50000) + Math.random(),
    currency: randomElement(["USD", "EUR", "GBP", "CAD"]),
    paymentMethod: randomElement(Object.values(PaymentMethod)),
    vendor: generateVendor(),
    risk: generateRisk(),
    paymentSteps: generatePaymentSteps(),
    payloads: generatePayloads(),
    createdAt: format(subHours(now, randomNumber(1, 72)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
    updatedAt: format(subMinutes(now, randomNumber(1, 60)), "yyyy-MM-dd'T'HH:mm:ss'Z'"),
  };
}

export function generateTransactions(count: number): OfferTransaction[] {
  return Array.from({ length: count }, () => generateTransaction());
}
