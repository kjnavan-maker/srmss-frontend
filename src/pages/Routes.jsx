import { Edit, MapPin, Plus, Search, Trash2 } from "lucide-react";

const routes = [
  {
    id: "R001",
    name: "Jaffna - Colombo",
    start: "Jaffna",
    end: "Colombo",
    stops: "Vavuniya, Anuradhapura, Kurunegala",
    distance: "396 km",
    time: "8h 30m",
    status: "Active",
  },
  {
    id: "R002",
    name: "Kandy - Colombo",
    start: "Kandy",
    end: "Colombo",
    stops: "Kadugannawa, Kegalle",
    distance: "115 km",
    time: "3h 15m",
    status: "Active",
  },
  {
    id: "R003",
    name: "Galle - Matara",
    start: "Galle",
    end: "Matara",
    stops: "Unawatuna, Weligama",
    distance: "46 km",
    time: "1h 20m",
    status: "Inactive",
  },
];

function Routes() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Route Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, update, search, and manage transport route details.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add New Route
        </button>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Route Details</h2>
              <p className="text-sm text-slate-500">Add or update route</p>
            </div>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Route Name
              </label>
              <input
                type="text"
                placeholder="Example: Jaffna - Colombo"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Start Point
                </label>
                <input
                  type="text"
                  placeholder="Jaffna"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  End Point
                </label>
                <input
                  type="text"
                  placeholder="Colombo"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Intermediate Stops
              </label>
              <textarea
                rows="3"
                placeholder="Vavuniya, Anuradhapura, Kurunegala"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Total Distance
                </label>
                <input
                  type="text"
                  placeholder="396 km"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Estimated Time
                </label>
                <input
                  type="text"
                  placeholder="8h 30m"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Route
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

        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-bold text-slate-900">Route List</h2>
                <p className="text-sm text-slate-500">
                  View and manage existing routes
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search route..."
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">ID</th>
                  <th className="text-left px-6 py-4 font-semibold">Route</th>
                  <th className="text-left px-6 py-4 font-semibold">Start</th>
                  <th className="text-left px-6 py-4 font-semibold">End</th>
                  <th className="text-left px-6 py-4 font-semibold">
                    Distance
                  </th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {routes.map((route) => (
                  <tr
                    key={route.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {route.id}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {route.name}
                      </p>
                      <p className="text-xs text-slate-400">{route.time}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{route.start}</td>
                    <td className="px-6 py-4 text-slate-600">{route.end}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {route.distance}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          route.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {route.status}
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
            {routes.map((route) => (
              <div
                key={route.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {route.id}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {route.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {route.start} to {route.end}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      route.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {route.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Distance</p>
                    <p className="font-semibold text-slate-800">
                      {route.distance}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Time</p>
                    <p className="font-semibold text-slate-800">
                      {route.time}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  Stops: {route.stops}
                </p>

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
        </div>
      </section>
    </div>
  );
}

export default Routes;