import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OrganizerLayout from "../components/OrganizerLayout";

const Attendance = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchMyEvents();

    if (eventId) {
      loadRegistrations(eventId);
    }
  }, [eventId]);

  const fetchMyEvents = async () => {
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

  const loadRegistrations = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/registrations/event/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSelectedEvent(id);
      setRegistrations(response.data);
      loadAttendance(id);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAttendance = async (eventId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `http://localhost:5000/api/attendance/event/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAttendanceList(response.data);

  } catch (error) {
    console.log(error);
  }
};

  const markAttendance = async (registrationId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/attendance",
        {
          registrationId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      await loadRegistrations(selectedEvent);
      await loadAttendance(selectedEvent);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <OrganizerLayout>
      <h1 className="text-4xl font-bold mb-8">
        Attendance Management
      </h1>

      {!selectedEvent ? (
        <>
          <h2 className="text-2xl font-semibold mb-6">
            Select an Event
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-lg rounded-2xl p-6"
              >
                <h2 className="text-2xl font-bold text-blue-600">
                  {event.title}
                </h2>

                <p className="mt-3">
                  {event.description}
                </p>

                <p className="mt-3">
                  📍 {event.venue}
                </p>

                <p>
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>

                <button
                  onClick={() => loadRegistrations(event._id)}
                  className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                  Take Attendance
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex gap-4 mb-6 flex-wrap">

            <button
              onClick={() => {
                if (eventId) {
                  navigate("/organizer/manage-events");
                } else {
                  setSelectedEvent(null);
                  setRegistrations([]);
                }
              }}
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg"
            >
              ← Back to Events
            </button>

            <button
              onClick={() =>
                navigate(`/organizer/scanner/${selectedEvent}`)
              }
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg"
            >
              📷 Scan QR Code
            </button>

          </div>

          <h2 className="text-3xl font-bold mb-6">
            Registered Students
          </h2>

          {registrations.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              No Students Registered
            </div>
          ) : (
            <div className="space-y-4">

              {registrations.map((registration) => (

                <div
                  key={registration._id}
                  className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center"
                >
                  <div>

                    <h3 className="text-xl font-bold">
                      {registration.student.name}
                    </h3>

                    <p className="text-gray-500">
                      {registration.student.email}
                    </p>

                  </div>

                  {
                    attendanceList.some(
                    (att) =>
                    att.student === registration.student._id
                    ) ? (

                    <span className="bg-green-600 text-white px-6 py-3 rounded-lg">
                    ✅ Present
                    </span>

                    ) : (

                    <button
                    onClick={() =>
                    markAttendance(registration._id)
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                    Mark Present
                    </button>

                    )
                    }

                </div>

              ))}

            </div>
          )}
        </>
      )}
    </OrganizerLayout>
  );
};

export default Attendance;