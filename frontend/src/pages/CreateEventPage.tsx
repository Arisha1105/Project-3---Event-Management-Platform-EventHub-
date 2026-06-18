import { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function CreateEventPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    const events = JSON.parse(
      localStorage.getItem("events") || "[]"
    );

    const eventToEdit = events.find(
      (event: any) => event.id === Number(id)
    );

    if (eventToEdit) {
      setEventData(eventToEdit);
    }
  }, [id]);

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    venue: "",
    date: "",
    time: "",
    age: "",
    price: "",
    image: "",
    otherCategory: "",
    capacity: "",
  });

  const handleCreateEvent = () => {
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.category ||
      !eventData.venue ||
      !eventData.date ||
      !eventData.time ||
      !eventData.age ||
      !eventData.price ||
      !eventData.image
    ) {
      alert("Please fill all fields");
      return;
    }

    const existingEvents = JSON.parse(
      localStorage.getItem("events") || "[]"
    );

    if (id) {
      const updatedEvents = existingEvents.map(
        (event: any) =>
          event.id === Number(id)
            ? {
                ...eventData,
                id: Number(id),
                price: Number(eventData.price),
                age: Number(eventData.age),
                capacity: Number(eventData.capacity),
                ticketsSold:
                  event.ticketsSold || 0,
              }
            : event
      );

      localStorage.setItem(
        "events",
        JSON.stringify(updatedEvents)
      );

      alert("Event Updated Successfully!");
    } else {
      const newEvent = {
        id: Date.now(),

        ...eventData,

        category:
          eventData.category === "Other"
            ? eventData.otherCategory
            : eventData.category,

        price: Number(eventData.price),

        age: Number(eventData.age),

        capacity: Number(eventData.capacity),

        ticketsSold: 0,
      };

      localStorage.setItem(
        "events",
        JSON.stringify([
          ...existingEvents,
          newEvent,
        ])
      );
    }

    navigate("/dashboard");
  };

  return (
    <div className="page">
      <Navbar />

      <div className="register-container">
        <h1>Create Event</h1>

        <div className="register-form">
          <input
            type="text"
            placeholder="Event Title"
            value={eventData.title}
            onChange={(e) =>
              setEventData({
                ...eventData,
                title: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Event Description"
            value={eventData.description}
            onChange={(e) =>
              setEventData({
                ...eventData,
                description: e.target.value,
              })
            }
          />

          <select
            value={eventData.category}
            onChange={(e) =>
              setEventData({
                ...eventData,
                category: e.target.value,
              })
            }
          >
            <option value="">
              Select Category
            </option>

            <option value="Workshop">
              Workshop
            </option>

            <option value="Hackathon">
              Hackathon
            </option>

            <option value="Music">
              Music
            </option>

            <option value="Conference">
              Conference
            </option>

            <option value="Sports">
              Sports
            </option>

            <option value="Other">
              Other
            </option>
          </select>

         {eventData.category === "Other" && (
            <input
                type="text"
                placeholder="Enter Category"
                value={eventData.otherCategory}
                onChange={(e) =>
                setEventData({
                    ...eventData,
                    otherCategory: e.target.value,
                })
                }
            />
            )}

          <input
            type="text"
            placeholder="Venue"
            value={eventData.venue}
            onChange={(e) =>
              setEventData({
                ...eventData,
                venue: e.target.value,
              })
            }
          />

          <input
            type="date"
            value={eventData.date}
            onChange={(e) =>
              setEventData({
                ...eventData,
                date: e.target.value,
              })
            }
          />

          <input
            type="time"
            value={eventData.time}
            onChange={(e) =>
              setEventData({
                ...eventData,
                time: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="0"
            placeholder="Minimum Age"
            value={eventData.age}
            onChange={(e) =>
              setEventData({
                ...eventData,
                age: e.target.value,
              })
            }
          />

          <input
            type="number"
            min="0"
            placeholder="Ticket Price"
            value={eventData.price}
            onChange={(e) =>
              setEventData({
                ...eventData,
                price: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Total Capacity"
            value={eventData.capacity}
            onChange={(e) =>
              setEventData({
                ...eventData,
                capacity: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={eventData.image}
            onChange={(e) =>
              setEventData({
                ...eventData,
                image: e.target.value,
              })
            }
          />

          <button
            className="register-btn"
            onClick={handleCreateEvent}
          >
            {id ? "Update Event" : "Create Event"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEventPage;