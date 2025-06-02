import { useEffect, useState } from "react";

function Prescriptions() {
  const [data, setData] = useState({
    prescriptions: [],
    doctors: [],
    patients: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/prescriptions").then((res) => res.json()),
      fetch("http://localhost:8000/doctors").then((res) => res.json()),
      fetch("http://localhost:8000/patients").then((res) => res.json()),
    ]).then(([prescriptions, doctors, patients]) => {
      setData({ prescriptions, doctors, patients });
      setLoading(false);
    });
  }, []);

  const getName = (id, list, prefix = "") => {
    const item = list.find((item) => item.id === id);
    return item ? `${prefix}${item.name}` : `Unknown ${prefix}`;
  };

  if (loading) return <div className="p-6 text-teal-800">Loading...</div>;
  if (data.prescriptions.length === 0)
    return <p className="text-center text-gray-600">No prescriptions found.</p>;

  return (
    <div className="py-10 px-6">
      <h2 className="text-3xl font-semibold text-teal-900 mb-8 text-center">
        Prescriptions
      </h2>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {data.prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="bg-white border border-teal-100 rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold text-teal-800 mb-2">
              {rx.medication}
            </h3>
            <div className="text-gray-700 space-y-1 text-sm">
              <p>
                <div className="font-medium">Dosage:</div> {rx.dosage}
              </p>
              <p>
                <div className="font-medium">Date Prescribed:</div>{" "}
                {new Date(rx.date_prescribed).toLocaleDateString()}
              </p>
              <p>
                <div className="font-medium">Doctor:</div>{" "}
                {getName(rx.doctor_id, data.doctors, "Dr. ")}
              </p>
              <p>
                <div className="font-medium">Patient:</div>{" "}
                {getName(rx.patient_id, data.patients)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prescriptions;
