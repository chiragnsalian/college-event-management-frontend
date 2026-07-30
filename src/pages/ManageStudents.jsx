import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ManageStudents = () => {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStudents(response.data);

    } catch (error) {

      console.log(error);
      alert("Failed to load students");

    } finally {

      setLoading(false);

    }

  };

  const deleteStudent = async (id) => {

    if (!window.confirm("Delete this student?")) return;

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

      alert("Student deleted successfully");

      fetchStudents();

    } catch (error) {

      alert(error.response?.data?.message || "Delete failed");

    }

  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {

    return (
      <AdminLayout>
        <div className="text-3xl font-bold">
          Loading Students...
        </div>
      </AdminLayout>
    );

  }

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">

        Manage Students

      </h1>

      <input
        type="text"
        placeholder="Search Student..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 border rounded-lg p-3"
      />

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-blue-600 text-white">

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

            {filteredStudents.map((student) => (

              <tr
                key={student._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4">

                  {student.name}

                </td>

                <td className="p-4">

                  {student.email}

                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={() => deleteStudent(student._id)}
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

export default ManageStudents;