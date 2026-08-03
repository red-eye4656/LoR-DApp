import { GraduationCap, UserCog } from "lucide-react";

export default function RoleSelector({ setRole }) {
  return (
    <div className="role-container">
      <h1>Select Your Role</h1>

      <div className="role-grid">

        <div
          className="role-card"
          onClick={() => setRole("student")}
        >
          <GraduationCap size={60} />
          <h2>Student</h2>
          <p>Add Student & Request Recommendation</p>
        </div>

        <div
          className="role-card"
          onClick={() => setRole("faculty")}
        >
          <UserCog size={60} />
          <h2>Faculty</h2>
          <p>Approve Recommendations</p>
        </div>

      </div>
    </div>
  );
}