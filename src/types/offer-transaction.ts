export enum TransactionStatus {
  Pending = "pending",
  Processing = "processing",
  Completed = "completed",
  Failed = "failed",
  Cancelled = "cancelled",
  Refunded = "refunded",
}

export enum RiskLevel {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export enum PaymentMethod {
  CreditCard = "credit_card",
  DebitCard = "debit_card",
  BankTransfer = "bank_transfer",
  DigitalWallet = "digital_wallet",
  PayLater = "pay_later",
}

export enum PaymentStepStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Completed = "completed",
  Failed = "failed",
  Skipped = "skipped",
}

export interface VendorInfo {
  id: string;
  name: string;
  code: string;
  riskScore: number;
  successRate: number;
}

export interface RiskAssessment {
  level: RiskLevel;
  score: number;
  factors: string[];
  reviewRequired: boolean;
  assessedAt: string;
}

export interface PaymentStep {
  id: string;
  name: string;
  status: PaymentStepStatus;
  processor: string;
  startedAt: string;
  completedAt: string | null;
  duration: number | null;
  details: Record<string, unknown>;
}

export interface PayloadEntry {
  id: string;
  timestamp: string;
  direction: "request" | "response";
  endpoint: string;
  method: string;
  statusCode: number | null;
  headers: Record<string, string>;
  body: Record<string, unknown>;
}

export interface OfferTransaction {
  offerId: string;
  status: TransactionStatus;
  amount: number;
  currency: string;
  paymentMethod: PaymentMethod;
  vendor: VendorInfo;
  risk: RiskAssessment;
  paymentSteps: PaymentStep[];
  payloads: PayloadEntry[];
  createdAt: string;
  updatedAt: string;
}

export type DashboardTab = "overview" | "risk" | "payments" | "payloads";
