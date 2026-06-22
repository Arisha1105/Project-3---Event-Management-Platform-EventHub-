import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

function HomePage() {
  const [search, setSearch] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/events")
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredEvents = events.filter((event) =>
  event.title.toLowerCase().includes(search.toLowerCase())
);

  return (
    <div className="page">
      <Navbar />

        <div className="hero">
            <h1>Discover Amazing Events</h1>

            <p>
                Find conferences, workshops and festivals
                near you.
            </p>

            <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

      <h2>Upcoming Events</h2>

      <div className="events-grid">
        {filteredEvents.map((event) => (
          <div
            className="event-card"
            key={event.id}
          >
            <img
              src={event.image}
              alt={event.title}
              className="event-image"
            />

            <h3>{event.title}</h3>

            <p>
              <strong>{event.category}</strong>
            </p>

            <p>📅 {event.date}</p>

            <p>📍 {event.venue}</p>

            <p>
              🪑{" "}
              {event.capacity -
                event.ticketsSold}
              {" "}Seats Left
            </p>
          </div>
        ))}
      </div>
    
    </div>
  );
}

export default HomePage;