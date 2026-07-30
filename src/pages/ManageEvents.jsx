import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrganizerLayout from "../components/OrganizerLayout";

const ManageEvents = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/events/organizer/my-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Deleted");

      fetchEvents();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <OrganizerLayout>
      <h1 className="text-4xl font-bold mb-8">
        Manage Events
      </h1>

      {events.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold">
            No Events Found
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {events.map((event) => (

            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h2 className="text-2xl font-bold text-blue-600">
                {event.title}
              </h2>

              <p className="mt-4">
                {event.description}
              </p>

              <p className="mt-4">
                📍 {event.venue}
              </p>

              <p>
                📅 {new Date(event.date).toLocaleDateString()}
              </p>

              <div className="flex gap-3 mt-6 flex-wrap">

                <button
                  onClick={() =>
                    navigate(`/organizer/edit-event/${event._id}`)
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    navigate(`/organizer/attendance/${event._id}`)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
                >
                  Attendance
                </button>

                <button
                  onClick={() => deleteEvent(event._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}
    </OrganizerLayout>
  );
};

export default ManageEvents;