"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentStep } from "@/types/offer-transaction";

interface LifecycleTrackerProps {
  steps?: PaymentStep[];
}

export function LifecycleTracker({ steps = [] }: LifecycleTrackerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Lifecycle</CardTitle>
      </CardHeader>
      <CardContent>
        {steps.length === 0 ? (
          <p className="text-sm text-muted-foreground">No lifecycle data</p>
        ) : (
          <div className="space-y-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <span className="text-sm font-medium">{step.name}</span>
                <Badge
                  variant={step.status === "completed" ? "default" : "secondary"}
                >
                  {step.status}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
