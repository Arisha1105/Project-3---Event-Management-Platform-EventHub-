const db = require("./db");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  db.query(
    "SELECT * FROM events",
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json(results);
    }
  );
});

app.post("/events", (req, res) => {
  const {
    title,
    description,
    category,
    venue,
    date,
    time,
    age,
    price,
    image,
    capacity,
  } = req.body;

  const sql = `
    INSERT INTO events
    (
      title,
      description,
      category,
      venue,
      date,
      time,
      age,
      price,
      image,
      capacity,
      ticketsSold
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  db.query(
    sql,
    [
      title,
      description,
      category,
      venue,
      date,
      time,
      age,
      price,
      image,
      capacity,
    ],
    (err, result) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.status(201).json({
        message:
          "Event created successfully",
        id: result.insertId,
      });
    }
  );
});

app.delete("/events/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM events WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res
          .status(500)
          .json(err);
      }

      res.json({
        message:
          "Event deleted successfully",
      });
    }
  );
});

app.put("/events/:id", (req, res) => {
  const id = req.params.id;

  const {
    title,
    description,
    category,
    venue,
    date,
    time,
    age,
    price,
    image,
    capacity,
  } = req.body;

  const sql = `
    UPDATE events
    SET
      title = ?,
      description = ?,
      category = ?,
      venue = ?,
      date = ?,
      time = ?,
      age = ?,
      price = ?,
      image = ?,
      capacity = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      title,
      description,
      category,
      venue,
      date,
      time,
      age,
      price,
      image,
      capacity,
      id,
    ],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json({
        message:
          "Event updated successfully",
      });
    }
  );
});

app.listen(8000, () => {
  console.log("Listening on 8000");
});