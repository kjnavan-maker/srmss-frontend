import { useEffect, useMemo, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  busNo: "",
  fuelType: "Diesel",
  liters: "",
  cost: "",
  filledDate: "",
  odometerReading: "",
  driverName: "",
};

function FuelLogs() {
  const [fuelLogs, setFuelLogs] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchFuelLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/fuel-logs`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load fuel logs");
        return;
      }

      setFuelLogs(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFuelLogs();
  }, []);

  const filteredFuelLogs = useMemo(() => {
    return fuelLogs.filter((log) => {
      const text = `${log.busNo} ${log.fuelType} ${log.filledDate} ${log.driverName}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [fuelLogs, searchTerm]);

  const totalLiters = fuelLogs.reduce(
    (total, log) => total + Number(log.liters || 0),
    0
  );

  const totalCost = fuelLogs.reduce(
    (total, log) => total + Number(log.cost || 0),
    0
  );

  const averageCostPerLiter =
    totalLiters > 0 ? Math.round(totalCost / totalLiters) : 0;

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
        ? `${API_URL}/fuel-logs/${editingId}`
        : `${API_URL}/fuel-logs`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          liters: Number(formData.liters),
          cost: Number(formData.cost),
          odometerReading: Number(formData.odometerReading),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Action failed");
        return;
      }

      setMessage(
        editingId
          ? "Fuel log updated successfully"
          : "Fuel log added successfully"
      );

      clearForm();
      fetchFuelLogs();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (log) => {
    setEditingId(log.id);

    setFormData({
      busNo: log.busNo || "",
      fuelType: log.fuelType || "Diesel",
      liters: log.liters || "",
      cost: log.cost || "",
      filledDate: log.filledDate || "",
      odometerReading: log.odometerReading || "",
      driverName: log.driverName || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this fuel log?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/fuel-logs/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Fuel log deleted successfully");
      fetchFuelLogs();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Fuel Log Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record vehicle fuel usage, odometer reading, fuel cost, and driver
            details.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Fuel Log
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

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Fuel className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {totalLiters} L
              </p>
              <p className="text-sm text-slate-500">Total Fuel Usage</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wallet className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                LKR {totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">Total Fuel Cost</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Gauge className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                LKR {averageCostPerLiter}
              </p>
              <p className="text-sm text-slate-500">Average Cost / Liter</p>
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
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Fuel Log" : "Fuel Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId ? "Edit selected fuel record" : "Add vehicle fuel record"}
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
                placeholder="NB-4587"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Filled Date
              </label>
              <input
                type="date"
                name="filledDate"
                value={formData.filledDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Fuel Quantity
                </label>
                <input
                  type="number"
                  name="liters"
                  value={formData.liters}
                  onChange={handleChange}
                  placeholder="80"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Fuel Cost
                </label>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  placeholder="25600"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Odometer Reading
              </label>
              <input
                type="number"
                name="odometerReading"
                value={formData.odometerReading}
                onChange={handleChange}
                placeholder="125400"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Driver Name
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Kamal Perera"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Fuel Log" : "Save Fuel Log"}
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
                <h2 className="font-bold text-slate-900">Fuel Log List</h2>
                <p className="text-sm text-slate-500">
                  View and manage vehicle fuel history from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search fuel log..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading fuel logs...
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">Bus</th>
                      <th className="text-left px-6 py-4 font-semibold">Driver</th>
                      <th className="text-left px-6 py-4 font-semibold">Date</th>
                      <th className="text-left px-6 py-4 font-semibold">Fuel</th>
                      <th className="text-left px-6 py-4 font-semibold">Cost</th>
                      <th className="text-right px-6 py-4 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredFuelLogs.map((log) => (
                      <tr
                        key={log.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {log.id}
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-900">
                          {log.busNo}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {log.driverName}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {log.filledDate}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {log.liters} L
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-900">
                          LKR {Number(log.cost || 0).toLocaleString()}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEdit(log)}
                              className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(log.id)}
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
                {filteredFuelLogs.map((log) => (
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
                          {log.busNo}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {log.driverName}
                        </p>
                      </div>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                        {log.liters} L
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-white p-3">
                        <p className="text-slate-400">Date</p>
                        <p className="font-semibold text-slate-800">
                          {log.filledDate}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <p className="text-slate-400">Cost</p>
                        <p className="font-semibold text-slate-800">
                          LKR {Number(log.cost || 0).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-white p-3">
                      <CalendarDays size={18} className="text-slate-400" />
                      <p className="text-sm text-slate-600">
                        Odometer: {log.odometerReading}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(log)}
                        className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(log.id)}
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
    </div>
  );
}

export default FuelLogs;