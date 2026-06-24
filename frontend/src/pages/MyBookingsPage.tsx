import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function MyBookingsPage() {
  const [bookings, setBookings] =
    useState<any[]>([]);

  const handleCancelBooking = async (
    booking: any
  ) => {
    const confirmCancel =
      window.confirm(
        "Cancel this booking?"
      );

    if (!confirmCancel) return;

    try {

      await fetch(
        `http://localhost:8000/events/${booking.eventId}/cancel-tickets`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            quantity:
              booking.quantity,
          }),
        }
      );

      await fetch(
        `http://localhost:8000/bookings/${booking.id}`,
        {
          method: "DELETE",
        }
      );

      setBookings(
        bookings.filter(
          (b) => b.id !== booking.id
        )
      );

      alert(
        "Booking cancelled"
      );

    } catch (error) {
      console.error(error);
    }
  };
    
  useEffect(() => {
    fetch("http://localhost:8000/bookings")
      .then((response) =>
        response.json()
      )
      .then((data) => {
        setBookings(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="page">
      <Navbar />

      <h1>My Bookings 🎟️</h1>

      {bookings.length === 0 ? (
        <p>
          No bookings yet.
        </p>
      ) : (
        <div className="events-grid">
          {bookings.map(
            (booking) => (
              <div
                className="event-card"
                key={booking.id}
              >

              <div className="event-image-placeholder">
                🎟️ Event Booking
              </div>

                <h3>
                  {
                    booking.eventTitle
                  }
                </h3>

                <p>
                  🎟️ Tickets:
                  {" "}
                  {
                    booking.quantity
                  }
                </p>

                <p>
                  💰 Amount:
                  ₹
                  {
                    booking.totalPrice
                  }
                </p>

                <p>
                  📅 Booked On:
                  {" "}
                  {
                      new Date(
                        booking.bookingDate
                      ).toLocaleDateString()
                  }
                </p>

                <p>
                  ✅ Confirmed
                </p>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleCancelBooking(booking)
                  }
                >
                  Cancel Booking
                </button>

              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyBookingsPage;