import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "../pages/Dashboard/DashBoard";
import Inventory from "../pages/Inventory/Inventory";
import Orders from "../pages/Orders/Orders";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import Wrapper from "../layout/Wrapper";
import { AuthPage } from "../pages/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import { UploadFile } from "../components/UploadFile";
import { OnboardingGate } from "../components/onboardingGate";
import Bundles from "../pages/Bundles/Bundles";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="upload" element={<UploadFile />} />
          <Route element={<OnboardingGate />}>
            <Route path="/" element={<Wrapper />}>
              <Route index element={<DashBoard />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="orders" element={<Orders />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="bundles" element={<Bundles />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>

        <Route path="login" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
