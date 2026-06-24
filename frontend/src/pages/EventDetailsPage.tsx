import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<any>(null);

  const [quantity, setQuantity] = useState(1);

  const [showBooking, setShowBooking] =
    useState(false);

    useEffect(() => {
      fetch("http://localhost:8000/events")
        .then((response) =>
          response.json()
        )
        .then((events) => {
          const foundEvent = events.find(
            (event: any) =>
              String(event.id) === String(id)
          );

          setEvent(foundEvent);
        });
    }, [id]);

  if (!event) {
    return (
      <div className="page">
        <Navbar />
        <h2>Event not found</h2>
      </div>
    );
  }

  const remainingSeats =
    event.capacity - event.ticketsSold;

  const totalPrice =
    quantity * event.price;

  const handleBooking = async () => {

    const user = JSON.parse(
      localStorage.getItem("user") || "null"
    );

    if (!user) {
      alert(
        "Please login to book tickets"
      );

      navigate("/login");

      return;
    }

    if (quantity > remainingSeats) {
      alert(
        "Not enough seats available"
      );
      return;
    }

    const confirmBooking =
      window.confirm(
        `You are booking ${quantity} ticket(s)

  Total Price: ₹${totalPrice}

  Confirm Booking?`
        );

      if (!confirmBooking) {
        return;
      }

  try {
    await fetch(
      "http://localhost:8000/bookings",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          eventId: event.id,
          eventTitle: event.title,
          quantity,
          totalPrice,
          userName: user.name,
          userEmail: user.email,
        }),
      }
    );

    await fetch(
      `http://localhost:8000/events/${event.id}/tickets`,
      {
        method: "PUT",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          quantity,
        }),
      }
    );

    alert(
      "Tickets booked successfully!"
    );

    navigate("/my-bookings");
  } catch (error) {
    console.error(error);

    alert("Booking failed");
  }
  };

  return (
    <div className="page">
      <Navbar />

      <div className="register-container">
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
          onError={(e) => {
            e.currentTarget.src =
              "https://placehold.co/600x400?text=Event";
          }}
        />

        <h1>{event.title}</h1>

        <p>
          <strong>Category:</strong>{" "}
          {event.category}
        </p>

        <p>{event.description}</p>

        <p>📍 {event.venue}</p>

        <p>📅 {event.date}</p>

        <p>🕒 {event.time}</p>

        <p>
          👤 {event.age}+ Years
        </p>

        <p>
          🎟️ Tickets Sold:{" "}
          {event.ticketsSold}
        </p>

        <p>
          🪑 Remaining Seats:{" "}
          {remainingSeats}
        </p>

        <h2>₹ {event.price}</h2>

        {remainingSeats === 0 ? (
          <button
            className="delete-btn"
            disabled
          >
            Sold Out
          </button>
        ) : !showBooking ? (
          <button
            className="register-btn"
            onClick={() =>
              setShowBooking(true)
            }
          >
            Book Ticket
          </button>
        ) : (
          <>
          <h3>Select Quantity</h3>

          <div className="quantity-selector">
            <button
              type="button"
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                }
              }}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => {
                if (
                  quantity < remainingSeats
                ) {
                  setQuantity(quantity + 1);
                }
              }}
            >
              +
            </button>
          </div>

          <p className="booking-info">
            You are booking {quantity} ticket
            {quantity > 1 ? "s" : ""}
          </p>

          <h3>
            Total: ₹{totalPrice}
          </h3>

            <button
              className="register-btn"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EventDetailsPage;