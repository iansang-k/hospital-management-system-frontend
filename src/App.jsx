import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-teal-50 scroll-smooth">
      <nav className="bg-teal-700 shadow-lg px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-semibold text-white hover:scale-105 transition-transform duration-200">
            MediCare
          </span>
        </div>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-teal-100 hover:text-white transition-all duration-300 font-medium px-3 py-1 rounded hover:bg-teal-600 hover:scale-105"
          >
            Dashboard
          </Link>

          <Link
            to="/add-patient"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 font-medium shadow-md hover:scale-105 hover:shadow-lg"
          >
            Add Patient
          </Link>
          <Link
            to="/book-appointment"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 font-medium shadow-md hover:scale-105 hover:shadow-lg"
          >
            Book Appointment
          </Link>
          <Link
            to="/add-prescription"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-all duration-300 font-medium shadow-md hover:scale-105 hover:shadow-lg"
          >
            Add Prescription
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 border border-teal-100 transition-all duration-300 hover:shadow-lg">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
