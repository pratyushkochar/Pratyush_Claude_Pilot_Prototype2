"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface KpiData {
  title: string;
  value: string;
  description: string;
}

interface KpiCardsProps {
  data?: KpiData[];
}

export function KpiCards({ data }: KpiCardsProps) {
  const defaultData: KpiData[] = data ?? [
    { title: "Total Transactions", value: "0", description: "All time" },
    { title: "Success Rate", value: "0%", description: "Last 24h" },
    { title: "Total Volume", value: "$0", description: "Last 24h" },
    { title: "Avg Processing Time", value: "0ms", description: "Last 24h" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {defaultData.map((kpi) => (
        <Card key={kpi.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpi.value}</div>
            <p className="text-xs text-muted-foreground">{kpi.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
