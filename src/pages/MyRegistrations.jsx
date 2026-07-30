import { useEffect, useState } from "react";
import axios from "axios";

const MyRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/registrations/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistrations(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-2xl font-semibold">
        Loading Registrations...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        My Registrations
      </h1>

      <p className="text-gray-500 mb-8">
        View all the events you've successfully registered for.
      </p>

      {registrations.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

          <h2 className="text-2xl font-semibold text-gray-600">
            No registrations found.
          </h2>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {registrations.map((registration) => (

            <div
              key={registration._id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {registration.event.title}
              </h2>

              <div className="mt-5 space-y-3">

                <p>
                  📅 <strong>Date:</strong>{" "}
                  {new Date(
                    registration.event.date
                  ).toLocaleDateString()}
                </p>

                <p>
                  📍 <strong>Venue:</strong>{" "}
                  {registration.event.venue}
                </p>

                <p>
                  ✅ <strong>Status:</strong>{" "}
                  <span className="text-green-600 font-semibold">
                    {registration.status}
                  </span>
                </p>

              </div>

              <div className="mt-8 flex justify-center">

                <img
                  src={registration.qrCode}
                  alt="QR Code"
                  className="w-44 h-44 rounded-lg border"
                />

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
};

export default MyRegistrations;