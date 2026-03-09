import { create } from "zustand";
import type { DashboardTab, OfferTransaction } from "@/types/offer-transaction";

interface DashboardState {
  activeTab: DashboardTab;
  selectedTransaction: OfferTransaction | null;
  searchQuery: string;
  setActiveTab: (tab: DashboardTab) => void;
  setSelectedTransaction: (transaction: OfferTransaction | null) => void;
  setSearchQuery: (query: string) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  activeTab: "overview",
  selectedTransaction: null,
  searchQuery: "",
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedTransaction: (transaction) =>
    set({ selectedTransaction: transaction }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
