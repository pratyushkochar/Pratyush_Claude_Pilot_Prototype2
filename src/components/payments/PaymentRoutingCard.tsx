"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { OfferTransaction } from "@/types/offer-transaction";

interface PaymentRoutingCardProps {
  transaction?: OfferTransaction;
}

export function PaymentRoutingCard({ transaction }: PaymentRoutingCardProps) {
  if (!transaction) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Select a transaction to view routing details
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Routing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Method</span>
          <span>{transaction.paymentMethod}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Processor</span>
          <span>{transaction.vendor.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span>
            {transaction.currency} {transaction.amount.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
