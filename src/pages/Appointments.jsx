import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <ul className="space-y-2">
          {appointments.map((app) => (
            <li key={app.id} className="p-4 border rounded shadow-sm">
              <p>
                <strong>Date/Time:</strong>{" "}
                {new Date(app.date_time).toLocaleString()}
              </p>
              <p>
                <strong>Doctor ID:</strong> {app.doctor_id}
              </p>
              <p>
                <strong>Patient ID:</strong> {app.patient_id}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Appointments;
