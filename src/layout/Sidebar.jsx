import { NavLink } from "react-router-dom";

function Sidebar() {
  const pages = [
    { name: "DashBoard", path: "/" },
    { name: "Inventory", path: "inventory" },
    { name: "Orders", path: "orders" },
    { name: "Analytics", path: "analytics" },
    { name: "Settings", path: "settings" },
  ];

  return (
    <div className="sidebar">
      <h2>DataPulse</h2>

      <nav>
        {pages.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => (isActive ? "active-link" : "link")}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
