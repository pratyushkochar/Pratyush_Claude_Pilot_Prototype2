"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VendorInfo } from "@/types/offer-transaction";

interface VendorCardProps {
  vendor?: VendorInfo;
}

export function VendorCard({ vendor }: VendorCardProps) {
  if (!vendor) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          No vendor selected
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{vendor.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Code</span>
          <span className="font-mono">{vendor.code}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Risk Score</span>
          <span>{vendor.riskScore}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Success Rate</span>
          <span>{vendor.successRate.toFixed(1)}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
