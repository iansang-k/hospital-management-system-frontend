import { useEffect, useState } from "react";

function Appointments() {
  const [data, setData] = useState({
    appointments: [],
    doctors: [],
    patients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsRes, doctorsRes, patientsRes] = await Promise.all([
          fetch("http://localhost:8000/appointments"),
          fetch("http://localhost:8000/doctors"),
          fetch("http://localhost:8000/patients"),
        ]);

        const [appointments, doctors, patients] = await Promise.all([
          appointmentsRes.json(),
          doctorsRes.json(),
          patientsRes.json(),
        ]);

        setData({ appointments, doctors, patients });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDoctorName = (id) => {
    const doctor = data.doctors.find((d) => d.id === id);
    return doctor ? `Dr. ${doctor.name}` : "Unknown Doctor";
  };

  const getPatientName = (id) => {
    const patient = data.patients.find((p) => p.id === id);
    return patient ? patient.name : "Unknown Patient";
  };

  if (loading) return <p className="text-teal-600">Loading appointments...</p>;
  if (data.appointments.length === 0)
    return <p className="text-gray-600">No appointments found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-teal-800">Appointments</h2>
      <div className="space-y-4">
        {data.appointments.map((app) => (
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
                <span>{getDoctorName(app.doctor_id)}</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm font-medium text-teal-700">
                  Patient:
                </span>
                <span>{getPatientName(app.patient_id)}</span>
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
    </div>
  );
}

export default Appointments;
