import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "../pages/Dashboard/DashBoard";
import Inventory from "../pages/Inventory/Inventory";
import Orders from "../pages/Orders/Orders";
import Analytics from "../pages/Analytics/Analytics";
import Settings from "../pages/Settings/Settings";
import Wrapper from "../layout/Wrapper";

function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route index element={<DashBoard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
