import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  Edit,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

const schedules = [
  {
    id: "S001",
    route: "Jaffna - Colombo",
    bus: "ND-4567",
    driver: "Mr. Kumar",
    date: "2026-06-15",
    departure: "08:00 AM",
    arrival: "04:30 PM",
    status: "On-time",
  },
  {
    id: "S002",
    route: "Kandy - Colombo",
    bus: "WP-7788",
    driver: "Mr. Silva",
    date: "2026-06-15",
    departure: "09:30 AM",
    arrival: "12:45 PM",
    status: "Delayed",
  },
  {
    id: "S003",
    route: "Galle - Matara",
    bus: "SP-2311",
    driver: "Mr. Perera",
    date: "2026-06-16",
    departure: "10:15 AM",
    arrival: "11:35 AM",
    status: "Scheduled",
  },
];

function getStatusClass(status) {
  switch (status) {
    case "On-time":
      return "bg-green-50 text-green-700";
    case "Delayed":
      return "bg-amber-50 text-amber-700";
    case "Completed":
      return "bg-slate-100 text-slate-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-blue-50 text-blue-700";
  }
}

function Schedules() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Schedule Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create schedules, assign buses and drivers, and detect schedule conflicts.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          New Schedule
        </button>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarClock size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Create Schedule</h2>
              <p className="text-sm text-slate-500">
                Select route, bus, driver and time slot
              </p>
            </div>
          </div>

          <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Select Route
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Jaffna - Colombo</option>
                <option>Kandy - Colombo</option>
                <option>Galle - Matara</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Select Bus
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>ND-4567</option>
                <option>WP-7788</option>
                <option>SP-2311</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Select Driver
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Mr. Kumar</option>
                <option>Mr. Silva</option>
                <option>Mr. Perera</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Schedule Date
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Departure Time
              </label>
              <input
                type="time"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Arrival Time
              </label>
              <input
                type="time"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Trip Status
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Scheduled</option>
                <option>On-time</option>
                <option>Delayed</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Check Conflict
              </button>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Create Schedule
              </button>
              <button
                type="button"
                className="rounded-2xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Conflict Status</h2>
              <p className="text-sm text-slate-500">Schedule validation</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
              <div className="flex gap-3">
                <CheckCircle2 className="text-green-600 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-green-800">
                    No conflict detected
                  </p>
                  <p className="mt-1 text-sm text-green-700">
                    Selected route, bus and driver are available for this time slot.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex gap-3">
                <AlertTriangle className="text-amber-600 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-amber-800">
                    Example warning
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Bus ND-4567 is already assigned from 08:00 AM to 12:00 PM.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex gap-3">
                <XCircle className="text-red-600 shrink-0" size={20} />
                <div>
                  <p className="font-semibold text-red-800">
                    Example error
                  </p>
                  <p className="mt-1 text-sm text-red-700">
                    Selected driver is unavailable for this time slot.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-300" />
              <p className="text-sm font-semibold">Validation Rule</p>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              The system should prevent assigning the same bus or driver to overlapping schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Schedule List</h2>
          <p className="text-sm text-slate-500">
            View, update and manage created schedules
          </p>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">ID</th>
                <th className="text-left px-6 py-4 font-semibold">Route</th>
                <th className="text-left px-6 py-4 font-semibold">Bus</th>
                <th className="text-left px-6 py-4 font-semibold">Driver</th>
                <th className="text-left px-6 py-4 font-semibold">Date</th>
                <th className="text-left px-6 py-4 font-semibold">Time</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
                <th className="text-right px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {schedule.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {schedule.route}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{schedule.bus}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {schedule.driver}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {schedule.date}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {schedule.departure} - {schedule.arrival}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        schedule.status
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100">
                        <Edit size={16} />
                      </button>
                      <button className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-4 space-y-4">
          {schedules.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-blue-600">
                    {schedule.id}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900">
                    {schedule.route}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {schedule.bus} • {schedule.driver}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    schedule.status
                  )}`}
                >
                  {schedule.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Date</p>
                  <p className="font-semibold text-slate-800">
                    {schedule.date}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Time</p>
                  <p className="font-semibold text-slate-800">
                    {schedule.departure}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600">
                  Edit
                </button>
                <button className="flex-1 rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Schedules;