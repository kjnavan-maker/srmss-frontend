import {
  AlertTriangle,
  BusFront,
  Edit,
  Gauge,
  Plus,
  Search,
  Trash2,
  Wrench,
} from "lucide-react";

const vehicles = [
  {
    id: "V001",
    regNo: "ND-4567",
    type: "Luxury",
    capacity: 52,
    mileage: "125,000 km",
    status: "Available",
    maintenance: "Good",
  },
  {
    id: "V002",
    regNo: "WP-7788",
    type: "Semi-Luxury",
    capacity: 48,
    mileage: "98,500 km",
    status: "Assigned",
    maintenance: "Good",
  },
  {
    id: "V003",
    regNo: "SP-2311",
    type: "Normal",
    capacity: 45,
    mileage: "156,300 km",
    status: "Under Maintenance",
    maintenance: "Service Due",
  },
];

function getStatusClass(status) {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-700";
    case "Assigned":
      return "bg-blue-50 text-blue-700";
    case "Under Maintenance":
      return "bg-amber-50 text-amber-700";
    case "Inactive":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getMaintenanceClass(status) {
  return status === "Service Due"
    ? "bg-red-50 text-red-700"
    : "bg-green-50 text-green-700";
}

function Vehicles() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Vehicle Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage bus registration, seating capacity, mileage, and vehicle status.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add New Vehicle
        </button>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BusFront size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Vehicle Details</h2>
              <p className="text-sm text-slate-500">Add or update bus details</p>
            </div>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Registration Number
              </label>
              <input
                type="text"
                placeholder="Example: ND-4567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Bus Type
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Normal</option>
                <option>Semi-Luxury</option>
                <option>Luxury</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Seating Capacity
              </label>
              <input
                type="number"
                placeholder="52"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Mileage
              </label>
              <input
                type="text"
                placeholder="125,000 km"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Availability Status
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Available</option>
                <option>Assigned</option>
                <option>Under Maintenance</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Vehicle
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
                <h2 className="font-bold text-slate-900">Vehicle List</h2>
                <p className="text-sm text-slate-500">
                  View and manage registered vehicles
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vehicle..."
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
                  <th className="text-left px-6 py-4 font-semibold">Vehicle</th>
                  <th className="text-left px-6 py-4 font-semibold">Type</th>
                  <th className="text-left px-6 py-4 font-semibold">Capacity</th>
                  <th className="text-left px-6 py-4 font-semibold">Mileage</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {vehicles.map((vehicle) => (
                  <tr
                    key={vehicle.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {vehicle.id}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {vehicle.regNo}
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getMaintenanceClass(
                          vehicle.maintenance
                        )}`}
                      >
                        {vehicle.maintenance}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {vehicle.type}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {vehicle.capacity} seats
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {vehicle.mileage}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          vehicle.status
                        )}`}
                      >
                        {vehicle.status}
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
            {vehicles.map((vehicle) => (
              <div
                key={vehicle.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {vehicle.id}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {vehicle.regNo}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {vehicle.type} • {vehicle.capacity} seats
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      vehicle.status
                    )}`}
                  >
                    {vehicle.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Mileage</p>
                    <p className="font-semibold text-slate-800">
                      {vehicle.mileage}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Maintenance</p>
                    <p className="font-semibold text-slate-800">
                      {vehicle.maintenance}
                    </p>
                  </div>
                </div>

                {vehicle.maintenance === "Service Due" && (
                  <div className="mt-4 flex gap-2 rounded-xl bg-red-50 p-3 text-red-700">
                    <AlertTriangle size={18} />
                    <p className="text-sm font-medium">
                      Vehicle service is due.
                    </p>
                  </div>
                )}

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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <BusFront className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-sm text-slate-500">Available Vehicles</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Gauge className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">08</p>
              <p className="text-sm text-slate-500">Assigned Vehicles</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">03</p>
              <p className="text-sm text-slate-500">Under Maintenance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vehicles;