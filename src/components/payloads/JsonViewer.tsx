"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JsonViewerProps {
  title?: string;
  data?: Record<string, unknown>;
}

export function JsonViewer({ title = "JSON Payload", data }: JsonViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {!data ? (
          <p className="text-sm text-muted-foreground">No data to display</p>
        ) : (
          <ScrollArea className="h-[300px]">
            <pre className="rounded-md bg-muted p-4 text-xs font-mono overflow-x-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
