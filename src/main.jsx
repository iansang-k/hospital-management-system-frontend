import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import AddPatient from "./pages/AddPatient";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import BookAppointment from "./pages/BookAppointment";
import { AddPrescription } from "./pages/AddPrescription";

import App from "./App";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      {
        path: "doctors",
        element: <Doctors />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "prescriptions",
        element: <Prescriptions />,
      },
      {
        path: "add-patient",
        element: <AddPatient />,
      },
      {
        path: "book-appointment",
        element: <BookAppointment />,
      },
      {
        path: "add-prescription",
        element: <AddPrescription />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: "#0d9488",
          color: "#fff",
        },
      }}
    />
    <RouterProvider router={routes} />
  </StrictMode>
);
