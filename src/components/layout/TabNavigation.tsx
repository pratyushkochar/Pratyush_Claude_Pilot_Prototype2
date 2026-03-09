"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDashboardStore } from "@/stores/dashboard-store";
import type { DashboardTab } from "@/types/offer-transaction";

const tabs: { value: DashboardTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "risk", label: "Risk" },
  { value: "payments", label: "Payments" },
  { value: "payloads", label: "Payloads" },
];

export function TabNavigation() {
  const { activeTab, setActiveTab } = useDashboardStore();

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as DashboardTab)}
    >
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
