import { User, BookOpen, Mail, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentForm({
  name,
  setName,
  course,
  setCourse,
  email,
  setEmail,
  addStudent,
}) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>👨‍🎓 Add Student</h2>

      <div className="input-box">
        <User size={18} />
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="input-box">
        <BookOpen size={18} />
        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>

      <div className="input-box">
        <Mail size={18} />
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button className="primary-btn" onClick={addStudent}>
        <PlusCircle size={18} />
        <span>Add Student</span>
      </button>
    </motion.div>
  );
}