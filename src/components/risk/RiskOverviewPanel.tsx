"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OfferTransaction } from "@/types/offer-transaction";

interface RiskOverviewPanelProps {
  transactions?: OfferTransaction[];
}

export function RiskOverviewPanel({ transactions = [] }: RiskOverviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {transactions.length} transactions analyzed
        </p>
      </CardContent>
    </Card>
  );
}
