"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OfferTransaction } from "@/types/offer-transaction";

interface KpiCardsProps {
  transactions: OfferTransaction[];
}

export function KpiCards({ transactions }: KpiCardsProps) {
  const total = transactions.length;
  const approved = transactions.filter((t) => t.status === "completed").length;
  const declined = transactions.filter(
    (t) => t.status === "failed" || t.status === "cancelled"
  ).length;
  const approvalRate = total > 0 ? ((approved / total) * 100).toFixed(1) : "0";
  const declineRate = total > 0 ? ((declined / total) * 100).toFixed(1) : "0";

  const avgRisk =
    total > 0
      ? (
          transactions.reduce((sum, t) => sum + t.risk.score, 0) / total
        ).toFixed(0)
      : "0";

  const stepsWithDuration = transactions.flatMap((t) =>
    t.paymentSteps.filter((s) => s.duration != null)
  );
  const avgLatency =
    stepsWithDuration.length > 0
      ? (
          stepsWithDuration.reduce((sum, s) => sum + (s.duration ?? 0), 0) /
          stepsWithDuration.length
        ).toFixed(0)
      : "0";

  const kpis = [
    { title: "Total Transactions", value: String(total), description: "All offers" },
    { title: "Approval Rate", value: `${approvalRate}%`, description: "Completed / total" },
    { title: "Decline Rate", value: `${declineRate}%`, description: "Failed+cancelled / total" },
    { title: "Avg Risk Score", value: avgRisk, description: "Across all transactions" },
    { title: "Avg Latency", value: `${avgLatency}ms`, description: "Per processing step" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
      {kpis.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
