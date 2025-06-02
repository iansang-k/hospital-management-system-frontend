import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen bg-teal-50 flex flex-col">
      <header className="py-6 text-center bg-teal-50 ">
        <h1 className="text-2xl font-bold text-teal-800">Hospital Dashboard</h1>
      </header>

      <main className="flex-grow p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <Link
            to="/patients"
            className="bg-teal-500 text-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all hover:bg-teal-600"
          >
            <h2 className="font-semibold text-lg">Patients</h2>
            <p className="text-teal-100 text-sm mt-1">Manage records</p>
          </Link>

          <Link
            to="/doctors"
            className="bg-teal-500 text-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all hover:bg-teal-600"
          >
            <h2 className="font-semibold text-lg">Doctors</h2>
            <p className="text-teal-100 text-sm mt-1">Manage profiles</p>
          </Link>

          <Link
            to="/appointments"
            className="bg-teal-500 text-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all hover:bg-teal-600"
          >
            <h2 className="font-semibold text-lg">Appointments</h2>
            <p className="text-teal-100 text-sm mt-1">View schedule</p>
          </Link>

          <Link
            to="/prescriptions"
            className="bg-teal-500 text-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all hover:bg-teal-600"
          >
            <h2 className="font-semibold text-lg">Prescriptions</h2>
            <p className="text-teal-100 text-sm mt-1">Manage medications</p>
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
