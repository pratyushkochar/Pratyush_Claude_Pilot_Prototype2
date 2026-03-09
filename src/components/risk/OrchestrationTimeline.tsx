"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { PaymentStep } from "@/types/offer-transaction";
import { cn } from "@/lib/utils";

interface OrchestrationTimelineProps {
  steps: PaymentStep[];
}

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "failed":
      return "bg-red-500";
    case "in_progress":
      return "bg-yellow-500";
    case "skipped":
      return "bg-gray-400";
    default:
      return "bg-gray-300";
  }
};

const statusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default" as const;
    case "failed":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
};

export function OrchestrationTimeline({ steps }: OrchestrationTimelineProps) {
  if (steps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Orchestration Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No steps to display</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orchestration Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {steps.map((step, i) => (
            <div key={step.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={cn("h-3 w-3 rounded-full shrink-0", statusColor(step.status))}
                />
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 bg-border min-h-[32px]" />
                )}
              </div>
              <div className="pb-4 flex-1 -mt-0.5">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">{step.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {step.processor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.duration != null && (
                      <span className="text-xs text-muted-foreground">
                        {step.duration}ms
                      </span>
                    )}
                    <Badge variant={statusVariant(step.status)} className="text-xs">
                      {step.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
