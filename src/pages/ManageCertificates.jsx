import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ManageCertificates = () => {

  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  useEffect(() => {

    const filtered = certificates.filter((certificate) =>

      certificate.student?.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      certificate.event?.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||

      certificate.certificateId
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

    setFilteredCertificates(filtered);

  }, [search, certificates]);

  const fetchCertificates = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/certificates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCertificates(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load certificates");

    }

  };

  const deleteCertificate = async (id) => {

    if (!window.confirm("Delete this certificate?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/certificates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Certificate Deleted Successfully");

      fetchCertificates();

    } catch (error) {

      alert(error.response?.data?.message || "Delete Failed");

    }

  };

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">

        Manage Certificates

      </h1>

      <input
        type="text"
        placeholder="Search Student / Event / Certificate ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 border rounded-xl mb-8"
      />

      {filteredCertificates.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h2 className="text-2xl font-semibold">

            No Certificates Found

          </h2>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {filteredCertificates.map((certificate) => (

            <div
              key={certificate._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h2 className="text-2xl font-bold text-blue-600">

                {certificate.event?.title}

              </h2>

              <div className="mt-5 space-y-2">

                <p>

                  👤 <strong>Student:</strong>{" "}

                  {certificate.student?.name}

                </p>

                <p>

                  ✉️ <strong>Email:</strong>{" "}

                  {certificate.student?.email}

                </p>

                <p>

                  🆔 <strong>Certificate ID:</strong>{" "}

                  {certificate.certificateId}

                </p>

                <p>

                  📅 <strong>Issued:</strong>{" "}

                  {new Date(
                    certificate.issuedDate
                  ).toLocaleDateString()}

                </p>

              </div>

              <div className="flex gap-3 mt-6">

                <a
                  href={`http://localhost:5000${certificate.downloadURL}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  View PDF
                </a>

                <button
                  onClick={() =>
                    deleteCertificate(certificate._id)
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </AdminLayout>

  );

};

export default ManageCertificates;