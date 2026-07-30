import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ManageOrganizers = () => {

  const [organizers, setOrganizers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrganizers();
  }, []);

  const fetchOrganizers = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/organizers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrganizers(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load organizers");

    } finally {

      setLoading(false);

    }

  };

  const deleteOrganizer = async (id) => {

    if (!window.confirm("Delete this organizer?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Organizer deleted successfully");

      fetchOrganizers();

    } catch (error) {

      alert(error.response?.data?.message || "Delete failed");

    }

  };

  const filteredOrganizers = organizers.filter((organizer) =>
    organizer.name.toLowerCase().includes(search.toLowerCase()) ||
    organizer.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {

    return (
      <AdminLayout>
        <div className="text-3xl font-bold">
          Loading Organizers...
        </div>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">
        Manage Organizers
      </h1>

      <input
        type="text"
        placeholder="Search Organizer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-8"
      />

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-green-600 text-white">

            <tr>

              <th className="p-4 text-left">
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrganizers.map((organizer) => (

              <tr
                key={organizer._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">
                  {organizer.name}
                </td>

                <td className="p-4">
                  {organizer.email}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteOrganizer(organizer._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </AdminLayout>

  );

};

export default ManageOrganizers;