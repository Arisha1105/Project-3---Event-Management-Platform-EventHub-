type EventCardProps = {
  title: string;
  location: string;
  price: number;
};

function EventCard(props: EventCardProps) {
  return (
    <div className="event-card">
      <div className="event-badge">
        Event
      </div>

      <h3>{props.title}</h3>

      <p>{props.location}</p>

      <p className="price">
        ₹{props.price}
      </p>

      <button className="book-btn">
        View Details
      </button>
    </div>
  );
}

export default EventCard;