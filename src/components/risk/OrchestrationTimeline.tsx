"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentStep } from "@/types/offer-transaction";

interface OrchestrationTimelineProps {
  steps?: PaymentStep[];
}

export function OrchestrationTimeline({ steps = [] }: OrchestrationTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orchestration Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {steps.length === 0 ? (
          <p className="text-sm text-muted-foreground">No steps to display</p>
        ) : (
          <div className="space-y-3">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center gap-3">
                <Badge variant={step.status === "completed" ? "default" : "secondary"}>
                  {step.status}
                </Badge>
                <span className="text-sm font-medium">{step.name}</span>
                {step.duration && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {step.duration}ms
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
