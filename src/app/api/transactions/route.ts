import { NextResponse } from "next/server";
import { mockTransactions } from "@/lib/mock-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const vendor = searchParams.get("vendor");

  let transactions = mockTransactions;

  if (status) {
    transactions = transactions.filter((t) => t.status === status);
  }

  if (vendor) {
    transactions = transactions.filter(
      (t) => t.vendor.code.toLowerCase() === vendor.toLowerCase()
    );
  }

  return NextResponse.json(transactions);
}
