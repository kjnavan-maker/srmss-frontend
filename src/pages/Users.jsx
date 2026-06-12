import {
  Edit,
  Lock,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCog,
  Users as UsersIcon,
} from "lucide-react";

const users = [
  {
    id: "U001",
    name: "Admin User",
    username: "admin",
    email: "admin@srmss.lk",
    role: "Administrator",
    contact: "+94 77 111 2233",
    status: "Active",
  },
  {
    id: "U002",
    name: "Depot Manager",
    username: "manager01",
    email: "manager@srmss.lk",
    role: "Depot Manager",
    contact: "+94 76 222 3344",
    status: "Active",
  },
  {
    id: "U003",
    name: "Depot Staff",
    username: "staff01",
    email: "staff@srmss.lk",
    role: "Depot Staff",
    contact: "+94 71 333 4455",
    status: "Active",
  },
  {
    id: "U004",
    name: "Maintenance Officer",
    username: "maintenance01",
    email: "maintenance@srmss.lk",
    role: "Maintenance Staff",
    contact: "+94 75 444 5566",
    status: "Inactive",
  },
];

function getRoleClass(role) {
  switch (role) {
    case "Administrator":
      return "bg-purple-50 text-purple-700";
    case "Depot Manager":
      return "bg-blue-50 text-blue-700";
    case "Depot Staff":
      return "bg-green-50 text-green-700";
    case "Driver":
      return "bg-amber-50 text-amber-700";
    case "Maintenance Staff":
      return "bg-red-50 text-red-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
}

function getStatusClass(status) {
  return status === "Active"
    ? "bg-green-50 text-green-700"
    : "bg-slate-100 text-slate-600";
}

function Users() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            User Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage system users with role-based access control.
          </p>
        </div>

        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition">
          <Plus size={18} />
          Add New User
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <UsersIcon className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">24</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">21</p>
              <p className="text-sm text-slate-500">Active Accounts</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <UserCog className="text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">05</p>
              <p className="text-sm text-slate-500">User Roles</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <UserCog size={22} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">User Details</h2>
              <p className="text-sm text-slate-500">Add or update user account</p>
            </div>
          </div>

          <form className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  placeholder="user@srmss.lk"
                  className="w-full outline-none text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter password"
                  className="w-full outline-none text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                User Role
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Administrator</option>
                <option>Depot Manager</option>
                <option>Depot Staff</option>
                <option>Driver</option>
                <option>Maintenance Staff</option>
              </select>
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
                Account Status
              </label>
              <select className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                Save User
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
                <h2 className="font-bold text-slate-900">User List</h2>
                <p className="text-sm text-slate-500">
                  View and manage registered user accounts
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user..."
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
                  <th className="text-left px-6 py-4 font-semibold">User</th>
                  <th className="text-left px-6 py-4 font-semibold">Username</th>
                  <th className="text-left px-6 py-4 font-semibold">Role</th>
                  <th className="text-left px-6 py-4 font-semibold">Contact</th>
                  <th className="text-left px-6 py-4 font-semibold">Status</th>
                  <th className="text-right px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4 font-semibold text-slate-700">
                      {user.id}
                    </td>

                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-slate-400">{user.email}</p>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {user.username}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleClass(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {user.contact}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                          user.status
                        )}`}
                      >
                        {user.status}
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
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-blue-600">
                      {user.id}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {user.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {user.username}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getRoleClass(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Email</p>
                    <p className="font-semibold text-slate-800">
                      {user.email}
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-3">
                    <p className="text-slate-400">Contact</p>
                    <p className="font-semibold text-slate-800">
                      {user.contact}
                    </p>
                  </div>
                </div>

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
    </div>
  );
}

export default Users;