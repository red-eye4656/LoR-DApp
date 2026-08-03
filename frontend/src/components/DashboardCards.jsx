import { Users, FileText, BadgeCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardCards({
  totalStudents,
  pendingCount,
  approvedCount,
}) {
  return (
    <motion.div
      className="dashboard-grid"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="dash-card">
        <Users size={40} />
        <h3>Total Students</h3>
        <h1>{totalStudents}</h1>
      </div>

      <div className="dash-card">
        <FileText size={40} />
        <h3>Pending Requests</h3>
        <h1>{pendingCount}</h1>
      </div>

      <div className="dash-card">
        <BadgeCheck size={40} />
        <h3>Approved</h3>
        <h1>{approvedCount}</h1>
      </div>
    </motion.div>
  );
}