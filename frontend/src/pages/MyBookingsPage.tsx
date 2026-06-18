import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function MyBookingsPage() {
  const [bookings, setBookings] =
    useState<any[]>([]);

  useEffect(() => {
    const storedBookings =
      JSON.parse(
        localStorage.getItem(
          "bookings"
        ) || "[]"
      );

    setBookings(storedBookings);
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
                <img
                  src={
                    booking.eventImage
                  }
                  alt={
                    booking.eventTitle
                  }
                  className="event-image"
                />

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
                    booking.totalAmount
                  }
                </p>

                <p>
                  📅 Booked On:
                  {" "}
                  {
                    booking.bookingDate
                  }
                </p>

                <p>
                  ✅ Confirmed
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default MyBookingsPage;