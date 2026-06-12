import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  Edit,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  routeNo: "",
  busNo: "",
  driverName: "",
  departureTime: "",
  arrivalTime: "",
  date: "",
  status: "Scheduled",
};

function getStatusClass(status) {
  switch (status) {
    case "On-time":
    case "Scheduled":
      return "bg-green-50 text-green-700";
    case "Delayed":
      return "bg-amber-50 text-amber-700";
    case "Completed":
      return "bg-slate-100 text-slate-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-blue-50 text-blue-700";
  }
}

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [conflictStatus, setConflictStatus] = useState({
    type: "info",
    title: "Ready for validation",
    text: "Fill schedule details and create a schedule. The system will check bus conflicts.",
  });

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/schedules`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load schedules");
        return;
      }

      setSchedules(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const filteredSchedules = useMemo(() => {
    return schedules;
  }, [schedules]);

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
    setConflictStatus({
      type: "info",
      title: "Ready for validation",
      text: "Fill schedule details and create a schedule. The system will check bus conflicts.",
    });
  };

  const checkLocalConflict = () => {
    if (!formData.busNo || !formData.date || !formData.departureTime) {
      setConflictStatus({
        type: "warning",
        title: "Missing details",
        text: "Please select bus number, date and departure time first.",
      });
      return;
    }

    const conflict = schedules.find(
      (schedule) =>
        schedule.id !== editingId &&
        schedule.busNo === formData.busNo &&
        schedule.date === formData.date &&
        schedule.departureTime === formData.departureTime
    );

    if (conflict) {
      setConflictStatus({
        type: "error",
        title: "Schedule conflict detected",
        text: `Bus ${formData.busNo} is already assigned on ${formData.date} at ${formData.departureTime}.`,
      });
    } else {
      setConflictStatus({
        type: "success",
        title: "No conflict detected",
        text: "Selected bus is available for this date and departure time.",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const url = editingId
        ? `${API_URL}/schedules/${editingId}`
        : `${API_URL}/schedules`;

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

        if (response.status === 409) {
          setConflictStatus({
            type: "error",
            title: "Schedule conflict detected",
            text:
              data.message ||
              "This bus is already assigned at the same date and time.",
          });
        }

        return;
      }

      setMessage(
        editingId
          ? "Schedule updated successfully"
          : "Schedule created successfully"
      );

      setConflictStatus({
        type: "success",
        title: "Schedule saved",
        text: "Schedule has been validated and saved successfully.",
      });

      clearForm();
      fetchSchedules();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (schedule) => {
    setEditingId(schedule.id);

    setFormData({
      routeNo: schedule.routeNo || "",
      busNo: schedule.busNo || "",
      driverName: schedule.driverName || "",
      departureTime: schedule.departureTime || "",
      arrivalTime: schedule.arrivalTime || "",
      date: schedule.date || "",
      status: schedule.status || "Scheduled",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/schedules/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Schedule deleted successfully");
      fetchSchedules();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const conflictBoxClass =
    conflictStatus.type === "success"
      ? "border-green-200 bg-green-50 text-green-700"
      : conflictStatus.type === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : conflictStatus.type === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  const ConflictIcon =
    conflictStatus.type === "success"
      ? CheckCircle2
      : conflictStatus.type === "error"
      ? XCircle
      : AlertTriangle;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Schedule Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create schedules, assign buses and drivers, and detect schedule
            conflicts.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          New Schedule
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
        <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarClock size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Schedule" : "Create Schedule"}
              </h2>
              <p className="text-sm text-slate-500">
                Select route, bus, driver and time slot
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Route Number
              </label>
              <input
                type="text"
                name="routeNo"
                value={formData.routeNo}
                onChange={handleChange}
                placeholder="Example: 138"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

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
                Driver Name
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Example: Kamal Perera"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Schedule Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Departure Time
              </label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Arrival Time
              </label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Trip Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="On-time">On-time</option>
                <option value="Delayed">Delayed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={checkLocalConflict}
                className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
              >
                Check Conflict
              </button>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Schedule" : "Create Schedule"}
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

        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">Conflict Status</h2>
              <p className="text-sm text-slate-500">Schedule validation</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className={`rounded-2xl border p-4 ${conflictBoxClass}`}>
              <div className="flex gap-3">
                <ConflictIcon className="shrink-0" size={20} />
                <div>
                  <p className="font-semibold">{conflictStatus.title}</p>
                  <p className="mt-1 text-sm">{conflictStatus.text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-blue-300" />
              <p className="text-sm font-semibold">Validation Rule</p>
            </div>
            <p className="mt-2 text-sm text-slate-300">
              The system prevents assigning the same bus to the same date and
              departure time.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-bold text-slate-900">Schedule List</h2>
          <p className="text-sm text-slate-500">
            View, update and manage created schedules from backend API
          </p>
        </div>

        {loading ? (
          <div className="p-8 text-center text-slate-500">
            Loading schedules...
          </div>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">ID</th>
                    <th className="text-left px-6 py-4 font-semibold">Route</th>
                    <th className="text-left px-6 py-4 font-semibold">Bus</th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Driver
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">Date</th>
                    <th className="text-left px-6 py-4 font-semibold">Time</th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Status
                    </th>
                    <th className="text-right px-6 py-4 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSchedules.map((schedule) => (
                    <tr
                      key={schedule.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {schedule.id}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        Route {schedule.routeNo}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {schedule.busNo}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {schedule.driverName}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {schedule.date}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {schedule.departureTime} - {schedule.arrivalTime}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            schedule.status
                          )}`}
                        >
                          {schedule.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                          >
                            <Edit size={16} />
                          </button>

                          <button
                            onClick={() => handleDelete(schedule.id)}
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
              {filteredSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-blue-600">
                        {schedule.id}
                      </p>
                      <h3 className="mt-1 font-bold text-slate-900">
                        Route {schedule.routeNo}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {schedule.busNo} • {schedule.driverName}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        schedule.status
                      )}`}
                    >
                      {schedule.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Date</p>
                      <p className="font-semibold text-slate-800">
                        {schedule.date}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Departure</p>
                      <p className="font-semibold text-slate-800">
                        {schedule.departureTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(schedule)}
                      className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(schedule.id)}
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
      </section>
    </div>
  );
}

export default Schedules;