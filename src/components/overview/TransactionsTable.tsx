"use client";

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

interface TransactionsTableProps {
  transactions?: OfferTransaction[];
}

export function TransactionsTable({ transactions = [] }: TransactionsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Offer ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No transactions found.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx) => (
              <TableRow key={tx.offerId}>
                <TableCell className="font-mono text-sm">{tx.offerId}</TableCell>
                <TableCell>
                  <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                    {tx.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {tx.currency} {tx.amount.toFixed(2)}
                </TableCell>
                <TableCell>{tx.vendor.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      tx.risk.level === "high" || tx.risk.level === "critical"
                        ? "destructive"
                        : "outline"
                    }
                  >
                    {tx.risk.level}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {tx.createdAt}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
