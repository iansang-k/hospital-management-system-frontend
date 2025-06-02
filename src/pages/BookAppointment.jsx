import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = z.object({
  patient_id: z.coerce.number().min(1, "Select a patient"),
  doctor_id: z.coerce.number().min(1, "Select a doctor"),
  date_time: z.string().nonempty("Date and time required"),
});

function BookAppointment() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientsRes, doctorsRes] = await Promise.all([
          fetch("http://localhost:8000/patients"),
          fetch("http://localhost:8000/doctors"),
        ]);

        const [patientsData, doctorsData] = await Promise.all([
          patientsRes.json(),
          doctorsRes.json(),
        ]);

        setPatients(patientsData);
        setDoctors(doctorsData);
      } catch (error) {
        toast.error("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_id: Number(data.patient_id),
          doctor_id: Number(data.doctor_id),
          date_time: new Date(data.date_time).toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Booking failed");

      toast.success("Appointment booked!");
      navigate("/appointments");
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (isLoading)
    return <div className="text-center py-8 text-teal-600">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border border-teal-100 mt-8">
      <h2 className="text-xl font-semibold mb-6 text-teal-800">
        Book Appointment
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Patient Selection */}
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Patient
          </label>
          <select
            {...register("patient_id")}
            className={`w-full p-2.5 rounded-lg border ${
              errors.patient_id ? "border-red-400" : "border-teal-200"
            } focus:ring-2 focus:ring-teal-300`}
            disabled={isSubmitting}
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors.patient_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.patient_id.message}
            </p>
          )}
        </div>

        {/* Doctor Selection */}
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Doctor
          </label>
          <select
            {...register("doctor_id")}
            className={`w-full p-2.5 rounded-lg border ${
              errors.doctor_id ? "border-red-400" : "border-teal-200"
            } focus:ring-2 focus:ring-teal-300`}
            disabled={isSubmitting}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>
          {errors.doctor_id && (
            <p className="mt-1 text-sm text-red-500">
              {errors.doctor_id.message}
            </p>
          )}
        </div>

        {/* Date and Time */}
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Date & Time
          </label>
          <input
            type="datetime-local"
            {...register("date_time")}
            className={`w-full p-2.5 rounded-lg border ${
              errors.date_time ? "border-red-400" : "border-teal-200"
            } focus:ring-2 focus:ring-teal-300`}
            disabled={isSubmitting}
          />
          {errors.date_time && (
            <p className="mt-1 text-sm text-red-500">
              {errors.date_time.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;
