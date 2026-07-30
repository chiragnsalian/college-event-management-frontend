import { useEffect, useState } from "react";
import axios from "axios";

function Certificates() {
  const [registrations, setRegistrations] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const registrationRes = await axios.get(
        "http://localhost:5000/api/registrations/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const certificateRes = await axios.get(
        "http://localhost:5000/api/certificates/my-certificates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(registrationRes.data);
      setCertificates(certificateRes.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  };

  const generateCertificate = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/certificates/generate",
        { eventId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchData();
    } catch (error) {
      alert(error.response?.data?.message || "Generation failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-2xl font-semibold">
        Loading Certificates...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        My Certificates
      </h1>

      <p className="text-gray-500 mb-8">
        Generate and download your participation certificates.
      </p>

      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold text-gray-600">
            No Registered Events
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {registrations.map((registration) => {
            const certificate = certificates.find(
              (c) =>
                c.event &&
                c.event._id === registration.event._id
            );

            return (
              <div
                key={registration._id}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  {registration.event.title}
                </h2>

                <div className="mt-4 space-y-2">
                  <p>
                    📅{" "}
                    {new Date(
                      registration.event.date
                    ).toLocaleDateString()}
                  </p>

                  <p>
                    📍 {registration.event.venue}
                  </p>
                </div>

                {certificate ? (
                  <>
                    <div className="mt-6 space-y-2">
                      <p>
                        <strong>Certificate ID:</strong>
                      </p>

                      <p>{certificate.certificateId}</p>

                      <p>
                        {new Date(
                          certificate.issuedDate
                        ).toLocaleDateString()}
                      </p>
                    </div>

                    <a
                      href={`http://localhost:5000${certificate.downloadURL}`}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 block text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                    >
                      Download Certificate
                    </a>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      generateCertificate(registration.event._id)
                    }
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                  >
                    Generate Certificate
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Certificates;