import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const validationSchema = z.object({
  name: z.string().nonempty("Required"),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  phone_number: z
    .string()
    .regex(/^\d{10}$/, "Must be 10 digits")
    .optional(),
  emergency_contact: z.string().optional(),
  emergency_phone_number: z.string().optional(),
  bloodtype: z.string().optional(),
});

export default function AddPatient() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      name: "",
      gender: "",
      date_of_birth: "",
      phone_number: "",
      emergency_contact: "",
      emergency_phone_number: "",
      bloodtype: "",
    },
  });

  const onSubmit = (values) => {
    fetch("http://localhost:8000/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        toast.success(data.message);
        navigate("/patients");
      })
      .catch((error) => {
        toast.error("Failed to add patient");
      });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8 border border-teal-100">
      <h2 className="text-xl font-semibold mb-4 text-teal-800">Add Patient</h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={
              errors.name
                ? "w-full p-2.5 rounded-lg border border-red-400 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
                : "w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
            }
          />
          {errors.name ? (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Gender
          </label>
          <input
            type="text"
            {...register("gender")}
            className="w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
            placeholder="Male/Female/Other"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register("date_of_birth")}
            className="w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            {...register("phone_number")}
            className={
              errors.phone_number
                ? "w-full p-2.5 rounded-lg border border-red-400 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
                : "w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
            }
            placeholder="10-digit number"
          />
          {errors.phone_number ? (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone_number.message}
            </p>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Emergency Contact
          </label>
          <input
            type="text"
            {...register("emergency_contact")}
            className="w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Emergency Phone
          </label>
          <input
            type="tel"
            {...register("emergency_phone_number")}
            className="w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-teal-700 mb-1">
            Blood Type
          </label>
          <input
            type="text"
            {...register("bloodtype")}
            className="w-full p-2.5 rounded-lg border border-teal-200 focus:ring-2 focus:ring-teal-300 focus:border-teal-400"
            placeholder="A+, B-, O+, etc."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={
            isSubmitting
              ? "w-full py-2.5 px-4 bg-teal-600 text-white rounded-lg font-medium opacity-70 cursor-not-allowed"
              : "w-full py-2.5 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
          }
        >
          {isSubmitting ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
