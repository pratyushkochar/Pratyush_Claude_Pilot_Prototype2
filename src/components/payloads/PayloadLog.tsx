"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { JsonView, allExpanded, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { ChevronDown, Copy, Check } from "lucide-react";
import type { PayloadEntry } from "@/types/offer-transaction";
import { cn } from "@/lib/utils";

interface PayloadLogProps {
  payloads: PayloadEntry[];
}

type SortKey = "timestamp" | "vendor" | "direction";

export function PayloadLog({ payloads }: PayloadLogProps) {
  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortAsc, setSortAsc] = useState(true);
  const [vendorFilter, setVendorFilter] = useState<string>("all");
  const [phaseFilter, setPhaseFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const vendors = useMemo(
    () => Array.from(new Set(payloads.map((p) => p.vendor))),
    [payloads]
  );
  const phases = useMemo(
    () => Array.from(new Set(payloads.map((p) => p.phase))),
    [payloads]
  );
  const statusCodes = useMemo(
    () =>
      Array.from(
        new Set(
          payloads.filter((p) => p.statusCode).map((p) => String(p.statusCode))
        )
      ),
    [payloads]
  );

  const filtered = useMemo(() => {
    let result = payloads;
    if (vendorFilter !== "all")
      result = result.filter((p) => p.vendor === vendorFilter);
    if (phaseFilter !== "all")
      result = result.filter((p) => p.phase === phaseFilter);
    if (statusFilter !== "all")
      result = result.filter((p) => String(p.statusCode) === statusFilter);
    return result;
  }, [payloads, vendorFilter, phaseFilter, statusFilter]);

  const sorted = useMemo(() => {
    const dir = sortAsc ? 1 : -1;
    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case "timestamp":
          return a.timestamp.localeCompare(b.timestamp) * dir;
        case "vendor":
          return a.vendor.localeCompare(b.vendor) * dir;
        case "direction":
          return a.direction.localeCompare(b.direction) * dir;
        default:
          return 0;
      }
    });
  }, [filtered, sortKey, sortAsc]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const handleCopy = async (payload: PayloadEntry) => {
    await navigator.clipboard.writeText(JSON.stringify(payload.body, null, 2));
    setCopiedId(payload.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortAsc ? " \u2191" : " \u2193") : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payload Log</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border bg-background px-2 py-1 text-xs"
            value={vendorFilter}
            onChange={(e) => setVendorFilter(e.target.value)}
          >
            <option value="all">All Vendors</option>
            {vendors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border bg-background px-2 py-1 text-xs"
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
          >
            <option value="all">All Phases</option>
            {phases.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
          <select
            className="rounded-md border bg-background px-2 py-1 text-xs"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status Codes</option>
            {statusCodes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {/* Sort buttons */}
          <div className="ml-auto flex gap-1">
            {(["timestamp", "vendor", "direction"] as SortKey[]).map((key) => (
              <button
                key={key}
                onClick={() => handleSort(key)}
                className="rounded-md border px-2 py-1 text-xs hover:bg-muted"
              >
                {key}
                {sortIndicator(key)}
              </button>
            ))}
          </div>
        </div>

        {/* Payload entries */}
        {sorted.length === 0 ? (
          <p className="text-sm text-muted-foreground">No payloads recorded</p>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-2">
              {sorted.map((payload) => (
                <div key={payload.id} className="rounded-md border">
                  {/* Row header */}
                  <button
                    className="flex w-full items-center gap-2 p-2 text-left hover:bg-muted/50"
                    onClick={() =>
                      setExpandedId(
                        expandedId === payload.id ? null : payload.id
                      )
                    }
                  >
                    <ChevronDown
                      className={cn(
                        "h-3 w-3 shrink-0 transition-transform",
                        expandedId === payload.id && "rotate-180"
                      )}
                    />
                    <Badge
                      variant={
                        payload.direction === "request"
                          ? "default"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {payload.direction}
                    </Badge>
                    <span className="text-xs font-mono truncate">
                      {payload.method} {payload.endpoint}
                    </span>
                    <span className="ml-auto flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {payload.vendor}
                      </Badge>
                      {payload.statusCode && (
                        <span
                          className={cn(
                            "text-xs font-mono",
                            payload.statusCode >= 400
                              ? "text-red-500"
                              : "text-green-500"
                          )}
                        >
                          {payload.statusCode}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(payload.timestamp).toLocaleTimeString()}
                      </span>
                    </span>
                  </button>

                  {/* Expanded JSON body */}
                  {expandedId === payload.id && (
                    <div className="border-t p-3">
                      <div className="flex justify-end mb-2">
                        <button
                          onClick={() => handleCopy(payload)}
                          className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-muted"
                        >
                          {copiedId === payload.id ? (
                            <>
                              <Check className="h-3 w-3" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <div className="rounded-md bg-muted p-3 text-xs overflow-auto max-h-[300px]">
                        <JsonView
                          data={payload.body as Record<string, unknown>}
                          shouldExpandNode={allExpanded}
                          style={darkStyles}
                        />
                      </div>
                    </div>
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
