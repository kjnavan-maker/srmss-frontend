import {
  AlertTriangle,
  CalendarCheck,
  Edit,
  Plus,
  Search,
  Trash2,
  Wrench,
} from "lucide-react";

const maintenanceLogs = [
  {
    id: "M001",
    bus: "ND-4567",
    serviceDate: "2026-06-10",
    type: "Routine",
    details: "Oil change and brake inspection",
    nextService: "2026-07-10",
    cost: "LKR 15,000",
    status: "Completed",
  },
  {
    id: "M002",
    bus: "SP-2311",
    serviceDate: "2026-06-12",
    type: "Repair",
    details: "Engine overheating issue",
    nextService: "2026-06-25",
    cost: "LKR 38,000",
    status: "Pending",
  },
  {
    id: "M003",
    bus: "WP-7788",
    serviceDate: "2026-06-14",
    type: "Emergency",
    details: "Tyre replacement and suspension check",
    nextService: "2026-07-14",
    cost: "LKR 22,500",
    status: "Completed",
  },
];

function getStatusClass(status) {
  return status === "Completed"
    ? "bg-green-50 text-green-700"
    : "bg-amber-50 text-amber-700";
}

function getTypeClass(type) {
  switch (type) {
    case "Emergency":
      return "bg-red-50 text-red-700";
    case "Repair":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-blue-50 text-blue-700";
  }
}

function Maintenance() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Maintenance Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record routine maintenance, repair details, next service dates, and vehicle availability.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add Maintenance
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">18</p>
              <p className="text-sm text-slate-500">Completed Services</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">05</p>
              <p className="text-sm text-slate-500">Pending Maintenance</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">03</p>
              <p className="text-sm text-slate-500">Service Due Soon</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 className="font-bold text-amber-900">Maintenance Due Alert</h2>
            <p className="text-sm text-amber-800">
              Bus SP-2311 requires service before assigning it to a new schedule.
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wrench size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Maintenance Details</h2>
              <p className="text-sm text-slate-500">Add vehicle service record</p>
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
                Service Date
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Maintenance Type
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Routine</option>
                <option>Repair</option>
                <option>Emergency</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Repair / Service Details
              </label>
              <textarea
                rows="3"
                placeholder="Enter maintenance details"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Next Service Date
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Maintenance Cost
              </label>
              <input
                type="text"
                placeholder="LKR 15,000"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Pending</option>
                <option>Completed</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Vehicle Availability
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Available</option>
                <option>Under Maintenance</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Maintenance
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
                <h2 className="font-bold text-slate-900">Maintenance History</h2>
                <p className="text-sm text-slate-500">
                  View and manage maintenance records
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search maintenance..."
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
                  <th className="text-left px-6 py-4 font-semibold">Type</th>
                  <th className="text-left px-6 py-4 font-semibold">Service</th>
                  <th className="text-left px-6 py-4 font-semibold">Next</th>
                  <th className="text-left px-6 py-4 font-semibold">Cost</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {maintenanceLogs.map((log) => (
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
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getTypeClass(
                          log.type
                        )}`}
                      >
                        {log.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {log.serviceDate}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {log.nextService}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {log.cost}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          log.status
                        )}`}
                      >
                        {log.status}
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
            {maintenanceLogs.map((log) => (
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
                    <p className="mt-1 text-sm text-slate-500">
                      {log.details}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      log.status
                    )}`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Service Date</p>
                    <p className="font-semibold text-slate-800">
                      {log.serviceDate}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Cost</p>
                    <p className="font-semibold text-slate-800">{log.cost}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3">
                  <p className="text-sm text-slate-500">Next Service</p>
                  <p className="text-sm font-semibold text-slate-800">
                    {log.nextService}
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

export default Maintenance;