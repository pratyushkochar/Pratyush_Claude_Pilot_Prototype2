"use client";

import { SearchBar } from "@/components/layout/SearchBar";
import { TabNavigation } from "@/components/layout/TabNavigation";

export function DashboardShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-14 items-center gap-4">
          <h1 className="text-lg font-semibold whitespace-nowrap">
            Risk & Payments Dashboard
          </h1>
          <div className="ml-auto flex-1 max-w-xl">
            <SearchBar />
          </div>
        </div>
      </header>
      <div className="container flex-1 py-6">
        <TabNavigation />
        <main className="mt-4">{children}</main>
      </div>
    </div>
  );
}
