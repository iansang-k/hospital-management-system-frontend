import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/doctors")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-teal-800">Doctors</h2>

      {loading ? (
        <p className="text-teal-600">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-600">No doctors found.</p>
      ) : (
        <div className="space-y-3">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="p-4 border border-teal-100 rounded-lg bg-white hover:bg-teal-50 transition-colors"
            >
              <h3 className="font-medium text-teal-700 mb-2">{doc.name}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-teal-600">Specialty:</span>{" "}
                  {doc.speciality}
                </div>
                <div>
                  <span className="text-teal-600">Phone:</span>{" "}
                  {doc.phone_number}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Doctors;
