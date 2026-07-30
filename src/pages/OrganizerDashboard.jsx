import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerLayout from "../components/OrganizerLayout";

const OrganizerDashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalEvents: 0,
    totalRegistrations: 0,
    totalAttendance: 0,
    totalCertificates: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/events/organizer/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.log(error);
    }

  };

  return (

    <OrganizerLayout>

      <h1 className="text-4xl font-bold text-gray-800">
        Welcome, {user.name} 👋
      </h1>

      <p className="text-gray-500 mt-2">
        Organizer Dashboard
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Total Events
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {stats.totalEvents}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Registrations
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.totalRegistrations}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Attendance
          </h2>

          <p className="text-4xl font-bold text-orange-600 mt-3">
            {stats.totalAttendance}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">

          <h2 className="text-gray-500">
            Certificates
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {stats.totalCertificates}
          </p>

        </div>

      </div>

    </OrganizerLayout>

  );
};

export default OrganizerDashboard;