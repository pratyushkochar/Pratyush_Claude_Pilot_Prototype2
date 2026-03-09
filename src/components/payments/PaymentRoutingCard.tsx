"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { OfferTransaction } from "@/types/offer-transaction";

interface PaymentRoutingCardProps {
  transaction: OfferTransaction;
}

export function PaymentRoutingCard({ transaction }: PaymentRoutingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Token & PSP Routing</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Token Vendor</span>
          <span className="font-medium">{transaction.tokenVendor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">PSP</span>
          <span className="font-medium">{transaction.pspName}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">PSP Result</span>
          <Badge variant={transaction.pspSuccess ? "default" : "destructive"}>
            {transaction.pspSuccess ? "Success" : "Failed"}
          </Badge>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method</span>
          <span className="font-medium">
            {transaction.paymentMethod.replace(/_/g, " ")}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount</span>
          <span className="font-medium">
            {transaction.currency}{" "}
            {transaction.amount.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
