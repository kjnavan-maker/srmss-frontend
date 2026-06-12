import {
  CalendarDays,
  Edit,
  Fuel,
  Gauge,
  Plus,
  Search,
  Trash2,
  Wallet,
} from "lucide-react";

const fuelLogs = [
  {
    id: "F001",
    bus: "ND-4567",
    route: "Jaffna - Colombo",
    date: "2026-06-15",
    quantity: "80 L",
    cost: "LKR 25,000",
    mileage: "125,000 km",
    remarks: "Long distance trip",
  },
  {
    id: "F002",
    bus: "WP-7788",
    route: "Kandy - Colombo",
    date: "2026-06-15",
    quantity: "45 L",
    cost: "LKR 14,500",
    mileage: "98,500 km",
    remarks: "Regular route",
  },
  {
    id: "F003",
    bus: "SP-2311",
    route: "Galle - Matara",
    date: "2026-06-16",
    quantity: "30 L",
    cost: "LKR 9,800",
    mileage: "156,300 km",
    remarks: "Short distance route",
  },
];

function FuelLogs() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Fuel Log Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record vehicle fuel usage, mileage, fuel cost, and route fuel history.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add Fuel Log
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Fuel className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">1,250 L</p>
              <p className="text-sm text-slate-500">Monthly Fuel Usage</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wallet className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">LKR 450K</p>
              <p className="text-sm text-slate-500">Monthly Fuel Cost</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Gauge className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">8.4 km/L</p>
              <p className="text-sm text-slate-500">Average Efficiency</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Fuel size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Fuel Details</h2>
              <p className="text-sm text-slate-500">Add vehicle fuel record</p>
            </div>
          </div>

          <form className="mt-6 space-y-4">
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
                Date
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Route
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Jaffna - Colombo</option>
                <option>Kandy - Colombo</option>
                <option>Galle - Matara</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Fuel Quantity
                </label>
                <input
                  type="text"
                  placeholder="80 L"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Fuel Cost
                </label>
                <input
                  type="text"
                  placeholder="LKR 25,000"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Current Mileage
              </label>
              <input
                type="text"
                placeholder="125,000 km"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Remarks
              </label>
              <textarea
                rows="3"
                placeholder="Enter remarks"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Fuel Log
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
                <h2 className="font-bold text-slate-900">Fuel Log List</h2>
                <p className="text-sm text-slate-500">
                  View and manage vehicle fuel history
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search fuel log..."
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
                  <th className="text-left px-6 py-4 font-semibold">Bus</th>
                  <th className="text-left px-6 py-4 font-semibold">Route</th>
                  <th className="text-left px-6 py-4 font-semibold">Date</th>
                  <th className="text-left px-6 py-4 font-semibold">Fuel</th>
                  <th className="text-left px-6 py-4 font-semibold">Cost</th>
                  <th className="text-right px-6 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {fuelLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {log.id}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {log.bus}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{log.route}</td>
                    <td className="px-6 py-4 text-slate-600">{log.date}</td>
                    <td className="px-6 py-4 text-slate-600">
                      {log.quantity}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {log.cost}
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
            {fuelLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {log.id}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {log.bus}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{log.route}</p>
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                    {log.quantity}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Date</p>
                    <p className="font-semibold text-slate-800">{log.date}</p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Cost</p>
                    <p className="font-semibold text-slate-800">{log.cost}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl bg-white p-3">
                  <CalendarDays size={18} className="text-slate-400" />
                  <p className="text-sm text-slate-600">
                    Mileage: {log.mileage}
                  </p>
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
        </div>
      </section>
    </div>
  );
}

export default FuelLogs;