"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { PaymentStep } from "@/types/offer-transaction";

interface PaymentStepDetailProps {
  step?: PaymentStep;
}

export function PaymentStepDetail({ step }: PaymentStepDetailProps) {
  if (!step) {
    return (
      <Card>
        <CardContent className="p-6 text-sm text-muted-foreground">
          Select a step to view details
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{step.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Status</span>
          <span>{step.status}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-muted-foreground">Processor</span>
          <span>{step.processor}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Started</span>
          <span>{step.startedAt}</span>
        </div>
        {step.completedAt && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Completed</span>
            <span>{step.completedAt}</span>
          </div>
        )}
        {step.duration && (
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span>{step.duration}ms</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
