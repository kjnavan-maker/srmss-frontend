import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  CalendarClock,
  Users,
  BusFront,
  Fuel,
  Wrench,
  BarChart3,
  UserCog,
  Navigation,
  LogOut,
} from "lucide-react";

const allMenuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Routes",
    icon: Map,
    path: "/routes",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Schedules",
    icon: CalendarClock,
    path: "/schedules",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Drivers",
    icon: Users,
    path: "/drivers",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Vehicles",
    icon: BusFront,
    path: "/vehicles",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Fuel Logs",
    icon: Fuel,
    path: "/fuel-logs",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Maintenance",
    icon: Wrench,
    path: "/maintenance",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Reports",
    icon: BarChart3,
    path: "/reports",
    roles: ["Admin", "Administrator", "Depot Manager", "Manager"],
  },
  {
    name: "Users",
    icon: UserCog,
    path: "/users",
    roles: ["Admin", "Administrator"],
  },
  {
    name: "Driver View",
    icon: Navigation,
    path: "/driver-dashboard",
    roles: ["Admin", "Administrator", "Driver"],
  },
];

function getStoredUser() {
  try {
    return (
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("srmssUser")) ||
      {}
    );
  } catch {
    return {};
  }
}

function Sidebar() {
  const navigate = useNavigate();

  const storedUser = getStoredUser();

  const userRole =
    storedUser.role ||
    storedUser.userRole ||
    storedUser.type ||
    storedUser.accountType ||
    "";

  const menuItems = allMenuItems.filter((item) =>
    item.roles.includes(userRole)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("srmssToken");
    localStorage.removeItem("srmssUser");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 bg-slate-950 text-white flex-col">
      <div className="h-20 flex items-center gap-3 px-6 border-b border-white/10">
        <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
          <BusFront size={26} />
        </div>
        <div>
          <h1 className="text-xl font-bold">SRMSS</h1>
          <p className="text-xs text-slate-400">Depot Management</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Icon size={20} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-500/10 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;