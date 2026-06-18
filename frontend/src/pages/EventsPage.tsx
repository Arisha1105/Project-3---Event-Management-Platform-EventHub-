import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function EventsPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const storedEvents = JSON.parse(
      localStorage.getItem("events") || "[]"
    );

    setEvents(storedEvents);
  }, []);

  return (
    <div className="page">
      <Navbar />

      <div className="hero">
        <h1>Discover Amazing Events</h1>
        <p>
          Find workshops, hackathons, conferences,
          concerts and more.
        </p>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div
            className="event-card"
            key={event.id}
          >
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Event";
              }}
            />

            <h3>{event.title}</h3>

            <p>
              <strong>
                {event.category}
              </strong>
            </p>

            <p>📍 {event.venue}</p>

            <p>📅 {event.date}</p>

            <p className="price">
              ₹ {event.price}
            </p>

            <button
              className="book-btn"
              onClick={() =>
                navigate(`/events/${event.id}`)
              }
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsPage;