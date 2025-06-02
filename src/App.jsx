import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import { Toaster } from "react-hot-toast";
import BookAppointment from "./pages/BookAppointment";
import { AddPrescription } from "./pages/AddPrescription";
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
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/prescriptions" element={<Prescriptions />} />
            <Route path="/add-patient" element={<AddPatient />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/add-prescription" element={<AddPrescription />} />
          </Routes>
        </div>
      </main>

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#0d9488",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
