import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = z.object({
  medication: z.string().nonempty({ message: "Medication is required" }),
  dosage: z.string().nonempty({ message: "Dosage is required" }),
  date_prescribed: z.string().nonempty({ message: "Date is required" }),
  doctor_id: z.coerce.number().min(1, { message: "Select doctor" }),
  patient_id: z.coerce.number().min(1, { message: "Select patient" }),
});

export const AddPrescription = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/doctors")
      .then((res) => res.json())
      .then((data) => setDoctors(data));
    fetch("http://localhost:8000/patients")
      .then((res) => res.json())
      .then((data) => setPatients(data));
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      medication: "",
      dosage: "",
      date_prescribed: "",
      doctor_id: null,
      patient_id: null,
    },
  });

  const onSubmit = (values) => {
    fetch("http://localhost:8000/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        toast.success(data.message);
      });
  };

  return (
    <div className="min-h-screen bg-teal-50 p-6">
      <h2 className="text-3xl font-semibold text-teal-900 mb-8 text-center">
        Add Prescription
      </h2>
      <form
        className="flex flex-col gap-6 max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            className={
              errors?.medication?.message
                ? "border border-red-500 p-3 w-full rounded-lg"
                : "border border-teal-200 p-3 w-full rounded-lg"
            }
            type="text"
            placeholder="Medication"
            {...register("medication")}
          />
          {errors?.medication?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.medication.message}
            </p>
          ) : null}
        </div>

        <div>
          <input
            className={
              errors?.dosage?.message
                ? "border border-red-500 p-3 w-full rounded-lg"
                : "border border-teal-200 p-3 w-full rounded-lg"
            }
            type="text"
            placeholder="Dosage"
            {...register("dosage")}
          />
          {errors?.dosage?.message ? (
            <p className="text-xs text-red-500 mt-1">{errors.dosage.message}</p>
          ) : null}
        </div>

        <div>
          <input
            className={
              errors?.date_prescribed?.message
                ? "border border-red-500 p-3 w-full rounded-lg"
                : "border border-teal-200 p-3 w-full rounded-lg"
            }
            type="date"
            {...register("date_prescribed")}
          />
          {errors?.date_prescribed?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.date_prescribed.message}
            </p>
          ) : null}
        </div>

        <div>
          <select
            className={
              errors?.doctor_id?.message
                ? "border border-red-500 p-3 w-full rounded-lg bg-white"
                : "border border-teal-200 p-3 w-full rounded-lg bg-white"
            }
            {...register("doctor_id")}
          >
            <option value="" selected>
              Select doctor
            </option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                Dr. {doctor.name}
              </option>
            ))}
          </select>
          {errors?.doctor_id?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.doctor_id.message}
            </p>
          ) : null}
        </div>

        <div>
          <select
            className={
              errors?.patient_id?.message
                ? "border border-red-500 p-3 w-full rounded-lg bg-white"
                : "border border-teal-200 p-3 w-full rounded-lg bg-white"
            }
            {...register("patient_id")}
          >
            <option value="" selected>
              Select patient
            </option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          {errors?.patient_id?.message ? (
            <p className="text-xs text-red-500 mt-1">
              {errors.patient_id.message}
            </p>
          ) : null}
        </div>

        <button
          className="bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700"
          type="submit"
        >
          Add Prescription
        </button>
      </form>
    </div>
  );
};
