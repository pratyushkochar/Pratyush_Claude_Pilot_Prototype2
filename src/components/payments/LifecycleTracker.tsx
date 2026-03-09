"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LifecycleStep } from "@/types/offer-transaction";
import { cn } from "@/lib/utils";

interface LifecycleTrackerProps {
  steps: LifecycleStep[];
  currency: string;
}

const statusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500 text-white";
    case "failed":
      return "bg-red-500 text-white";
    case "in_progress":
      return "bg-yellow-500 text-white";
    case "skipped":
      return "bg-gray-300 text-gray-600";
    default:
      return "bg-gray-200 text-gray-500";
  }
};

const lineColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-border";
  }
};

const badgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default" as const;
    case "failed":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
};

export function LifecycleTracker({ steps, currency }: LifecycleTrackerProps) {
  if (steps.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment Lifecycle</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No lifecycle data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment Lifecycle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start">
          {steps.map((step, i) => (
            <div key={step.name} className="flex items-start flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0",
                    statusColor(step.status)
                  )}
                >
                  {i + 1}
                </div>
                <span className="mt-2 text-xs font-medium text-center">
                  {step.name}
                </span>
                <Badge
                  variant={badgeVariant(step.status)}
                  className="mt-1 text-xs"
                >
                  {step.status}
                  {step.isPartial && " (partial)"}
                </Badge>
                <div className="mt-2 text-center space-y-0.5">
                  {step.amount != null && (
                    <p className="text-xs font-medium">
                      {currency} {step.amount.toFixed(2)}
                    </p>
                  )}
                  {step.responseCode && (
                    <p className="text-xs text-muted-foreground">
                      Code: {step.responseCode}
                    </p>
                  )}
                  {step.message && (
                    <p className="text-xs text-muted-foreground">
                      {step.message}
                    </p>
                  )}
                  {step.timestamp && (
                    <p className="text-xs text-muted-foreground">
                      {new Date(step.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p>
                  )}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 mt-4 -mx-1",
                    lineColor(step.status)
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
