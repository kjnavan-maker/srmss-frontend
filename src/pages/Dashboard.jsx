import {
  Map,
  CalendarClock,
  BusFront,
  Users,
  AlertTriangle,
  CheckCircle2,
  Wrench,
  Fuel,
} from "lucide-react";
import StatCard from "../components/StatCard";

const schedules = [
  {
    route: "Jaffna - Colombo",
    bus: "ND-4567",
    driver: "Mr. Kumar",
    time: "08:00 AM",
    status: "On-time",
  },
  {
    route: "Kandy - Colombo",
    bus: "WP-7788",
    driver: "Mr. Silva",
    time: "09:30 AM",
    status: "Delayed",
  },
  {
    route: "Galle - Matara",
    bus: "SP-2311",
    driver: "Mr. Perera",
    time: "10:15 AM",
    status: "Scheduled",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Routes"
          value="28"
          subtitle="+4 this month"
          icon={Map}
          color="blue"
        />
        <StatCard
          title="Active Trips"
          value="16"
          subtitle="Currently running"
          icon={CalendarClock}
          color="green"
        />
        <StatCard
          title="Available Buses"
          value="12"
          subtitle="Ready for assignment"
          icon={BusFront}
          color="blue"
        />
        <StatCard
          title="Assigned Drivers"
          value="34"
          subtitle="Today duty roster"
          icon={Users}
          color="slate"
        />
        <StatCard
          title="Delayed Trips"
          value="03"
          subtitle="Need attention"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Completed Trips"
          value="48"
          subtitle="Today completed"
          icon={CheckCircle2}
          color="green"
        />
        <StatCard
          title="Maintenance Due"
          value="05"
          subtitle="Service required"
          icon={Wrench}
          color="red"
        />
        <StatCard
          title="Monthly Fuel Cost"
          value="LKR 450K"
          subtitle="June 2026"
          icon={Fuel}
          color="amber"
        />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">
              Recent Schedules
            </h3>
            <p className="text-sm text-slate-500">
              Latest route and bus assignments
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
                {schedules.map((item) => (
                  <tr
                    key={item.bus}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {item.route}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.bus}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {item.driver}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{item.time}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          item.status === "On-time"
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-950 text-white p-6 shadow-sm">
          <h3 className="text-lg font-bold">Operational Alerts</h3>
          <p className="mt-1 text-sm text-slate-400">
            Important updates for today
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-amber-300">
                3 delayed trips
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Check schedule management for details.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-red-300">
                5 vehicles maintenance due
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Update maintenance logs before assignment.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-green-300">
                12 buses available
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Ready for new route assignments.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;