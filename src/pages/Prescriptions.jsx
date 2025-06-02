import { useEffect, useState } from "react";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/prescriptions")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch prescriptions");
        return res.json();
      })
      .then((data) => {
        setPrescriptions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
                  {rx.date_prescribed}
                </p>
                <p>
                  <span className="font-medium">Doctor ID:</span> {rx.doctor_id}
                </p>
                <p>
                  <span className="font-medium">Patient ID:</span>{" "}
                  {rx.patient_id}
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
