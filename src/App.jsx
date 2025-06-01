// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import { Toaster } from "react-hot-toast";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white shadow px-4 py-3 flex space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/patients" className="text-blue-600 hover:underline">
          Patients
        </Link>
        <Link to="/doctors" className="text-blue-600 hover:underline">
          Doctors
        </Link>
        <Link to="/appointments" className="text-blue-600 hover:underline">
          Appointments
        </Link>
        <Link to="/prescriptions" className="text-blue-600 hover:underline">
          Prescriptions
        </Link>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded shadow">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
