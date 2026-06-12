import { motion } from "framer-motion";

function StatCard({ title, value, subtitle, icon: Icon, color = "blue" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
    red: "bg-red-50 text-red-600",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div
          className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
            colors[color] || colors.blue
          }`}
        >
          <Icon size={24} />
        </div>
      </div>
    </motion.div>
  );
}

export default StatCard;