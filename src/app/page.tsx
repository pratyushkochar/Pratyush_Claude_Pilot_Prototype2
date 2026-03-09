"use client";

import { useMemo } from "react";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { KpiCards } from "@/components/overview/KpiCards";
import { TransactionsTable } from "@/components/overview/TransactionsTable";
import { RiskOverviewPanel } from "@/components/risk/RiskOverviewPanel";
import { VendorCard } from "@/components/risk/VendorCard";
import { OrchestrationTimeline } from "@/components/risk/OrchestrationTimeline";
import { PaymentRoutingCard } from "@/components/payments/PaymentRoutingCard";
import { LifecycleTracker } from "@/components/payments/LifecycleTracker";
import { PaymentStepDetail } from "@/components/payments/PaymentStepDetail";
import { PayloadLog } from "@/components/payloads/PayloadLog";
import { useDashboardStore } from "@/stores/dashboard-store";
import { mockTransactions } from "@/lib/mock-data";
import { searchTransactions } from "@/lib/search-parser";
import type { RiskVendorAssessment } from "@/types/offer-transaction";

function getVendorAssessments(
  assessments: RiskVendorAssessment[],
  vendorName: string
) {
  return assessments.filter((a) => a.vendorName === vendorName);
}

export default function Home() {
  const { activeTab, selectedTransaction, searchQuery } = useDashboardStore();

  const filteredTransactions = useMemo(
    () => searchTransactions(mockTransactions, searchQuery),
    [searchQuery]
  );

  return (
    <DashboardShell>
      {activeTab === "overview" && (
        <div className="space-y-6">
          <KpiCards transactions={filteredTransactions} />
          <TransactionsTable transactions={filteredTransactions} />
        </div>
      )}

      {activeTab === "risk" && (
        <div className="space-y-6">
          {selectedTransaction ? (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Risk Decisioning — {selectedTransaction.offerId}
                </h2>
              </div>
              <RiskOverviewPanel transaction={selectedTransaction} />
              <div className="grid gap-4 md:grid-cols-3">
                <VendorCard
                  vendorName="LexisNexis"
                  assessments={getVendorAssessments(
                    selectedTransaction.riskVendors,
                    "LexisNexis"
                  )}
                />
                <VendorCard
                  vendorName="Forter"
                  assessments={getVendorAssessments(
                    selectedTransaction.riskVendors,
                    "Forter"
                  )}
                />
                <VendorCard
                  vendorName="Accertify"
                  assessments={getVendorAssessments(
                    selectedTransaction.riskVendors,
                    "Accertify"
                  )}
                />
              </div>
              <OrchestrationTimeline steps={selectedTransaction.paymentSteps} />
            </>
          ) : (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              Select a transaction from the Overview tab to view risk
              decisioning details.
            </div>
          )}
        </div>
      )}

      {activeTab === "payments" && (
        <div className="space-y-6">
          {selectedTransaction ? (
            <>
              <h2 className="text-lg font-semibold">
                Payments — {selectedTransaction.offerId}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <PaymentRoutingCard transaction={selectedTransaction} />
                <PaymentStepDetail steps={selectedTransaction.paymentSteps} />
              </div>
              <LifecycleTracker
                steps={selectedTransaction.lifecycleSteps}
                currency={selectedTransaction.currency}
              />
            </>
          ) : (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              Select a transaction from the Overview tab to view payment
              details.
            </div>
          )}
        </div>
      )}

      {activeTab === "payloads" && (
        <div className="space-y-6">
          {selectedTransaction ? (
            <>
              <h2 className="text-lg font-semibold">
                Payload Log — {selectedTransaction.offerId}
              </h2>
              <PayloadLog payloads={selectedTransaction.payloads} />
            </>
          ) : (
            <div className="rounded-md border p-8 text-center text-muted-foreground">
              Select a transaction from the Overview tab to view payload logs.
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}
