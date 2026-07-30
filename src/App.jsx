import { Routes, Route } from "react-router-dom";

// ================= Student Pages =================

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Events from "./pages/Events";
import MyRegistrations from "./pages/MyRegistrations";
import Certificates from "./pages/Certificates";

// ================= Organizer Pages =================

import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEvent from "./pages/CreateEvent";
import ManageEvents from "./pages/ManageEvents";
import Attendance from "./pages/Attendance";
import EditEvent from "./pages/EditEvent";
import QRScanner from "./pages/QRScanner";

// ================= Admin Pages =================

import AdminDashboard from "./pages/AdminDashboard";
import ManageStudents from "./pages/ManageStudents";
import ManageOrganizers from "./pages/ManageOrganizers";
import ManageAllEvents from "./pages/ManageAllEvents";
import ManageCertificates from "./pages/ManageCertificates";

// ================= Layout =================

import Layout from "./components/Layout";

// ================= Authentication =================

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Authentication */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ================= STUDENT ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/events"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Layout>
              <Events />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/registrations"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Layout>
              <MyRegistrations />
            </Layout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/certificates"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <Layout>
              <Certificates />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* ================= ORGANIZER ================= */}

      <Route
        path="/organizer/dashboard"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/create-event"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <CreateEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/manage-events"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/edit-event/:id"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <EditEvent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/attendance"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/attendance/:eventId"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <Attendance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/scanner/:eventId"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <QRScanner />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/students"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageStudents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/organizers"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageOrganizers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageAllEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/certificates"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <ManageCertificates />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;