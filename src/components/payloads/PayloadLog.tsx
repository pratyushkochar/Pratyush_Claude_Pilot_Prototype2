"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { PayloadEntry } from "@/types/offer-transaction";

interface PayloadLogProps {
  payloads?: PayloadEntry[];
}

export function PayloadLog({ payloads = [] }: PayloadLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payload Log</CardTitle>
      </CardHeader>
      <CardContent>
        {payloads.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payloads recorded</p>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-2">
              {payloads.map((payload) => (
                <div
                  key={payload.id}
                  className="flex items-center gap-2 rounded-md border p-2"
                >
                  <Badge
                    variant={
                      payload.direction === "request" ? "default" : "secondary"
                    }
                  >
                    {payload.direction}
                  </Badge>
                  <span className="text-xs font-mono">
                    {payload.method} {payload.endpoint}
                  </span>
                  {payload.statusCode && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {payload.statusCode}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
