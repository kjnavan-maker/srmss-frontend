import {
  AlertTriangle,
  Edit,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";

const drivers = [
  {
    id: "D001",
    name: "Mr. Kumar",
    contact: "+94 77 123 4567",
    license: "B1234567",
    expiry: "2027-05-20",
    hours: "08:00 AM - 04:00 PM",
    status: "Available",
    licenseStatus: "Valid",
  },
  {
    id: "D002",
    name: "Mr. Silva",
    contact: "+94 76 456 7788",
    license: "B7788991",
    expiry: "2026-07-10",
    hours: "09:00 AM - 05:00 PM",
    status: "Assigned",
    licenseStatus: "Expiring Soon",
  },
  {
    id: "D003",
    name: "Mr. Perera",
    contact: "+94 71 987 6543",
    license: "B4455662",
    expiry: "2028-01-15",
    hours: "10:00 AM - 06:00 PM",
    status: "On Leave",
    licenseStatus: "Valid",
  },
];

function getStatusClass(status) {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-700";
    case "Assigned":
      return "bg-blue-50 text-blue-700";
    case "On Leave":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getLicenseClass(status) {
  return status === "Expiring Soon"
    ? "bg-amber-50 text-amber-700"
    : "bg-green-50 text-green-700";
}

function Drivers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Driver Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage driver details, license validity, working hours, and availability.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add New Driver
        </button>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Driver Details</h2>
              <p className="text-sm text-slate-500">Add or update driver</p>
            </div>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Driver Name
              </label>
              <input
                type="text"
                placeholder="Example: Mr. Kumar"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Contact Number
              </label>
              <input
                type="text"
                placeholder="+94 77 123 4567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                License Number
              </label>
              <input
                type="text"
                placeholder="B1234567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                License Expiry Date
              </label>
              <input
                type="date"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Working Hours
              </label>
              <input
                type="text"
                placeholder="08:00 AM - 04:00 PM"
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
                <option>On Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save Driver
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
                <h2 className="font-bold text-slate-900">Driver List</h2>
                <p className="text-sm text-slate-500">
                  View and manage registered drivers
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search driver..."
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
                  <th className="text-left px-6 py-4 font-semibold">Driver</th>
                  <th className="text-left px-6 py-4 font-semibold">Contact</th>
                  <th className="text-left px-6 py-4 font-semibold">License</th>
                  <th className="text-left px-6 py-4 font-semibold">Hours</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {drivers.map((driver) => (
                  <tr
                    key={driver.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {driver.id}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {driver.name}
                      </p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getLicenseClass(
                          driver.licenseStatus
                        )}`}
                      >
                        {driver.licenseStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {driver.contact}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {driver.license}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{driver.hours}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          driver.status
                        )}`}
                      >
                        {driver.status}
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
            {drivers.map((driver) => (
              <div
                key={driver.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {driver.id}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {driver.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {driver.contact}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      driver.status
                    )}`}
                  >
                    {driver.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">License</p>
                    <p className="font-semibold text-slate-800">
                      {driver.license}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Expiry</p>
                    <p className="font-semibold text-slate-800">
                      {driver.expiry}
                    </p>
                  </div>
                </div>

                {driver.licenseStatus === "Expiring Soon" && (
                  <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-amber-700">
                    <AlertTriangle size={18} />
                    <p className="text-sm font-medium">
                      License is expiring soon.
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
            <UserCheck className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">18</p>
              <p className="text-sm text-slate-500">Available Drivers</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">12</p>
              <p className="text-sm text-slate-500">Assigned Drivers</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">02</p>
              <p className="text-sm text-slate-500">License Alerts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Drivers;