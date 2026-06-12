import { useEffect, useMemo, useState } from "react";
import { Edit, MapPin, Plus, Search, Trash2 } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  routeNo: "",
  startPoint: "",
  endPoint: "",
  stops: "",
  distance: "",
  estimatedTime: "",
  status: "Active",
};

function Routes() {
  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/routes`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load routes");
        return;
      }

      setRoutes(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  const filteredRoutes = useMemo(() => {
    return routes.filter((route) => {
      const text = `${route.routeNo} ${route.startPoint} ${route.endPoint} ${route.status}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [routes, searchTerm]);

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
        ? `${API_URL}/routes/${editingId}`
        : `${API_URL}/routes`;

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
        editingId ? "Route updated successfully" : "Route added successfully"
      );

      clearForm();
      fetchRoutes();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (route) => {
    setEditingId(route.id);

    setFormData({
      routeNo: route.routeNo || "",
      startPoint: route.startPoint || "",
      endPoint: route.endPoint || "",
      stops: route.stops || "",
      distance: route.distance || "",
      estimatedTime: route.estimatedTime || "",
      status: route.status || "Active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/routes/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("Route deleted successfully");
      fetchRoutes();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

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

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New Route
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
              <MapPin size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update Route" : "Route Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId ? "Edit selected route" : "Add new route"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Start Point
                </label>
                <input
                  type="text"
                  name="startPoint"
                  value={formData.startPoint}
                  onChange={handleChange}
                  placeholder="Pettah"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  End Point
                </label>
                <input
                  type="text"
                  name="endPoint"
                  value={formData.endPoint}
                  onChange={handleChange}
                  placeholder="Homagama"
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
                name="stops"
                value={formData.stops}
                onChange={handleChange}
                placeholder="Nugegoda, Maharagama, Kottawa"
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
                  name="distance"
                  value={formData.distance}
                  onChange={handleChange}
                  placeholder="28 km"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Estimated Time
                </label>
                <input
                  type="text"
                  name="estimatedTime"
                  value={formData.estimatedTime}
                  onChange={handleChange}
                  placeholder="1h 20m"
                  className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {editingId ? "Update Route" : "Save Route"}
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
                <h2 className="font-bold text-slate-900">Route List</h2>
                <p className="text-sm text-slate-500">
                  View and manage existing routes from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading routes...
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Route
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Start
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        End
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Distance
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
                    {filteredRoutes.map((route) => (
                      <tr
                        key={route.id}
                        className="border-t border-slate-100 hover:bg-slate-50"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-700">
                          {route.id}
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-900">
                            Route {route.routeNo}
                          </p>
                          <p className="text-xs text-slate-400">
                            {route.estimatedTime}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {route.startPoint}
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          {route.endPoint}
                        </td>
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
                            <button
                              onClick={() => handleEdit(route)}
                              className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(route.id)}
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
                {filteredRoutes.map((route) => (
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
                          Route {route.routeNo}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {route.startPoint} to {route.endPoint}
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
                          {route.estimatedTime}
                        </p>
                      </div>
                    </div>

                    <p className="mt-3 text-sm text-slate-500">
                      Stops: {route.stops || "Not specified"}
                    </p>

                    <div className="mt-4 flex gap-2">
                      <button
                        onClick={() => handleEdit(route)}
                        className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(route.id)}
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

export default Routes;