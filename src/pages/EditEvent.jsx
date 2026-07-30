import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import OrganizerLayout from "../components/OrganizerLayout";

const EditEvent = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [venue, setVenue] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/events/${id}`
      );

      const event = response.data;

      setTitle(event.title);
      setDescription(event.description);
      setDate(event.date.substring(0,10));
      setTime(event.time);
      setVenue(event.venue);
      setCategory(event.category);

    } catch (error) {

      console.log(error);

    }

  };

  const updateEvent = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/events/${id}`,
        {
          title,
          description,
          date,
          time,
          venue,
          category,
        },
        {
          headers:{
            Authorization:`Bearer ${token}`,
          },
        }
      );

      alert("Event Updated Successfully");

      navigate("/organizer/manage-events");

    } catch(error){

      alert(error.response.data.message);

    }

  };

  return (

    <OrganizerLayout>

      <h1 className="text-4xl font-bold mb-8">
        Edit Event
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="space-y-5">

          <input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <textarea
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
            value={venue}
            onChange={(e)=>setVenue(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <input
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
            className="w-full border rounded-lg p-3"
          />

          <button
            onClick={updateEvent}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            Update Event
          </button>

        </div>

      </div>

    </OrganizerLayout>

  );

};

export default EditEvent;