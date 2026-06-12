import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Download,
  FileText,
  Fuel,
  Route,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

const initialReportForm = {
  reportType: "Route Performance Report",
  fromDate: "",
  toDate: "",
};

function Reports() {
  const [summary, setSummary] = useState(null);
  const [monthlyReports, setMonthlyReports] = useState([]);
  const [reportForm, setReportForm] = useState(initialReportForm);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchReportData = async () => {
    try {
      setLoading(true);
      setError("");

      const [summaryResponse, monthlyResponse] = await Promise.all([
        fetch(`${API_URL}/reports/summary`),
        fetch(`${API_URL}/reports/monthly`),
      ]);

      const summaryData = await summaryResponse.json();
      const monthlyData = await monthlyResponse.json();

      if (!summaryData.success) {
        setError(summaryData.message || "Failed to load report summary");
        return;
      }

      if (!monthlyData.success) {
        setError(monthlyData.message || "Failed to load monthly reports");
        return;
      }

      setSummary(summaryData.data || {});
      setMonthlyReports(monthlyData.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, []);

  const filteredReports = useMemo(() => {
    return monthlyReports.filter((row) => {
      const text = `${row.id} ${row.route} ${row.month}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [monthlyReports, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setReportForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateReport = async () => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/reports/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportForm),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Report generation failed");
        return;
      }

      setGeneratedReport(data.data);
      setMessage("Report generated successfully");
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  const totalTrips = summary?.totalTrips || 0;
  const completedTrips = summary?.completedTrips || 0;
  const delayedTrips = summary?.delayedTrips || 0;
  const fuelCost = summary?.fuelCost || 0;
  const maintenanceCases = summary?.maintenanceCases || 0;

  const completionRate =
    totalTrips > 0 ? Math.round((completedTrips / totalTrips) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reports and Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate route performance, trip completion, fuel, maintenance, and
            utilization reports.
          </p>
        </div>

        <button
          onClick={handleExportPDF}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Download size={18} />
          Export PDF
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

      <section className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <FileText size={22} />
          </div>
          <div>
            <h2 className="font-bold text-slate-900">Generate Report</h2>
            <p className="text-sm text-slate-500">
              Select report type and date range
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Report Type
            </label>
            <select
              name="reportType"
              value={reportForm.reportType}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
            >
              <option value="Route Performance Report">
                Route Performance Report
              </option>
              <option value="Trip Completion Report">
                Trip Completion Report
              </option>
              <option value="Fuel Consumption Report">
                Fuel Consumption Report
              </option>
              <option value="Maintenance Report">Maintenance Report</option>
              <option value="Vehicle Utilization Report">
                Vehicle Utilization Report
              </option>
              <option value="Driver Working Hours Report">
                Driver Working Hours Report
              </option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              From Date
            </label>
            <input
              type="date"
              name="fromDate"
              value={reportForm.fromDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              To Date
            </label>
            <input
              type="date"
              name="toDate"
              value={reportForm.toDate}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              onClick={handleGenerateReport}
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Generate Report
            </button>
          </div>
        </div>

        {generatedReport && (
          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
            <h3 className="font-bold text-blue-900">
              {generatedReport.reportType}
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Date Range: {generatedReport.fromDate || "Not selected"} to{" "}
              {generatedReport.toDate || "Not selected"}
            </p>
            <p className="mt-2 text-sm text-blue-800">
              {generatedReport.message || "Report generated successfully."}
            </p>
          </div>
        )}
      </section>

      {loading ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center text-slate-500">
          Loading reports...
        </div>
      ) : (
        <>
          <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Route className="text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {totalTrips}
                  </p>
                  <p className="text-sm text-slate-500">Total Trips</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {completedTrips}
                  </p>
                  <p className="text-sm text-slate-500">Completed Trips</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Fuel className="text-amber-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    LKR {Number(fuelCost).toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">Fuel Cost</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <Wrench className="text-red-600" />
                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {maintenanceCases}
                  </p>
                  <p className="text-sm text-slate-500">Maintenance Cases</p>
                </div>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="font-bold text-slate-900">
                    Vehicle Utilization Overview
                  </h2>
                  <p className="text-sm text-slate-500">
                    Monthly route and vehicle efficiency summary
                  </p>
                </div>
                <BarChart3 className="text-blue-600" />
              </div>

              <div className="mt-8 space-y-5">
                {monthlyReports.map((row) => (
                  <div key={row.id}>
                    <div className="flex items-center justify-between text-sm">
                      <p className="font-semibold text-slate-700">
                        {row.route}
                      </p>
                      <p className="font-bold text-slate-900">
                        {row.utilization}%
                      </p>
                    </div>

                    <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600"
                        style={{ width: `${row.utilization}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-slate-950 text-white p-6 shadow-sm">
              <h2 className="font-bold">Report Insights</h2>
              <p className="mt-1 text-sm text-slate-400">
                Automated decision-support summary
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-green-300">
                    Completion rate
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {completedTrips} out of {totalTrips} trips were completed.
                    Completion rate is {completionRate}%.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-amber-300">
                    Delays need attention
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {delayedTrips} delayed trips should be reviewed by depot
                    staff.
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="font-semibold text-blue-300">
                    Fuel usage tracked
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Fuel cost is LKR {Number(fuelCost).toLocaleString()} for
                    management review.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="font-bold text-slate-900">Report Preview</h2>
                  <p className="text-sm text-slate-500">
                    Generated report data preview from backend API
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search report..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                    <th className="text-left px-6 py-4 font-semibold">Route</th>
                    <th className="text-left px-6 py-4 font-semibold">Month</th>
                    <th className="text-left px-6 py-4 font-semibold">Trips</th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Completed
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Delayed
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Fuel Cost
                    </th>
                    <th className="text-left px-6 py-4 font-semibold">
                      Utilization
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredReports.map((row) => (
                    <tr
                      key={row.id}
                      className="border-t border-slate-100 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {row.id}
                      </td>

                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {row.route}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {row.month}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        {row.trips}
                      </td>

                      <td className="px-6 py-4 text-green-700 font-semibold">
                        {row.completed}
                      </td>

                      <td className="px-6 py-4 text-amber-700 font-semibold">
                        {row.delayed}
                      </td>

                      <td className="px-6 py-4 text-slate-600">
                        LKR {Number(row.fuelCost || 0).toLocaleString()}
                      </td>

                      <td className="px-6 py-4 font-semibold text-blue-700">
                        {row.utilization}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden p-4 space-y-4">
              {filteredReports.map((row) => (
                <div
                  key={row.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-xs font-semibold text-blue-600">
                    {row.id}
                  </p>

                  <h3 className="mt-1 font-bold text-slate-900">
                    {row.route}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">{row.month}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Trips</p>
                      <p className="font-semibold text-slate-800">
                        {row.trips}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Utilization</p>
                      <p className="font-semibold text-slate-800">
                        {row.utilization}%
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Completed</p>
                      <p className="font-semibold text-green-700">
                        {row.completed}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <p className="text-slate-400">Delayed</p>
                      <p className="font-semibold text-amber-700">
                        {row.delayed}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3">
                    <p className="text-sm text-slate-500">Fuel Cost</p>
                    <p className="text-sm font-semibold text-slate-800">
                      LKR {Number(row.fuelCost || 0).toLocaleString()}
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

export default Reports;