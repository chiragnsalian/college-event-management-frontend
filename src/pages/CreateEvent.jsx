import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrganizerLayout from "../components/OrganizerLayout";

const CreateEvent = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");

  const handleCreateEvent = async () => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/events",
        {
          title,
          description,
          date,
          time,
          venue,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/organizer/manage-events");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Failed to create event");
      }

    }

  };

  return (

    <OrganizerLayout>

      <h1 className="text-4xl font-bold mb-8">
        Create Event
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Event Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            placeholder="Description"
            rows="4"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="time"
              value={time}
              onChange={(e)=>setTime(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e)=>setVenue(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={handleCreateEvent}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Create Event
          </button>

        </div>

      </div>

    </OrganizerLayout>

  );

};

export default CreateEvent;