import {
  BarChart3,
  CalendarDays,
  Download,
  FileText,
  Fuel,
  Route,
  Search,
  TrendingUp,
  Wrench,
} from "lucide-react";

const reportRows = [
  {
    id: "RP001",
    title: "Jaffna - Colombo",
    trips: 42,
    completed: 39,
    delayed: 3,
    fuel: "LKR 185,000",
    utilization: "92%",
  },
  {
    id: "RP002",
    title: "Kandy - Colombo",
    trips: 35,
    completed: 32,
    delayed: 3,
    fuel: "LKR 124,000",
    utilization: "88%",
  },
  {
    id: "RP003",
    title: "Galle - Matara",
    trips: 28,
    completed: 27,
    delayed: 1,
    fuel: "LKR 68,000",
    utilization: "81%",
  },
];

function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Reports and Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Generate route performance, trip completion, fuel, maintenance, and utilization reports.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Download size={18} />
          Export PDF
        </button>
      </div>

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
            <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
              <option>Route Performance Report</option>
              <option>Trip Completion Report</option>
              <option>Fuel Consumption Report</option>
              <option>Maintenance Report</option>
              <option>Vehicle Utilization Report</option>
              <option>Driver Working Hours Report</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              From Date
            </label>
            <input
              type="date"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              To Date
            </label>
            <input
              type="date"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-end">
            <button
              type="button"
              className="w-full rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition"
            >
              Generate Report
            </button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Route className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">105</p>
              <p className="text-sm text-slate-500">Total Trips</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">98</p>
              <p className="text-sm text-slate-500">Completed Trips</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Fuel className="text-amber-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">LKR 377K</p>
              <p className="text-sm text-slate-500">Fuel Cost</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <Wrench className="text-red-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">05</p>
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
            {reportRows.map((row) => (
              <div key={row.id}>
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-slate-700">{row.title}</p>
                  <p className="font-bold text-slate-900">{row.utilization}</p>
                </div>
                <div className="mt-2 h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: row.utilization }}
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
                Completion rate improved
              </p>
              <p className="mt-1 text-sm text-slate-300">
                98 out of 105 trips were completed successfully.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-amber-300">
                Delays need attention
              </p>
              <p className="mt-1 text-sm text-slate-300">
                7 delayed trips should be reviewed by depot staff.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="font-semibold text-blue-300">
                Fuel usage tracked
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Monthly fuel cost is available for management review.
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
                Generated report data preview
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
              <Search size={18} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search report..."
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
                <th className="text-left px-6 py-4 font-semibold">Trips</th>
                <th className="text-left px-6 py-4 font-semibold">Completed</th>
                <th className="text-left px-6 py-4 font-semibold">Delayed</th>
                <th className="text-left px-6 py-4 font-semibold">Fuel Cost</th>
                <th className="text-left px-6 py-4 font-semibold">
                  Utilization
                </th>
              </tr>
            </thead>

            <tbody>
              {reportRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-6 py-4 font-semibold text-slate-700">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {row.title}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.trips}</td>
                  <td className="px-6 py-4 text-green-700 font-semibold">
                    {row.completed}
                  </td>
                  <td className="px-6 py-4 text-amber-700 font-semibold">
                    {row.delayed}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{row.fuel}</td>
                  <td className="px-6 py-4 font-semibold text-blue-700">
                    {row.utilization}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden p-4 space-y-4">
          {reportRows.map((row) => (
            <div
              key={row.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-xs font-semibold text-blue-600">{row.id}</p>
              <h3 className="mt-1 font-bold text-slate-900">{row.title}</h3>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Trips</p>
                  <p className="font-semibold text-slate-800">{row.trips}</p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-slate-400">Utilization</p>
                  <p className="font-semibold text-slate-800">
                    {row.utilization}
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
                  <p className="font-semibold text-amber-700">{row.delayed}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-xl bg-white p-3">
                <p className="text-sm text-slate-500">Fuel Cost</p>
                <p className="text-sm font-semibold text-slate-800">
                  {row.fuel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Reports;