import { useEffect, useMemo, useState } from "react";
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

const API_URL = import.meta.env.VITE_API_URL;

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  role: "Depot Staff",
  contact: "",
  status: "Active",
};

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
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/users`);
      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Failed to load users");
        return;
      }

      setUsers(data.data || []);
    } catch (err) {
      setError("Backend server not connected");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const text = `${user.name} ${user.username} ${user.email} ${user.role} ${user.contact} ${user.status}`.toLowerCase();
      return text.includes(searchTerm.toLowerCase());
    });
  }, [users, searchTerm]);

  const activeCount = users.filter((user) => user.status === "Active").length;
  const roleCount = new Set(users.map((user) => user.role)).size;

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
      const url = editingId ? `${API_URL}/users/${editingId}` : `${API_URL}/users`;
      const method = editingId ? "PUT" : "POST";

      const payload = { ...formData };

      if (editingId && !payload.password) {
        delete payload.password;
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Action failed");
        return;
      }

      setMessage(editingId ? "User updated successfully" : "User added successfully");

      clearForm();
      fetchUsers();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);

    setFormData({
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      password: "",
      role: user.role || "Depot Staff",
      contact: user.contact || "",
      status: user.status || "Active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {
      setMessage("");
      setError("");

      const response = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message || "Delete failed");
        return;
      }

      setMessage("User deleted successfully");
      fetchUsers();
    } catch (err) {
      setError("Backend server not connected");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create and manage system users with role-based access control.
          </p>
        </div>

        <button
          onClick={clearForm}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Add New User
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
            <UsersIcon className="text-blue-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{users.length}</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-green-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              <p className="text-sm text-slate-500">Active Accounts</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <UserCog className="text-purple-600" />
            <div>
              <p className="text-2xl font-bold text-slate-900">{roleCount}</p>
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
              <h2 className="font-bold text-slate-900">
                {editingId ? "Update User" : "User Details"}
              </h2>
              <p className="text-sm text-slate-500">
                {editingId ? "Edit selected user account" : "Add new user account"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
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
                name="username"
                value={formData.username}
                onChange={handleChange}
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
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={editingId ? "Leave blank to keep same" : "Enter password"}
                  className="w-full outline-none text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                User Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
              >
                <option value="Administrator">Administrator</option>
                <option value="Depot Manager">Depot Manager</option>
                <option value="Depot Staff">Depot Staff</option>
                <option value="Driver">Driver</option>
                <option value="Maintenance Staff">Maintenance Staff</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Contact Number
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+94 77 123 4567"
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Account Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500 bg-white"
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
                {editingId ? "Update User" : "Save User"}
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
                <h2 className="font-bold text-slate-900">User List</h2>
                <p className="text-sm text-slate-500">
                  View and manage registered user accounts from backend API
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 lg:w-80">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-slate-500">Loading users...</div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>
                      <th className="text-left px-6 py-4 font-semibold">ID</th>
                      <th className="text-left px-6 py-4 font-semibold">User</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Username
                      </th>
                      <th className="text-left px-6 py-4 font-semibold">Role</th>
                      <th className="text-left px-6 py-4 font-semibold">
                        Contact
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
                    {filteredUsers.map((user) => (
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
                            <button
                              onClick={() => handleEdit(user)}
                              className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100"
                            >
                              <Edit size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(user.id)}
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
                {filteredUsers.map((user) => (
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
                      <button
                        onClick={() => handleEdit(user)}
                        className="flex-1 rounded-xl bg-blue-50 py-2 text-sm font-semibold text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
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

export default Users;