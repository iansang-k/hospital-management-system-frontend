import { useEffect, useState } from "react";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/patients")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then((data) => {
        setPatients(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return Math.floor(ageDiff / (1000 * 60 * 60 * 24 * 365.25));
  };

  if (loading) return <div className="p-4">Loading patients...</div>;
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Patients List</h2>
      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="grid gap-4">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white shadow-md p-4 rounded-xl">
              <h3 className="text-xl font-bold">{patient.name}</h3>
              <p>Gender: {patient.gender || "N/A"}</p>
              <p>Date of Birth: {patient.date_of_birth || "N/A"}</p>
              <p>Age: {calculateAge(patient.date_of_birth)}</p>
              <p>Phone: {patient.phone_number || "N/A"}</p>
              <p>Emergency Contact: {patient.emergency_contact || "N/A"}</p>
              <p>Emergency Phone: {patient.emergency_phone_number || "N/A"}</p>
              <p>Blood Type: {patient.bloodtype || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
