"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import type { RiskVendorAssessment } from "@/types/offer-transaction";
import { cn } from "@/lib/utils";

interface RiskVendorCardProps {
  vendorName: string;
  assessments: RiskVendorAssessment[];
}

const decisionVariant = (decision: string) => {
  switch (decision) {
    case "approve":
      return "default" as const;
    case "decline":
      return "destructive" as const;
    case "review":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

export function VendorCard({ vendorName, assessments }: RiskVendorCardProps) {
  if (assessments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">{vendorName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No assessment data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{vendorName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {assessments.map((a, i) => (
          <AssessmentItem key={`${a.phase}-${i}`} assessment={a} />
        ))}
      </CardContent>
    </Card>
  );
}

function AssessmentItem({ assessment }: { assessment: RiskVendorAssessment }) {
  const [open, setOpen] = useState(false);
  const phaseLabel =
    assessment.phase === "pre_auth" ? "Pre-Auth" : "Post-Auth";

  return (
    <div className="rounded-md border p-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {phaseLabel}
        </span>
        <Badge variant={decisionVariant(assessment.decision)}>
          {assessment.decision}
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-muted-foreground">Score</span>
          <span className="ml-2 font-medium">{assessment.riskScore}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Latency</span>
          <span className="ml-2 font-medium">{assessment.latencyMs}ms</span>
        </div>
      </div>

      {assessment.rulesTriggered.length > 0 && (
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger className="flex w-full items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
            <ChevronDown
              className={cn(
                "h-3 w-3 transition-transform",
                open && "rotate-180"
              )}
            />
            {assessment.rulesTriggered.length} rules triggered
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2">
            <div className="flex flex-wrap gap-1">
              {assessment.rulesTriggered.map((rule) => (
                <Badge key={rule} variant="outline" className="text-xs">
                  {rule}
                </Badge>
              ))}
            </div>
            {Object.keys(assessment.matchDetails).length > 0 && (
              <pre className="mt-2 rounded bg-muted p-2 text-xs overflow-auto">
                {JSON.stringify(assessment.matchDetails, null, 2)}
              </pre>
            )}
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
