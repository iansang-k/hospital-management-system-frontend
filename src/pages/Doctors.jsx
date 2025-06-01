import { useEffect, useState } from "react";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Doctors</h2>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <ul className="space-y-2">
          {doctors.map((doc) => (
            <li key={doc.id} className="p-4 border rounded shadow-sm">
              <p>
                <strong>Name:</strong> {doc.name}
              </p>
              <p>
                <strong>Specialty:</strong> {doc.speciality}
              </p>
              <p>
                <strong>Phone:</strong> {doc.phone_number}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Doctors;
