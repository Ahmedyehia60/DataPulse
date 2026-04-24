import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Wrapper() {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Wrapper;
