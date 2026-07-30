import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalOrganizers: 0,
    totalEvents: 0,
    totalCertificates: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load dashboard");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-3xl font-bold">
          Loading Dashboard...
        </div>
      </AdminLayout>
    );
  }

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* Students */}

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-blue-500">

          <h2 className="text-gray-500 text-lg">

            Total Students

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-blue-600">

            {stats.totalStudents}

          </h1>

        </div>

        {/* Organizers */}

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-green-500">

          <h2 className="text-gray-500 text-lg">

            Total Organizers

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-green-600">

            {stats.totalOrganizers}

          </h1>

        </div>

        {/* Events */}

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-yellow-500">

          <h2 className="text-gray-500 text-lg">

            Total Events

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-yellow-500">

            {stats.totalEvents}

          </h1>

        </div>

        {/* Certificates */}

        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-8 border-purple-500">

          <h2 className="text-gray-500 text-lg">

            Certificates Issued

          </h2>

          <h1 className="text-5xl font-bold mt-4 text-purple-600">

            {stats.totalCertificates}

          </h1>

        </div>

      </div>

    </AdminLayout>

  );

};

export default AdminDashboard;