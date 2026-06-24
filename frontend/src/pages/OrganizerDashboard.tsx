import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function OrganizerDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
 );

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (
      !user ||
      user.role !== "organizer"
    ) {
      navigate("/login");
    }
  }, [navigate]);

  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

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
  
      fetch("http://localhost:8000/bookings")
        .then((response) =>
          response.json()
        )
        .then((data) => {
          setBookings(data);
        });

    }, 
  []);

  const totalTicketsSold = events.reduce(
    (sum, event) =>
      sum + (event.ticketsSold || 0),
    0
  );

  const totalRevenue = events.reduce(
    (sum, event) =>
      sum +
      event.price *
        (event.ticketsSold || 0),
    0
  );

  const stats = {
    totalEvents: events.length,
    ticketsSold: totalTicketsSold,
    revenue: totalRevenue,
  };

  const handleDeleteEvent = async (
    eventId: number
  ) => {
    try {
      await fetch(
        `http://localhost:8000/events/${eventId}`,
        {
          method: "DELETE",
        }
      );

      setEvents(
        events.filter(
          (event) =>
            event.id !== eventId
        )
      );

      alert(
        "Event deleted successfully!"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to delete event"
      );
    }
  };

  return (
    <div className="page">
      <Navbar />

    <h1>
        Welcome, {user?.name} 👋
    </h1>
    <p>
      Manage your events and bookings
    </p>

      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Events</h3>
          <p>{stats.totalEvents}</p>
        </div>

        <div className="stat-card">
          <h3>Tickets Sold</h3>
          <p>{stats.ticketsSold}</p>
        </div>

        <div className="stat-card">
          <h3>Revenue</h3>
          <p>₹{stats.revenue}</p>
        </div>
      </div>

      <button
        className="register-btn"
        onClick={() =>
          navigate("/create-event")
        }
      >
        + Create Event
      </button>

      <h2>My Events</h2>

      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <div className="events-grid">
          {events.map((event, index) => (
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
                <strong>Category:</strong>{" "}
                {event.category}
              </p>

              <p>📍 {event.venue}</p>

              <p>📅 {event.date}</p>

              <p>🕒 {event.time}</p>

              <p>
                👤 {event.age}+ Years
              </p>

              <p className="event-description">
                {event.description}
              </p>

              <p>
                🎟️ Sold: {event.ticketsSold}
              </p>

              <p>
                🪑 Remaining:
                {" "}
                {event.capacity - event.ticketsSold}
              </p>

              <p>
                💰 Revenue:
                ₹
                {event.price *
                  (event.ticketsSold || 0)}
              </p>

              <p className="price">
                ₹ {event.price}
              </p>

              <button
                className="edit-btn"
                onClick={() =>
                  navigate(`/create-event/${event.id}`)
                }
              >
                Edit Event
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  const confirmDelete =
                    window.confirm(
                      "Are you sure you want to delete this event?"
                    );

                  if (confirmDelete) {
                    handleDeleteEvent(event.id);
                  }
                }}
              >
                Delete Event
              </button>
            </div>
          ))}
        </div>
      )}

        <h2>Recent Bookings</h2>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="event-card"
            >
              <h3>{booking.eventTitle}</h3>

              <p>
                👤 {booking.userName}
              </p>

              <p>
                📧 {booking.userEmail}
              </p>

              <p>
                🎟️ {booking.quantity} Ticket(s)
              </p>

              <p>
                ₹{booking.totalPrice}
              </p>
            </div>
          ))}
    </div>
  );
}

export default OrganizerDashboard;