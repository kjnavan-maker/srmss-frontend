import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import MobileSidebar from "./components/MobileSidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PagePlaceholder from "./pages/PagePlaceholder";
import RoutesPage from "./pages/Routes";
import SchedulesPage from "./pages/Schedules";
import DriversPage from "./pages/Drivers";
import VehiclesPage from "./pages/Vehicles";
import FuelLogsPage from "./pages/FuelLogs";
import MaintenancePage from "./pages/Maintenance";
import ReportsPage from "./pages/Reports";
import UsersPage from "./pages/Users";
import DriverDashboardPage from "./pages/DriverDashboard";
import PageTransition from "./components/PageTransition";

function AppLayout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      <MobileSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <Navbar onMenuClick={() => setIsMobileSidebarOpen(true)} />

        <main className="p-4 sm:p-6 lg:p-8">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />

        <Route
  path="/routes"
  element={
    <AppLayout>
      <RoutesPage />
    </AppLayout>
  }
/>

        <Route
  path="/schedules"
  element={
    <AppLayout>
      <SchedulesPage />
    </AppLayout>
  }
/>

        <Route
  path="/drivers"
  element={
    <AppLayout>
      <DriversPage />
    </AppLayout>
  }
/>

        <Route
  path="/vehicles"
  element={
    <AppLayout>
      <VehiclesPage />
    </AppLayout>
  }
/>

        <Route
  path="/fuel-logs"
  element={
    <AppLayout>
      <FuelLogsPage />
    </AppLayout>
  }
/>

        <Route
  path="/maintenance"
  element={
    <AppLayout>
      <MaintenancePage />
    </AppLayout>
  }
/>

        <Route
  path="/reports"
  element={
    <AppLayout>
      <ReportsPage />
    </AppLayout>
  }
/>

        <Route
  path="/users"
  element={
    <AppLayout>
      <UsersPage />
    </AppLayout>
  }
/>

<Route
  path="/driver-dashboard"
  element={
    <AppLayout>
      <DriverDashboardPage />
    </AppLayout>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;