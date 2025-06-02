import { useEffect, useState } from "react";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetching all data
        const [prescriptionsRes, doctorsRes, patientsRes] = await Promise.all([
          fetch("http://localhost:8000/prescriptions"),
          fetch("http://localhost:8000/doctors"),
          fetch("http://localhost:8000/patients"),
        ]);

        if (!prescriptionsRes.ok || !doctorsRes.ok || !patientsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [prescriptionsData, doctorsData, patientsData] =
          await Promise.all([
            prescriptionsRes.json(),
            doctorsRes.json(),
            patientsRes.json(),
          ]);

        setPrescriptions(prescriptionsData);
        setDoctors(doctorsData);
        setPatients(patientsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //getting doctor name by ID
  const getDoctorName = (doctorId) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    return doctor ? `Dr. ${doctor.name}` : "Unknown Doctor";
  };

  //getting patient name by ID
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? patient.name : "Unknown Patient";
  };

  if (loading)
    return <div className="p-6 text-teal-800">Loading prescriptions...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-6">
      <h2 className="text-3xl font-semibold text-teal-900 mb-8 text-center">
        Prescriptions
      </h2>
      {prescriptions.length === 0 ? (
        <p className="text-center text-gray-600">No prescriptions found.</p>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-teal-800 mb-2">
                {rx.medication}
              </h3>
              <div className="text-gray-700 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Dosage:</span> {rx.dosage}
                </p>
                <p>
                  <span className="font-medium">Date Prescribed:</span>{" "}
                  {new Date(rx.date_prescribed).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Doctor:</span>{" "}
                  {getDoctorName(rx.doctor_id)}
                </p>
                <p>
                  <span className="font-medium">Patient:</span>{" "}
                  {getPatientName(rx.patient_id)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Prescriptions;
