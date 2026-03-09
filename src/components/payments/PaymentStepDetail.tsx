"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { PaymentStep } from "@/types/offer-transaction";

interface PaymentStepDetailProps {
  steps: PaymentStep[];
}

export function PaymentStepDetail({ steps }: PaymentStepDetailProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const step = selectedIdx !== null ? steps[selectedIdx] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Processing Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Step selector */}
        <div className="flex flex-wrap gap-2">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSelectedIdx(selectedIdx === i ? null : i)}
              className={`rounded-md border px-3 py-1.5 text-xs transition-colors ${
                selectedIdx === i
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        {step && (
          <>
            <Separator />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={
                    step.status === "completed"
                      ? "default"
                      : step.status === "failed"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {step.status}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Processor</span>
                <span>{step.processor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Started</span>
                <span className="text-xs">
                  {new Date(step.startedAt).toLocaleString()}
                </span>
              </div>
              {step.completedAt && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="text-xs">
                    {new Date(step.completedAt).toLocaleString()}
                  </span>
                </div>
              )}
              {step.duration != null && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{step.duration}ms</span>
                </div>
              )}
              {Object.keys(step.details).length > 0 && (
                <>
                  <Separator />
                  <pre className="rounded bg-muted p-2 text-xs overflow-auto">
                    {JSON.stringify(step.details, null, 2)}
                  </pre>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
