import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const OnboardingGate = () => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API}/api/inventory`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const result = await response.json();
          const hasInventory =
            result.length > 0 || (result.data && result.data.length > 0);
          if (hasInventory) {
            setIsOnboarded(true);
            return;
          }
          const ordersResponse = await fetch(
            `${import.meta.env.VITE_API}/api/orders`,
            {
              credentials: "include",
            },
          );

          if (ordersResponse.ok) {
            const ordersResult = await ordersResponse.json();
            const hasOrders =
              ordersResult.length > 0 ||
              (ordersResult.data && ordersResult.data.length > 0);

            setIsOnboarded(hasOrders);
          } else {
            setIsOnboarded(false);
          }
        } else {
          setIsOnboarded(false);
        }
      } catch (error) {
        console.error("Error checking onboarding:", error);
        setIsOnboarded(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="text-sm font-semibold text-indigo-600 animate-pulse">
          Checking system status...
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <Navigate to="/upload" replace />;
  }

  return <Outlet />;
};
