import { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/events"
      );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const registerEvent = async (eventId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/registrations",
        {
          eventId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Registration Failed");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96 text-2xl font-semibold">
        Loading Events...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        College Events
      </h1>

      <p className="text-gray-500 mb-8">
        Explore and register for upcoming college events.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {events.map((event) => (

          <div
            key={event._id}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition duration-300"
          >

            <h2 className="text-2xl font-bold text-blue-600">
              {event.title}
            </h2>

            <p className="text-gray-600 mt-4">
              {event.description}
            </p>

            <div className="mt-6 space-y-3">

              <p>
                📅 <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p>
                ⏰ <strong>Time:</strong> {event.time}
              </p>

              <p>
                📍 <strong>Venue:</strong> {event.venue}
              </p>

              <p>
                🏷 <strong>Category:</strong> {event.category}
              </p>

            </div>

            <button
              onClick={() => registerEvent(event._id)}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Register Event
            </button>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Events;