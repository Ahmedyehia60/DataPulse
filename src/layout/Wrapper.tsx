import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Alert from "../components/Alert";

function Wrapper() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-4">
          <Alert />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Wrapper;
