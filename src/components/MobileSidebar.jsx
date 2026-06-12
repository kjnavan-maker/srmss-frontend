import { NavLink } from "react-router-dom";
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
  X,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Routes", icon: Map, path: "/routes" },
  { name: "Schedules", icon: CalendarClock, path: "/schedules" },
  { name: "Drivers", icon: Users, path: "/drivers" },
  { name: "Vehicles", icon: BusFront, path: "/vehicles" },
  { name: "Fuel Logs", icon: Fuel, path: "/fuel-logs" },
  { name: "Maintenance", icon: Wrench, path: "/maintenance" },
  { name: "Reports", icon: BarChart3, path: "/reports" },
  { name: "Users", icon: UserCog, path: "/users" },
  { name: "Driver View", icon: Navigation, path: "/driver-dashboard" },
];

function MobileSidebar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-slate-950/60 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      ></div>

      <aside
        className={`absolute left-0 top-0 h-full w-80 max-w-[85%] bg-slate-950 text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-20 flex items-center justify-between gap-3 px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center">
              <BusFront size={26} />
            </div>
            <div>
              <h1 className="text-xl font-bold">SRMSS</h1>
              <p className="text-xs text-slate-400">Depot Management</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-10 w-10 rounded-2xl bg-white/10 flex items-center justify-center"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
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

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <NavLink
            to="/login"
            onClick={onClose}
            className="w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-red-300 hover:bg-red-500/10 transition"
          >
            <LogOut size={20} />
            Logout
          </NavLink>
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;