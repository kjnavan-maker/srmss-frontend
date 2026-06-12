import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarCheck,
  Edit,
  Plus,
  Search,
  Trash2,
  Wrench,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  busNo: "",
  issue: "",
  serviceDate: "",
  cost: "",
  status: "Pending",
};

function getStatusClass(status) {
  switch (status) {
    case "Completed":
      return "bg-green-50 text-green-700";
    case "In Progress":
      return "bg-blue-50 text-blue-700";
    case "Pending":
      return "bg-amber-50 text-amber-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function Maintenance() {
  const [maintenanceLogs, setMaintenanceLogs] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchMaintenanceLogs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/maintenance`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load maintenance records");
        return;
      }

      setMaintenanceLogs(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaintenanceLogs();
  }, []);

  const filteredMaintenanceLogs = useMemo(() => {
    return maintenanceLogs.filter((log) => {
      const text = `${log.busNo} ${log.issue} ${log.serviceDate} ${log.status}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [maintenanceLogs, searchTerm]);

  const completedCount = maintenanceLogs.filter(
    (log) => log.status === "Completed"
  ).length;

  const pendingCount = maintenanceLogs.filter(
    (log) => log.status === "Pending"
  ).length;

  const progressCount = maintenanceLogs.filter(
    (log) => log.status === "In Progress"
  ).length;

  const totalCost = maintenanceLogs.reduce(
    (total, log) => total + Number(log.cost || 0),
    0
  );

  const dueAlert = maintenanceLogs.find(
    (log) => log.status === "Pending" || log.status === "In Progress"
  );

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
        ? `${API_URL}/maintenance/${editingId}`
        : `${API_URL}/maintenance`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cost: Number(formData.cost),
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Action failed");
        return;
      }

      setMessage(
        editingId
          ? "Maintenance record updated successfully"
          : "Maintenance record added successfully"
      );

      clearForm();
      fetchMaintenanceLogs();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (log) => {
    setEditingId(log.id);

    setFormData({
      busNo: log.busNo || "",
      issue: log.issue || "",
      serviceDate: log.serviceDate || "",
      cost: log.cost || "",
      status: log.status || "Pending",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this maintenance record?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/maintenance/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Maintenance record deleted successfully");
      fetchMaintenanceLogs();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Maintenance Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Record maintenance issues, service dates, repair cost, and service
            status.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add Maintenance
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

      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {completedCount}
              </p>
              <p className="text-sm text-slate-500">Completed Services</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {pendingCount}
              </p>
              <p className="text-sm text-slate-500">Pending Maintenance</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <CalendarCheck className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                {progressCount}
              </p>
              <p className="text-sm text-slate-500">In Progress</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-slate-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">
                LKR {totalCost.toLocaleString()}
              </p>
              <p className="text-sm text-slate-500">Total Cost</p>
            </div>
          </div>
        </div>
      </section>

      {dueAlert && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="font-bold text-amber-900">
                Maintenance Due Alert
              </h2>
              <p className="text-sm text-amber-800">
                Bus {dueAlert.busNo} has a {dueAlert.status.toLowerCase()} maintenance
                issue: {dueAlert.issue}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wrench size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Maintenance" : "Maintenance Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId
                  ? "Edit selected maintenance record"
                  : "Add vehicle service record"}
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
                Service Date
              </label>
              <input
                type="date"
                name="serviceDate"
                value={formData.serviceDate}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Maintenance Issue
              </label>
              <textarea
                rows="3"
                name="issue"
                value={formData.issue}
                onChange={handleChange}
                placeholder="Enter maintenance issue or repair details"
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              ></textarea>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Maintenance Cost
              </label>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="15000"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Maintenance" : "Save Maintenance"}
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
                <h2 className="font-bold text-slate-900">
                  Maintenance History
                </h2>
                <p className="text-sm text-slate-500">
                  View and manage maintenance records from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search maintenance..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading maintenance records...
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">Bus</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Issue
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Service Date
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Cost
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
                    {filteredMaintenanceLogs.map((log) => (
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

                        <td className="px-6 py-4 text-slate-600 max-w-xs">
                          {log.issue}
                        </td>

                        <td className="px-6 py-4 text-slate-600">
                          {log.serviceDate}
                        </td>

                        <td className="px-6 py-4 font-semibold text-slate-900">
                          LKR {Number(log.cost || 0).toLocaleString()}
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
                {filteredMaintenanceLogs.map((log) => (
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
                          {log.issue}
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
                        <p className="font-semibold text-slate-800">
                          LKR {Number(log.cost || 0).toLocaleString()}
                        </p>
                      </div>
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

export default Maintenance;