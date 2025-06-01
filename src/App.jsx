import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";

// Layout Component
const Layout = ({ children }) => {
  const navigate = useNavigate();
  
  return (
    <div className="app">
      <nav className="sidebar">
        <div className="logo-container">
          <img 
            src="/vite.svg" 
            className="logo" 
            alt="Vite logo" 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/patients">Patients</Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Client-side data fetching
    const fetchData = async () => {
      try {
        // In a real app: fetch('/api/patients')
        const mockPatients = [
          { id: 1, name: "John Doe", age: 35, gender: "Male" },
          { id: 2, name: "Jane Smith", age: 28, gender: "Female" },
        ];
        setPatients(mockPatients);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route
          path="patients"
          element={
            loading ? <p>Loading...</p> : <PatientList patients={patients} />
          }
        />
      </Route>
    </Routes>
  );
}

// Dashboard Component (in same file or separate)
const Dashboard = () => (
  <div>
    <h1>Hospital Dashboard</h1>
    <p>Welcome to the management system</p>
  </div>
);

// PatientList Component
const PatientList = ({ patients }) => (
  <div>
    <h2>Patients</h2>
    <div className="patient-grid">
      {patients.map((patient) => (
        <div key={patient.id} className="patient-card">
          <h3>{patient.name}</h3>
          <p>Age: {patient.age}</p>
        </div>
      ))}
    </div>
  </div>
);

export default App;