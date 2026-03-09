"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OfferTransaction } from "@/types/offer-transaction";

interface RiskOverviewPanelProps {
  transaction: OfferTransaction;
}

export function RiskOverviewPanel({ transaction }: RiskOverviewPanelProps) {
  const riskVariant = (level: string) => {
    switch (level) {
      case "high":
      case "critical":
        return "destructive" as const;
      case "medium":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Risk Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Overall Level</span>
          <Badge variant={riskVariant(transaction.risk.level)}>
            {transaction.risk.level}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Score</span>
          <span className="font-medium">{transaction.risk.score}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Review Required</span>
          <span className="font-medium">
            {transaction.risk.reviewRequired ? "Yes" : "No"}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground text-xs">Risk Factors</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {transaction.risk.factors.map((f) => (
              <Badge key={f} variant="outline" className="text-xs">
                {f}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
