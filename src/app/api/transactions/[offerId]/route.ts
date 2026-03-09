import { NextResponse } from "next/server";
import { mockTransactions } from "@/lib/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { offerId: string } }
) {
  const transaction = mockTransactions.find(
    (t) => t.offerId === params.offerId
  );

  if (!transaction) {
    return NextResponse.json(
      { error: "Transaction not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}
