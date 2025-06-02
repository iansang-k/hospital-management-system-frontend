import { useEffect, useState } from "react";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-teal-800">Appointments</h2>

      {loading ? (
        <p className="text-teal-600">Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div
              key={app.id}
              className="p-4 border border-teal-100 rounded-lg bg-white shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-24 text-sm font-medium text-teal-700">
                    Date/Time:
                  </span>
                  <span>{new Date(app.date_time).toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-medium text-teal-700">
                    Doctor:
                  </span>
                  <span>{app.doctor_id}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-medium text-teal-700">
                    Patient:
                  </span>
                  <span>{app.patient_id}</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 text-sm font-medium text-teal-700">
                    Status:
                  </span>
                  <span className="px-2 py-1 text-xs rounded-full bg-teal-100 text-teal-800">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Appointments;
