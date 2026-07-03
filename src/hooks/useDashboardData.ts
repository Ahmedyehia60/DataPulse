import { useEffect, useState } from "react";

const DASHBOARD_API_URL = "http://192.168.1.2:5000/api/dashboard";

export type DashboardStatBox = {
  title: string;
  value: number;
  valueType: "number" | "percent";
  changeValue?: number;
  changePercent?: number;
  changeDirection: "up" | "down";
  comparisonLabel: string;
};

export type DashboardData = {
  stockAlert: {
    criticalItemsCount: number;
    message: string;
  };
  statBoxes: DashboardStatBox[];
  demandSupplyTrendChart: {
    period: string;
    granularity: string;
    labels: string[];
    demandUnits: number[];
    supplyUnits: number[];
  };
  topTrendingStockChart: {
    title: string;
    subtitle: string;
    products: Array<{
      name: string;
      category: string;
      growthPercent: number;
      currentStock: number;
    }>;
  };
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(DASHBOARD_API_URL, { credentials: "include" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        return response.json();
      })
      .then((result: DashboardData) => {
        setData(result);
        setError("");
      })
      .catch((err) => {
        console.error("Dashboard API Error:", err);
        setError("Could not load dashboard data.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading, error };
};
