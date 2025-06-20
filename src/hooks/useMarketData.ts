import { useState, useEffect, useCallback } from "react";
import { MarketIndicator, TacticalAlert } from "@/types/market";
import {
  generateMarketIndicators,
  generateTacticalAlerts,
  simulateDataUpdate,
} from "@/utils/dataSimulation";

export interface UseMarketDataReturn {
  indicators: MarketIndicator[];
  alerts: TacticalAlert[];
  isLoading: boolean;
  lastUpdate: Date;
  refreshData: () => void;
}

export function useMarketData(
  autoRefresh: boolean = true,
  refreshInterval: number = 30000,
): UseMarketDataReturn {
  const [indicators, setIndicators] = useState<MarketIndicator[]>([]);
  const [alerts, setAlerts] = useState<TacticalAlert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const refreshData = useCallback(() => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(
      () => {
        const newIndicators = generateMarketIndicators();
        const newAlerts = generateTacticalAlerts();

        setIndicators(newIndicators);
        setAlerts(newAlerts);
        setLastUpdate(new Date());
        setIsLoading(false);
      },
      500 + Math.random() * 1000,
    ); // 0.5-1.5s delay
  }, []);

  // Initial data load
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // Update existing data with some probability
      setIndicators((prev) =>
        prev.map((indicator) => simulateDataUpdate(indicator, 0.3)),
      );
      setAlerts((prev) => prev.map((alert) => simulateDataUpdate(alert, 0.1)));
      setLastUpdate(new Date());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  return {
    indicators,
    alerts,
    isLoading,
    lastUpdate,
    refreshData,
  };
}
