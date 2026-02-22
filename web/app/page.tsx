"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">Sata Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        {["Moderation","Welcome","Vouchers","Reaction Roles","Leveling"].map((item,i)=>(
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={i}
            className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-xl border border-white/20"
          >
            <h2 className="text-xl font-semibold">{item}</h2>
            <p className="text-sm opacity-70 mt-2">
              Manage {item} configuration.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}