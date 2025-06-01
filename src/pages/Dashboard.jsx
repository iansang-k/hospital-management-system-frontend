import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Hospital Management Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/add-patient"
          className="bg-indigo-500 text-white rounded-xl p-6 shadow hover:bg-indigo-600"
        >
          <h2 className="text-xl font-semibold">Add Patient</h2>
          <p>Register a new patient</p>
        </Link>

        <Link
          to="/patients"
          className="bg-blue-500 text-white rounded-xl p-6 shadow hover:bg-blue-600"
        >
          <h2 className="text-xl font-semibold">Patients</h2>
          <p>Manage patient records</p>
        </Link>
        <Link
          to="/doctors"
          className="bg-green-500 text-white rounded-xl p-6 shadow hover:bg-green-600"
        >
          <h2 className="text-xl font-semibold">Doctors</h2>
          <p>Manage doctor profiles</p>
        </Link>
        <Link
          to="/appointments"
          className="bg-yellow-500 text-white rounded-xl p-6 shadow hover:bg-yellow-600"
        >
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p>View and schedule appointments</p>
        </Link>
        <Link
          to="/prescriptions"
          className="bg-purple-500 text-white rounded-xl p-6 shadow hover:bg-purple-600"
        >
          <h2 className="text-xl font-semibold">Prescriptions</h2>
          <p>View and manage prescriptions</p>
        </Link>
      </div>
    </div>
  );
}
export default Dashboard;
