import { Bell, Menu, Search, UserCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back to SRMSS depot operations",
  },
  "/routes": {
    title: "Route Management",
    subtitle: "Create, update, search, and manage transport routes",
  },
  "/schedules": {
    title: "Schedule Management",
    subtitle: "Assign buses and drivers without schedule conflicts",
  },
  "/drivers": {
    title: "Driver Management",
    subtitle: "Manage driver details, license validity and availability",
  },
  "/vehicles": {
    title: "Vehicle Management",
    subtitle: "Manage bus registration, capacity, mileage and status",
  },
  "/fuel-logs": {
    title: "Fuel Log Management",
    subtitle: "Track fuel usage, mileage and monthly fuel cost",
  },
  "/maintenance": {
    title: "Maintenance Management",
    subtitle: "Record services, repairs and next maintenance dates",
  },
  "/reports": {
    title: "Reports and Analytics",
    subtitle: "Generate operational reports and performance insights",
  },
  "/users": {
    title: "User Management",
    subtitle: "Manage users and role-based access control",
  },
  "/driver-dashboard": {
    title: "Driver View",
    subtitle: "View assigned trips and update trip status",
  },
};

function getStoredUser() {
  try {
    const user = localStorage.getItem("user");
    const srmssUser = localStorage.getItem("srmssUser");

    if (user) {
      return JSON.parse(user);
    }

    if (srmssUser) {
      return JSON.parse(srmssUser);
    }

    return {};
  } catch {
    return {};
  }
}

function Navbar({ onMenuClick }) {
  const location = useLocation();
  const currentPage = pageTitles[location.pathname] || pageTitles["/dashboard"];

  const storedUser = getStoredUser();

  const displayName =
    storedUser.name ||
    storedUser.fullName ||
    storedUser.username ||
    "User";

  const displayRole =
    storedUser.role ||
    storedUser.userRole ||
    storedUser.type ||
    "Role";

  return (
    <header className="sticky top-0 z-30 bg-slate-50/90 backdrop-blur border-b border-slate-200">
      <div className="h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {currentPage.title}
            </h2>
            <p className="hidden sm:block text-sm text-slate-500">
              {currentPage.subtitle}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 w-80 rounded-2xl bg-white border border-slate-200 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search routes, buses, drivers..."
            className="w-full outline-none text-sm text-slate-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <button className="relative h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
            <Bell size={20} className="text-slate-600" />
          </button>

          <div className="hidden sm:flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-3 py-2">
            <UserCircle size={28} className="text-blue-600" />
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {displayName}
              </p>
              <p className="text-xs text-slate-500">{displayRole}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;