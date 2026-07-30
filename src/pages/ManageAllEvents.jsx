import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../components/AdminLayout";

const ManageAllEvents = () => {

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {

    const filtered = events.filter((event) =>

      event.title.toLowerCase().includes(search.toLowerCase()) ||

      event.venue.toLowerCase().includes(search.toLowerCase()) ||

      event.createdBy?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

    setFilteredEvents(filtered);

  }, [search, events]);

  const fetchEvents = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEvents(response.data);

    } catch (error) {

      console.log(error);

      alert("Failed to load events");

    }

  };

  const deleteEvent = async (id) => {

    if (!window.confirm("Delete this event?")) return;

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/events/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Event Deleted Successfully");

      fetchEvents();

    } catch (error) {

      alert(error.response?.data?.message);

    }

  };

  return (

    <AdminLayout>

      <h1 className="text-4xl font-bold mb-8">

        Manage All Events

      </h1>

      <input
        type="text"
        placeholder="Search by Event / Venue / Organizer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-3 rounded-xl border mb-8"
      />

      {filteredEvents.length === 0 ? (

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">

          <h2 className="text-2xl font-semibold">

            No Events Found

          </h2>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {filteredEvents.map((event) => (

            <div
              key={event._id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >

              <h2 className="text-2xl font-bold text-blue-600">

                {event.title}

              </h2>

              <p className="mt-3">

                {event.description}

              </p>

              <div className="mt-5 space-y-2">

                <p>

                  📍 <strong>Venue:</strong> {event.venue}

                </p>

                <p>

                  📅 <strong>Date:</strong>{" "}

                  {new Date(event.date).toLocaleDateString()}

                </p>

                <p>

                  👤 <strong>Organizer:</strong>{" "}

                  {event.createdBy?.name}

                </p>

                <p>

                  ✉️ <strong>Email:</strong>{" "}

                  {event.createdBy?.email}

                </p>

              </div>

              <button
                onClick={() => deleteEvent(event._id)}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >

                Delete Event

              </button>

            </div>

          ))}

        </div>

      )}

    </AdminLayout>

  );

};

export default ManageAllEvents;