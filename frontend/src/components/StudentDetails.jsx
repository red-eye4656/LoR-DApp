import { Search, User, BookOpen, Mail, CheckCircle, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentDetails({
  viewId,
  setViewId,
  viewStudent,
  student,
}) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2>🔍 View Student</h2>

      <div className="input-box">
        <Search size={18} />

        <input
          type="number"
          placeholder="Student ID"
          value={viewId}
          onChange={(e) => setViewId(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={viewStudent}>
        View Student
      </button>

      {student && (
        <div className="student-card">

          <p><User size={16}/> <strong>Name:</strong> {student.name}</p>

          <p><BookOpen size={16}/> <strong>Course:</strong> {student.course}</p>

          <p><Mail size={16}/> <strong>Email:</strong> {student.email}</p>

          <p>
            <strong>Requested:</strong>{" "}
            {student.requested ? (
              <span className="badge pending">
                <Clock size={14}/> Yes
              </span>
            ) : (
              <span className="badge">No</span>
            )}
          </p>

          <p>
            <strong>Approved:</strong>{" "}
            {student.approved ? (
              <span className="badge approved">
                <CheckCircle size={14}/> Yes
              </span>
            ) : (
              <span className="badge">No</span>
            )}
          </p>

        </div>
      )}
    </motion.div>
  );
}