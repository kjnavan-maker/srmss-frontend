import { useEffect, useState } from "react";
import {
  Map,
  CalendarClock,
  BusFront,
  Users,
  Wrench,
  Fuel,
  CheckCircle2,
} from "lucide-react";
import StatCard from "../components/StatCard";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Dashboard() {
  const [summary, setSummary] = useState({
    totalRoutes: 0,
    totalDrivers: 0,
    totalVehicles: 0,
    activeSchedules: 0,
    totalFuelCost: 0,
    totalMaintenanceCost: 0,
    activeVehicles: 0,
    vehiclesInMaintenance: 0,
  });

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchSchedules();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await fetch(`${API_URL}/reports/summary`);
      const data = await res.json();

      if (data.success) {
        setSummary(data.data);
      }
    } catch (error) {
      console.error("Dashboard summary error:", error);
    }
  };

  const fetchSchedules = async () => {
    try {
      const res = await fetch(`${API_URL}/schedules`);
      const data = await res.json();

      if (data.success) {
        setSchedules(data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Dashboard schedules error:", error);
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Routes"
          value={summary.totalRoutes}
          subtitle="Routes registered"
          icon={Map}
          color="blue"
        />
        <StatCard
          title="Active Schedules"
          value={summary.activeSchedules}
          subtitle="Currently planned"
          icon={CalendarClock}
          color="green"
        />
        <StatCard
          title="Total Vehicles"
          value={summary.totalVehicles}
          subtitle={`${summary.activeVehicles} active vehicles`}
          icon={BusFront}
          color="blue"
        />
        <StatCard
          title="Total Drivers"
          value={summary.totalDrivers}
          subtitle="Registered drivers"
          icon={Users}
          color="slate"
        />
        <StatCard
          title="Maintenance Due"
          value={summary.vehiclesInMaintenance}
          subtitle="Vehicles in maintenance"
          icon={Wrench}
          color="red"
        />
        <StatCard
          title="Fuel Cost"
          value={`LKR ${summary.totalFuelCost}`}
          subtitle="Total recorded fuel cost"
          icon={Fuel}
          color="amber"
        />
        <StatCard
          title="Maintenance Cost"
          value={`LKR ${summary.totalMaintenanceCost}`}
          subtitle="Total service cost"
          icon={Wrench}
          color="red"
        />
        <StatCard
          title="System Status"
          value="Live"
          subtitle="Connected to MongoDB"
          icon={CheckCircle2}
          color="green"
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Recent Schedules
            </h3>
            <p className="text-sm text-slate-500">
              Latest route and bus assignments from database
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Route</th>
                  <th className="text-left px-6 py-4 font-semibold">Bus</th>
                  <th className="text-left px-6 py-4 font-semibold">Driver</th>
                  <th className="text-left px-6 py-4 font-semibold">Time</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {schedules.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-8 text-center text-slate-500"
                    >
                      No schedules available.
                    </td>
                  </tr>
                ) : (
                  schedules.map((item) => (
                    <tr
                      key={item._id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {item.routeNo}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {item.busNo}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {item.driverName}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {item.departureTime} - {item.arrivalTime}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status === "On-time" ||
                            item.status === "Completed"
                              ? "bg-green-50 text-green-700"
                              : item.status === "Delayed"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-blue-50 text-blue-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 text-white p-6 shadow-sm">
          <h3 className="text-lg font-bold">System Overview</h3>
          <p className="mt-1 text-sm text-slate-400">
            Live operational summary
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-green-300">Backend Connected</p>
              <p className="mt-1 text-sm text-slate-300">
                Data is fetched from MongoDB through Render API.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-blue-300">
                {summary.totalVehicles} vehicles registered
              </p>
              <p className="mt-1 text-sm text-slate-300">
                {summary.activeVehicles} vehicles currently active.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-amber-300">
                LKR {summary.totalFuelCost} fuel cost
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Based on recorded fuel logs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;