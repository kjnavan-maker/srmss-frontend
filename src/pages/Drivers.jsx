import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Edit,
  Plus,
  Search,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  name: "",
  licenseNo: "",
  phone: "",
  assignedRoute: "",
  status: "Available",
};

function getStatusClass(status) {
  switch (status) {
    case "Available":
      return "bg-green-50 text-green-700";
    case "On Duty":
    case "Assigned":
      return "bg-blue-50 text-blue-700";
    case "On Leave":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDrivers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/drivers`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load drivers");
        return;
      }

      setDrivers(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const text = `${driver.name} ${driver.licenseNo} ${driver.phone} ${driver.assignedRoute} ${driver.status}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [drivers, searchTerm]);

  const availableCount = drivers.filter(
    (driver) => driver.status === "Available"
  ).length;

  const assignedCount = drivers.filter(
    (driver) => driver.status === "On Duty" || driver.status === "Assigned"
  ).length;

  const leaveCount = drivers.filter((driver) => driver.status === "On Leave").length;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearForm = () => {
    setFormData(initialForm);
    setEditingId(null);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const url = editingId
        ? `${API_URL}/drivers/${editingId}`
        : `${API_URL}/drivers`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Action failed");
        return;
      }

      setMessage(
        editingId ? "Driver updated successfully" : "Driver added successfully"
      );

      clearForm();
      fetchDrivers();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (driver) => {
    setEditingId(driver.id);

    setFormData({
      name: driver.name || "",
      licenseNo: driver.licenseNo || "",
      phone: driver.phone || "",
      assignedRoute: driver.assignedRoute || "",
      status: driver.status || "Available",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this driver?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/drivers/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Driver deleted successfully");
      fetchDrivers();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Driver Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage driver details, license information, assigned routes, and
            availability.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New Driver
        </button>
      </div>

      {(message || error) && (
        <div
          className={`rounded-2xl px-5 py-4 text-sm font-medium ${
            error
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {error || message}
        </div>
      )}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Driver" : "Driver Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId ? "Edit selected driver" : "Add new driver"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Driver Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Example: Kamal Perera"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Contact Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0771234567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                License Number
              </label>
              <input
                type="text"
                name="licenseNo"
                value={formData.licenseNo}
                onChange={handleChange}
                placeholder="B1234567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Assigned Route
              </label>
              <input
                type="text"
                name="assignedRoute"
                value={formData.assignedRoute}
                onChange={handleChange}
                placeholder="138 Pettah - Homagama"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Availability Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Available">Available</option>
                <option value="On Duty">On Duty</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Driver" : "Save Driver"}
              </button>

              <button
                type="button"
                onClick={clearForm}
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
                  View and manage registered drivers from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search driver..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading drivers...
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Driver
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Contact
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        License
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Assigned Route
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Status
                      </th>
                      <th className="text-right px-6 py-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDrivers.map((driver) => (
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
                          <span className="mt-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            Valid
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {driver.phone}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {driver.licenseNo}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {driver.assignedRoute}
                        </td>
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
                            <button
                              onClick={() => handleEdit(driver)}
                              className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(driver.id)}
                              className="h-9 w-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100"
                            >
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
                {filteredDrivers.map((driver) => (
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
                          {driver.phone}
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
                          {driver.licenseNo}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-slate-400">Route</p>
                        <p className="font-semibold text-slate-800">
                          {driver.assignedRoute}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(driver)}
                        className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="flex-1 rounded-xl bg-red-50 py-2 text-sm font-semibold text-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <UserCheck className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {availableCount}
              </p>
              <p className="text-sm text-slate-500">Available Drivers</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Users className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {assignedCount}
              </p>
              <p className="text-sm text-slate-500">Assigned Drivers</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{leaveCount}</p>
              <p className="text-sm text-slate-500">On Leave Drivers</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Drivers;