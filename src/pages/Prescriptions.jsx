import { useEffect, useState } from "react";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/prescriptions")
      .then((res) => res.json())
      .then((data) => setPrescriptions(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Prescriptions</h2>
      {prescriptions.length === 0 ? (
        <p>No prescriptions found.</p>
      ) : (
        <ul className="space-y-2">
          {prescriptions.map((rx) => (
            <li key={rx.id} className="p-4 border rounded shadow-sm">
              <p>
                <strong>Medication:</strong> {rx.medication}
              </p>
              <p>
                <strong>Dosage:</strong> {rx.dosage}
              </p>
              <p>
                <strong>Date Prescribed:</strong> {rx.date_prescribed}
              </p>
              <p>
                <strong>Doctor ID:</strong> {rx.doctor_id}
              </p>
              <p>
                <strong>Patient ID:</strong> {rx.patient_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Prescriptions;
