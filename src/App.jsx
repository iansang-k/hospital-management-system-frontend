// App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="font-bold text-xl">Hospital Management</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Patients
          </Link>
          <Link to="/doctors" className="hover:underline">
            Doctors
          </Link>
          <Link to="/appointments" className="hover:underline">
            Appointments
          </Link>
          <Link to="/prescriptions" className="hover:underline">
            Prescriptions
          </Link>
        </div>
      </nav>

      <main className="p-6">
        <Routes>
          <Route path="/" element={<Patients />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
