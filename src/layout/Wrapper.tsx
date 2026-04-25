import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Alert from "../components/Alert";

function Wrapper() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">     
        <Navbar />     
        <main className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="max-w-400 mx-auto">
            {/* <Alert /> */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Wrapper;
