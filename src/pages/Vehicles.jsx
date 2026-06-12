import { useEffect, useMemo, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  busNo: "",
  model: "",
  capacity: "",
  assignedRoute: "",
  status: "Active",
  lastService: "",
};

function getStatusClass(status) {
  switch (status) {
    case "Active":
    case "Available":
      return "bg-green-50 text-green-700";
    case "Assigned":
      return "bg-blue-50 text-blue-700";
    case "Maintenance":
    case "Under Maintenance":
      return "bg-amber-50 text-amber-700";
    case "Inactive":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function Vehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/vehicles`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load vehicles");
        return;
      }

      setVehicles(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const text = `${vehicle.busNo} ${vehicle.model} ${vehicle.capacity} ${vehicle.assignedRoute} ${vehicle.status}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [vehicles, searchTerm]);

  const activeCount = vehicles.filter(
    (vehicle) => vehicle.status === "Active" || vehicle.status === "Available"
  ).length;

  const assignedCount = vehicles.filter(
    (vehicle) => vehicle.assignedRoute && vehicle.assignedRoute !== "Not assigned"
  ).length;

  const maintenanceCount = vehicles.filter(
    (vehicle) =>
      vehicle.status === "Maintenance" || vehicle.status === "Under Maintenance"
  ).length;

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
        ? `${API_URL}/vehicles/${editingId}`
        : `${API_URL}/vehicles`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          capacity: Number(formData.capacity),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Action failed");
        return;
      }

      setMessage(
        editingId
          ? "Vehicle updated successfully"
          : "Vehicle added successfully"
      );

      clearForm();
      fetchVehicles();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle.id);

    setFormData({
      busNo: vehicle.busNo || "",
      model: vehicle.model || "",
      capacity: vehicle.capacity || "",
      assignedRoute: vehicle.assignedRoute || "",
      status: vehicle.status || "Active",
      lastService: vehicle.lastService || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vehicle?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/vehicles/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Vehicle deleted successfully");
      fetchVehicles();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Vehicle Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage bus registration, seating capacity, assigned routes, and
            vehicle status.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New Vehicle
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
              <BusFront size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Vehicle" : "Vehicle Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId ? "Edit selected vehicle" : "Add new bus details"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Bus Number
              </label>
              <input
                type="text"
                name="busNo"
                value={formData.busNo}
                onChange={handleChange}
                placeholder="Example: NB-4587"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Bus Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Example: Ashok Leyland"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Seating Capacity
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="54"
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
                Last Service Date
              </label>
              <input
                type="date"
                name="lastService"
                value={formData.lastService}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Vehicle Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Active">Active</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Vehicle" : "Save Vehicle"}
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
                <h2 className="font-bold text-slate-900">Vehicle List</h2>
                <p className="text-sm text-slate-500">
                  View and manage registered vehicles from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search vehicle..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading vehicles...
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Vehicle
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Model
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Capacity
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Route
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
                    {filteredVehicles.map((vehicle) => (
                      <tr
                        key={vehicle.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {vehicle.id}
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            {vehicle.busNo}
                          </p>
                          <span className="mt-1 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                            Last Service: {vehicle.lastService}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {vehicle.model}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {vehicle.capacity} seats
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {vehicle.assignedRoute}
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
                            <button
                              onClick={() => handleEdit(vehicle)}
                              className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(vehicle.id)}
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
                {filteredVehicles.map((vehicle) => (
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
                          {vehicle.busNo}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {vehicle.model} • {vehicle.capacity} seats
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
                        <p className="text-slate-400">Route</p>
                        <p className="font-semibold text-slate-800">
                          {vehicle.assignedRoute}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-slate-400">Last Service</p>
                        <p className="font-semibold text-slate-800">
                          {vehicle.lastService}
                        </p>
                      </div>
                    </div>

                    {(vehicle.status === "Maintenance" ||
                      vehicle.status === "Under Maintenance") && (
                      <div className="mt-4 flex gap-2 rounded-xl bg-amber-50 p-3 text-amber-700">
                        <AlertTriangle size={18} />
                        <p className="text-sm font-medium">
                          Vehicle is under maintenance.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(vehicle)}
                        className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(vehicle.id)}
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
            <BusFront className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {activeCount}
              </p>
              <p className="text-sm text-slate-500">Active Vehicles</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Gauge className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {assignedCount}
              </p>
              <p className="text-sm text-slate-500">Assigned Vehicles</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {maintenanceCount}
              </p>
              <p className="text-sm text-slate-500">Under Maintenance</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Vehicles;