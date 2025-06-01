import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function AddPatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    gender: "",
    date_of_birth: "",
    phone_number: "",
    emergency_contact: "",
    emergency_phone_number: "",
    blood_type: "", // Changed from bloodtype to match common naming conventions
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!form.name.trim()) {
        throw new Error("Patient name is required");
      }

      const response = await fetch("http://localhost:8000/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          date_of_birth: form.date_of_birth || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to add patient");
      }

      toast.success("Patient added successfully!");
      navigate("/patients");
    } catch (error) {
      console.error("Error adding patient:", error);
      toast.error(error.message || "Failed to add patient");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Patient</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Full Name*</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            pattern="[0-9]{10}"
            title="10 digit phone number"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">
              Emergency Contact
            </label>
            <input
              name="emergency_contact"
              value={form.emergency_contact}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Emergency Phone</label>
            <input
              type="tel"
              name="emergency_phone_number"
              value={form.emergency_phone_number}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              pattern="[0-9]{10}"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Blood Type</label>
          <select
            name="blood_type"
            value={form.blood_type}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded text-white font-medium ${
            isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Patient"}
        </button>
      </form>
    </div>
  );
}
