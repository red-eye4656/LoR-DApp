import { useState, useEffect } from "react";
import RoleSelector from "./components/RoleSelector";
import { getContract } from "./contract";
import "./App.css";
import Navbar from "./components/Navbar";
import DashboardCards from "./components/DashboardCards";
import StudentForm from "./components/StudentForm";
import RequestCard from "./components/RequestCard";
import ApproveCard from "./components/ApproveCard";
import StudentDetails from "./components/StudentDetails";
import Footer from "./components/Footer";
export default function App() {
  const [account, setAccount] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [requestId, setRequestId] = useState("");
  const [approveId, setApproveId] = useState("");
  const [viewId, setViewId] = useState("");
  const [student, setStudent] = useState(null);
  const [role, setRole] = useState("");
  const [totalStudents, setTotalStudents] = useState(0);
const [pendingCount, setPendingCount] = useState(0);
const [approvedCount, setApprovedCount] = useState(0);

  async function connectWallet() {
    const c = await getContract();
    if (!c) return;
    setAccount(await c.runner.getAddress());
  }

  async function addStudent() {
    const c = await getContract();
    const tx = await c.addStudent(name, course, email);
    await tx.wait();
await loadDashboard();
alert("Student added");
    setName(""); setCourse(""); setEmail("");
  }

  async function requestRecommendation() {
    const c = await getContract();
    const tx = await c.requestRecommendation(requestId);
await tx.wait();
await loadDashboard();
alert("Requested");
    setRequestId("");
  }

  async function approveRecommendation() {
    const c = await getContract();
    const tx = await c.approveRecommendation(approveId);
    await tx.wait();
await loadDashboard();
alert("Approved");
    setApproveId("");
  }

  async function viewStudent() {
    const c = await getContract();
    const s = await c.getStudent(viewId);
    setStudent({
      name: s[0],
      course: s[1],
      email: s[2],
      requested: s[3],
      approved: s[4],
    });
  }

  async function loadDashboard() {
  try {
    const c = await getContract();

    const total = Number(await c.studentCount());

    setTotalStudents(total);

    let pending = 0;
    let approved = 0;

    for (let i = 1; i <= total; i++) {
      const s = await c.getStudent(i);

      if (s[3] && !s[4]) pending++;

      if (s[4]) approved++;
    }

    setPendingCount(pending);
    setApprovedCount(approved);

  } catch (err) {
    console.error(err);
  }
}

useEffect(() => {
  loadDashboard();
}, []);
if (!role) {
  return <RoleSelector setRole={setRole} />;
}
return (
  <>
    <Navbar
  account={account}
  connectWallet={connectWallet}
/>

<div className="main-container">

  {role === "student" && (
    <>
      <DashboardCards
        totalStudents={totalStudents}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
      />

      <StudentForm
        name={name}
        setName={setName}
        course={course}
        setCourse={setCourse}
        email={email}
        setEmail={setEmail}
        addStudent={addStudent}
      />

      <RequestCard
        requestId={requestId}
        setRequestId={setRequestId}
        requestRecommendation={requestRecommendation}
      />

      <StudentDetails
        viewId={viewId}
        setViewId={setViewId}
        viewStudent={viewStudent}
        student={student}
      />
    </>
  )}

  {role === "faculty" && (
    <>
      <DashboardCards
        totalStudents={totalStudents}
        pendingCount={pendingCount}
        approvedCount={approvedCount}
      />

      <ApproveCard
        approveId={approveId}
        setApproveId={setApproveId}
        approveRecommendation={approveRecommendation}
      />

      <StudentDetails
        viewId={viewId}
        setViewId={setViewId}
        viewStudent={viewStudent}
        student={student}
      />
    </>
  )}

  <Footer />

</div>
</>
);
}