const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let events = [
  {
    id: 1,
    title: "AI Workshop",
    category: "Technology",
    venue: "Mumbai",
    date: "2026-07-15",
    time: "10:00",
    age: 18,
    description:
      "Learn AI and Machine Learning fundamentals.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    price: 500,
    capacity: 100,
    ticketsSold: 20,
  },

  {
    id: 2,
    title: "Music Festival",
    category: "Music",
    venue: "Pune",
    date: "2026-08-01",
    time: "18:00",
    age: 16,
    description:
      "An evening of live performances and entertainment.",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    price: 1200,
    capacity: 300,
    ticketsSold: 150,
  }
];
  
app.get("/", (req, res) => {
  res.send("EventHub Backend Running 🚀");
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  const newEvent = {
    id: Date.now(),
    ...req.body,
    ticketsSold: 0,
  };

  events.push(newEvent);

  res.status(201).json({
    message: "Event created successfully",
    event: newEvent,
  });
});

app.delete("/events/:id", (req, res) => {
  const id = Number(req.params.id);

  events = events.filter(
    (event) => event.id !== id
  );

  res.json({
    message: "Event deleted successfully",
  });
});

app.put("/events/:id", (req, res) => {
  const id = Number(req.params.id);

  events = events.map((event) =>
    event.id === id
      ? {
          ...event,
          ...req.body,
        }
      : event
  );

  res.json({
    message: "Event updated successfully",
  });
});

app.listen(8000, () => {
  console.log("Listening on 8000");
});