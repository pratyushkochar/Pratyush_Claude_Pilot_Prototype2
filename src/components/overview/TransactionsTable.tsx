"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { OfferTransaction } from "@/types/offer-transaction";
import { useDashboardStore } from "@/stores/dashboard-store";
import { cn } from "@/lib/utils";

interface TransactionsTableProps {
  transactions: OfferTransaction[];
}

type SortKey = "offerId" | "amount" | "status" | "createdAt" | "risk";

const statusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default" as const;
    case "failed":
    case "cancelled":
      return "destructive" as const;
    default:
      return "secondary" as const;
  }
};

const riskVariant = (level: string) => {
  switch (level) {
    case "high":
    case "critical":
      return "destructive" as const;
    case "medium":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const { selectedTransaction, setSelectedTransaction } = useDashboardStore();
  const [sortKey, setSortKey] = useState<SortKey>("createdAt");
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sorted = [...transactions].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    switch (sortKey) {
      case "offerId":
        return a.offerId.localeCompare(b.offerId) * dir;
      case "amount":
        return (a.amount - b.amount) * dir;
      case "status":
        return a.status.localeCompare(b.status) * dir;
      case "risk":
        return (a.risk.score - b.risk.score) * dir;
      case "createdAt":
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * dir;
      default:
        return 0;
    }
  });

  const sortIndicator = (key: SortKey) =>
    sortKey === key ? (sortAsc ? " \u2191" : " \u2193") : "";

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer select-none" onClick={() => handleSort("offerId")}>
              Offer #{sortIndicator("offerId")}
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => handleSort("amount")}>
              Amount{sortIndicator("amount")}
            </TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => handleSort("risk")}>
              Risk Decision{sortIndicator("risk")}
            </TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => handleSort("status")}>
              Payment Status{sortIndicator("status")}
            </TableHead>
            <TableHead className="cursor-pointer select-none" onClick={() => handleSort("createdAt")}>
              Timestamp{sortIndicator("createdAt")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            sorted.map((tx) => (
              <TableRow
                key={tx.offerId}
                className={cn(
                  "cursor-pointer",
                  selectedTransaction?.offerId === tx.offerId && "bg-muted"
                )}
                onClick={() =>
                  setSelectedTransaction(
                    selectedTransaction?.offerId === tx.offerId ? null : tx
                  )
                }
              >
                <TableCell className="font-mono text-sm">{tx.offerId}</TableCell>
                <TableCell>{tx.customerName}</TableCell>
                <TableCell>
                  {tx.currency}{" "}
                  {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>
                  <Badge variant={riskVariant(tx.risk.level)}>
                    {tx.risk.level} ({tx.risk.score})
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={statusVariant(tx.status)}>{tx.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatTime(tx.createdAt)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
