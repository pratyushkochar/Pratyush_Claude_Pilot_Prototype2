"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDashboardStore } from "@/stores/dashboard-store";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useDashboardStore();

  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder='Search by Offer # or describe what you are looking for (e.g. "declined Forter transactions")'
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
