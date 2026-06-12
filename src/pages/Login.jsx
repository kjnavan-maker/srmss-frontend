import { BusFront, Lock, User, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 p-12 text-white">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
                <BusFront size={28} />
              </div>

              <div>
                <h1 className="text-2xl font-bold">SRMSS</h1>
                <p className="text-sm text-blue-100">
                  Smart Route Management
                </p>
              </div>
            </div>

            <div className="mt-24">
              <h2 className="text-5xl font-bold leading-tight">
                Modern depot operations dashboard
              </h2>

              <p className="mt-6 text-blue-100 text-lg leading-8">
                Manage routes, buses, drivers, schedules, maintenance and
                reports through one centralized transport system.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">24</p>
              <p className="text-xs text-blue-100">Routes</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">48</p>
              <p className="text-xs text-blue-100">Buses</p>
            </div>

            <div className="rounded-2xl bg-white/10 p-4">
              <p className="text-2xl font-bold">96%</p>
              <p className="text-xs text-blue-100">Efficiency</p>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-12 lg:p-16">
          <div className="lg:hidden mb-8 flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center">
              <BusFront size={28} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">SRMSS</h1>
              <p className="text-sm text-slate-500">
                Smart Route Management
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>

          <p className="mt-2 text-slate-500">
            Login to manage depot operations.
          </p>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700">
                Username
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <User size={20} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Enter username"
                  className="w-full outline-none text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3 focus-within:border-blue-500">
                <Lock size={20} className="text-slate-400" />

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

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <Users size={20} className="text-slate-400" />

                <select className="w-full outline-none text-slate-700 bg-transparent">
                  <option>Administrator</option>
                  <option>Depot Manager</option>
                  <option>Depot Staff</option>
                  <option>Driver</option>
                  <option>Maintenance Staff</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-full rounded-2xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
            >
              Login
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            SRMSS © 2026 Public Transport Depot Management
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;