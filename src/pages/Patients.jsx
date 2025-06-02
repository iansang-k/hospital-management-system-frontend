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

  if (loading)
    return <div className="p-6 text-teal-800">Loading patients...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-6">
      <h2 className="text-3xl font-semibold text-teal-900 mb-8 text-center">
        Patients List
      </h2>
      {patients.length === 0 ? (
        <p className="text-center text-gray-600">No patients found.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold text-teal-800 mb-2">
                {patient.name}
              </h3>
              <div className="text-gray-700 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Gender:</span>{" "}
                  {patient.gender || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Date of Birth:</span>{" "}
                  {patient.date_of_birth || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Age:</span>{" "}
                  {calculateAge(patient.date_of_birth)}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {patient.phone_number || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Emergency Contact:</span>{" "}
                  {patient.emergency_contact || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Emergency Phone:</span>{" "}
                  {patient.emergency_phone_number || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Blood Type:</span>{" "}
                  {patient.bloodtype || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
