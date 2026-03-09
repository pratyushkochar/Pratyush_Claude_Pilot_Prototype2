import Fuse, { type IFuseOptions } from "fuse.js";
import type { OfferTransaction } from "@/types/offer-transaction";

const fuseOptions: IFuseOptions<OfferTransaction> = {
  keys: [
    "offerId",
    "vendor.name",
    "vendor.code",
    "status",
    "paymentMethod",
    "currency",
  ],
  threshold: 0.3,
  includeScore: true,
};

export function searchTransactions(
  transactions: OfferTransaction[],
  query: string
): OfferTransaction[] {
  if (!query.trim()) {
    return transactions;
  }

  const fuse = new Fuse(transactions, fuseOptions);
  const results = fuse.search(query);
  return results.map((result) => result.item);
}
