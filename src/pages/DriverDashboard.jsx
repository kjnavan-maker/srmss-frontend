import { useEffect, useMemo, useState } from "react";
import {
  BusFront,
  CalendarClock,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  PlayCircle,
  Save,
  UserCircle,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function getStoredUser() {
  try {
    const user = localStorage.getItem("user");
    const srmssUser = localStorage.getItem("srmssUser");

    if (user) return JSON.parse(user);
    if (srmssUser) return JSON.parse(srmssUser);

    return {};
  } catch {
    return {};
  }
}

function getStatusClass(status) {
  switch (status) {
    case "Scheduled":
      return "bg-blue-50 text-blue-700";
    case "Started":
      return "bg-green-50 text-green-700";
    case "Completed":
      return "bg-slate-100 text-slate-700";
    case "Delayed":
      return "bg-amber-50 text-amber-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function DriverDashboard() {
  const storedUser = getStoredUser();

  const driverName =
    storedUser.name || storedUser.fullName || storedUser.username || "Driver";

  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [status, setStatus] = useState("Scheduled");
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchTrips = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/schedules`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load assigned trips");
        return;
      }

      const scheduleData = data.data || [];

      const driverTrips = scheduleData.filter((trip) => {
        if (!trip.driverName) return true;

        return (
          trip.driverName.toLowerCase().includes(driverName.toLowerCase()) ||
          driverName.toLowerCase().includes(trip.driverName.toLowerCase())
        );
      });

      const finalTrips = driverTrips.length > 0 ? driverTrips : scheduleData;

      setTrips(finalTrips);

      if (finalTrips.length > 0) {
        setSelectedTrip(finalTrips[0]);
        setStatus(finalTrips[0].status || "Scheduled");
        setRemarks(finalTrips[0].remarks || "");
      }
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const todayStats = useMemo(() => {
    return {
      total: trips.length,
      scheduled: trips.filter((trip) => trip.status === "Scheduled").length,
      delayed: trips.filter((trip) => trip.status === "Delayed").length,
    };
  }, [trips]);

  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setStatus(trip.status || "Scheduled");
    setRemarks(trip.remarks || "");
    setMessage("");
    setError("");
  };

  const updateTripStatus = async (newStatus = status) => {
    if (!selectedTrip) {
      setError("Please select a trip first");
      return;
    }

    try {
      setMessage("");
      setError("");

      const updatedTrip = {
        ...selectedTrip,
        status: newStatus,
        remarks,
      };

      const response = await fetch(`${API_URL}/schedules/${selectedTrip.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTrip),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Trip update failed");
        return;
      }

      setStatus(newStatus);
      setSelectedTrip(data.data);

      setTrips((prevTrips) =>
        prevTrips.map((trip) =>
          trip.id === selectedTrip.id ? data.data : trip
        )
      );

      setMessage("Trip status updated successfully");
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-6 sm:p-8 text-white shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                <UserCircle size={32} />
              </div>

              <div>
                <p className="text-blue-100 text-sm">Driver Dashboard</p>
                <h1 className="text-2xl sm:text-3xl font-bold">
                  {driverName}
                </h1>
              </div>
            </div>

            <p className="mt-6 max-w-2xl text-blue-100 leading-7">
              View assigned routes, bus details, departure time, arrival time
              and update trip status with remarks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">{todayStats.total}</p>
              <p className="text-xs text-blue-100">Assigned Trips</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 text-center">
              <p className="text-2xl font-bold">{todayStats.scheduled}</p>
              <p className="text-xs text-blue-100">Scheduled</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold">{todayStats.delayed}</p>
              <p className="text-xs text-blue-100">Delayed</p>
            </div>
          </div>
        </div>
      </section>

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

      {loading ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center text-slate-500">
          Loading assigned trips...
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Navigation size={22} />
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Current Assignment
                  </h2>
                  <p className="text-sm text-slate-500">
                    Selected route assigned to driver
                  </p>
                </div>
              </div>

              {selectedTrip ? (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Assigned Route</p>
                      <h3 className="mt-1 text-2xl font-bold text-slate-900">
                        Route {selectedTrip.routeNo}
                      </h3>
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${getStatusClass(
                        selectedTrip.status
                      )}`}
                    >
                      {selectedTrip.status}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-white p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <BusFront size={18} />
                        <p className="text-sm">Bus Number</p>
                      </div>
                      <p className="mt-2 font-bold text-slate-900">
                        {selectedTrip.busNo}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Clock size={18} />
                        <p className="text-sm">Departure</p>
                      </div>
                      <p className="mt-2 font-bold text-slate-900">
                        {selectedTrip.departureTime}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white p-4">
                      <div className="flex items-center gap-2 text-slate-400">
                        <CalendarClock size={18} />
                        <p className="text-sm">Arrival</p>
                      </div>
                      <p className="mt-2 font-bold text-slate-900">
                        {selectedTrip.arrivalTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Trip Status
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Started">Started</option>
                        <option value="Completed">Completed</option>
                        <option value="Delayed">Delayed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-slate-700">
                        Remarks
                      </label>
                      <textarea
                        rows="3"
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Example: Traffic delay, bus issue, completed trip"
                        className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                      ></textarea>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => updateTripStatus("Started")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-3 text-sm font-semibold text-white hover:bg-green-700 transition"
                    >
                      <PlayCircle size={18} />
                      Mark as Started
                    </button>

                    <button
                      onClick={() => updateTripStatus("Completed")}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
                    >
                      <CheckCircle2 size={18} />
                      Mark as Completed
                    </button>

                    <button
                      onClick={() => updateTripStatus(status)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
                    >
                      <Save size={18} />
                      Update Status
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-slate-500">
                  No assigned trips found.
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <h2 className="font-bold text-slate-900">Route Stops</h2>
              <p className="mt-1 text-sm text-slate-500">
                Main stops for assigned route
              </p>

              <div className="mt-6 space-y-4">
                {["Start Depot", "Main Stop 1", "Main Stop 2", "Destination"].map(
                  (stop, index) => (
                    <div key={stop} className="flex items-center gap-3">
                      <div
                        className={`h-9 w-9 rounded-2xl flex items-center justify-center ${
                          index === 0 || index === 3
                            ? "bg-blue-600 text-white"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <MapPin size={17} />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{stop}</p>
                        <p className="text-xs text-slate-400">
                          {index === 0
                            ? "Starting point"
                            : index === 3
                            ? "Destination"
                            : "Intermediate stop"}
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="font-bold text-slate-900">Assigned Schedule</h2>
              <p className="text-sm text-slate-500">
                Trips assigned to the driver. Click a row to update status.
              </p>
            </div>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500">
                  <tr>
                    <th className="text-left px-6 py-4 font-semibold">
                      Trip ID
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Route
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">Bus</th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Departure
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Arrival
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Remarks
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {trips.map((trip) => (
                    <tr
                      key={trip.id}
                      onClick={() => handleSelectTrip(trip)}
                      className={`border-t border-slate-100 hover:bg-slate-50 cursor-pointer ${
                        selectedTrip?.id === trip.id ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {trip.id}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        Route {trip.routeNo}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {trip.busNo}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {trip.departureTime}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {trip.arrivalTime}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                            trip.status
                          )}`}
                        >
                          {trip.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {trip.remarks || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden p-4 space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => handleSelectTrip(trip)}
                  className={`rounded-2xl border border-slate-200 bg-slate-50 p-4 ${
                    selectedTrip?.id === trip.id ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-blue-600">
                        {trip.id}
                      </p>
                      <h3 className="mt-1 font-bold text-slate-900">
                        Route {trip.routeNo}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {trip.busNo}
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        trip.status
                      )}`}
                    >
                      {trip.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Departure</p>
                      <p className="font-semibold text-slate-800">
                        {trip.departureTime}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Arrival</p>
                      <p className="font-semibold text-slate-800">
                        {trip.arrivalTime}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-white p-3">
                    <p className="text-slate-400 text-sm">Remarks</p>
                    <p className="font-semibold text-slate-800">
                      {trip.remarks || "-"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default DriverDashboard;