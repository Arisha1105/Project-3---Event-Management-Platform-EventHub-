import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function EventsPage() {
  const navigate = useNavigate();

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

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const filteredEvents =
    events.filter((event) => {
      const matchesSearch =
        event.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        category === "All" ||
        event.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

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

      <input
        type="text"
        placeholder="Search events..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
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
      </select>

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