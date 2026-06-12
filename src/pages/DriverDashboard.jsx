import {
  BusFront,
  CalendarClock,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  PlayCircle,
  Route,
  UserCircle,
} from "lucide-react";

const todayTrips = [
  {
    id: "T001",
    route: "Jaffna - Colombo",
    bus: "ND-4567",
    departure: "08:00 AM",
    arrival: "04:30 PM",
    status: "Scheduled",
  },
  {
    id: "T002",
    route: "Colombo - Jaffna",
    bus: "ND-4567",
    departure: "06:00 PM",
    arrival: "02:30 AM",
    status: "Pending",
  },
];

function getStatusClass(status) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-50 text-blue-700";
    case "Started":
      return "bg-green-50 text-green-700";
    case "Completed":
      return "bg-slate-100 text-slate-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function DriverDashboard() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <UserCircle size={32} />
              </div>
              <div>
                <p className="text-blue-100 text-sm">Driver Dashboard</p>
                <h1 className="text-2xl sm:text-3xl font-bold">Mr. Kumar</h1>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-blue-100 leading-7">
              View today&apos;s assigned routes, bus details, departure time,
              arrival time and update trip status.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">02</p>
              <p className="text-xs text-blue-100">Today Trips</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">01</p>
              <p className="text-xs text-blue-100">Scheduled</p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs text-blue-100">Delayed</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Navigation size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Current Assignment</h2>
              <p className="text-sm text-slate-500">
                Main route assigned for today
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Assigned Route</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">
                  Jaffna - Colombo
                </h3>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Scheduled
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <BusFront size={18} />
                  <p className="text-sm">Bus Number</p>
                </div>
                <p className="mt-2 font-bold text-slate-900">ND-4567</p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock size={18} />
                  <p className="text-sm">Departure</p>
                </div>
                <p className="mt-2 font-bold text-slate-900">08:00 AM</p>
              </div>

              <div className="rounded-2xl bg-white p-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <CalendarClock size={18} />
                  <p className="text-sm">Arrival</p>
                </div>
                <p className="mt-2 font-bold text-slate-900">04:30 PM</p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition">
                <PlayCircle size={18} />
                Mark as Started
              </button>

              <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                <CheckCircle2 size={18} />
                Mark as Completed
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <h2 className="font-bold text-slate-900">Route Stops</h2>
          <p className="mt-1 text-sm text-slate-500">
            Main stops for assigned route
          </p>

          <div className="mt-6 space-y-4">
            {["Jaffna", "Vavuniya", "Anuradhapura", "Kurunegala", "Colombo"].map(
              (stop, index) => (
                <div key={stop} className="flex items-center gap-3">
                  <div
                    className={`h-9 w-9 rounded-2xl flex items-center justify-center ${
                      index === 0 || index === 4
                        ? "bg-blue-600 text-white"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <MapPin size={17} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{stop}</p>
                    <p className="text-xs text-slate-400">
                      {index === 0
                        ? "Starting point"
                        : index === 4
                        ? "Destination"
                        : "Intermediate stop"}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Today&apos;s Schedule</h2>
          <p className="text-sm text-slate-500">
            Trips assigned to the driver today
          </p>
        </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-6 py-4 font-semibold">Trip ID</th>
                <th className="text-left px-6 py-4 font-semibold">Route</th>
                <th className="text-left px-6 py-4 font-semibold">Bus</th>
                <th className="text-left px-6 py-4 font-semibold">
                  Departure
                </th>
                <th className="text-left px-6 py-4 font-semibold">Arrival</th>
                <th className="text-left px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>

            <tbody>
              {todayTrips.map((trip) => (
                <tr
                  key={trip.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {trip.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {trip.route}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{trip.bus}</td>
                  <td className="px-6 py-4 text-slate-600">
                    {trip.departure}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{trip.arrival}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        trip.status
                      )}`}
                    >
                      {trip.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-4 space-y-4">
          {todayTrips.map((trip) => (
            <div
              key={trip.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-blue-600">
                    {trip.id}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900">
                    {trip.route}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">{trip.bus}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                    trip.status
                  )}`}
                >
                  {trip.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Departure</p>
                  <p className="font-semibold text-slate-800">
                    {trip.departure}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Arrival</p>
                  <p className="font-semibold text-slate-800">
                    {trip.arrival}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DriverDashboard;