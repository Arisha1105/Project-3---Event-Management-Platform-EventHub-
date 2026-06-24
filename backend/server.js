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
      // if (err) {
      //   console.log(err);

      //   return res
      //     .status(500)
      //     .json(err);
      // }

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

app.post("/bookings", (req, res) => {
  const {
    eventId,
    eventTitle,
    quantity,
    totalPrice,
    userName,
    userEmail,
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (
      eventId,
      eventTitle,
      quantity,
      totalPrice,
      userName,
      userEmail
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      eventId,
      eventTitle,
      quantity,
      totalPrice,
      userName,
      userEmail,
    ],
    (err) => {
      // if (err) {
      //   console.log(err);

      //   return res
      //     .status(500)
      //     .json(err);
      // }

      res.json({
        message:
          "Booking successful",
      });
    }
  );
});

app.get("/bookings", (req, res) => {
  db.query(
    "SELECT * FROM bookings ORDER BY bookingDate DESC",
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

app.put(
  "/events/:id/tickets",
  (req, res) => {
    const id = req.params.id;

    const { quantity } = req.body;

    const sql = `
      UPDATE events
      SET ticketsSold =
      ticketsSold + ?
      WHERE id = ?
    `;

    db.query(
      sql,
      [quantity, id],
      (err) => {
        if (err) {
          return res
            .status(500)
            .json(err);
        }

        res.json({
          message:
            "Tickets updated",
        });
      }
    );
  }
);

app.post("/login", (req, res) => {
  const {
    email,
    password,
  } = req.body;

  const sql =
    "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(
    sql,
    [email, password],
    (err, results) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      if (results.length === 0) {
        return res
          .status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

      res.json({
        message:
          "Login successful",
        user: results[0],
      });
    }
  );
});

app.post("/register", (req, res) => {
  const {
    name,
    email,
    phone,
    dob,
    password,
    role,
    organizationName,
  } = req.body;

  const sql = `
    INSERT INTO users
    (
      name,
      email,
      password,
      role,
      phone,
      organizationName,
      dob
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      name,
      email,
      password,
      role,
      phone,
      organizationName,
      dob,
    ],
    (err, result) => {
      // if (err) {
      //   console.log(err);

      //   return res.status(500).json({
      //     message: "Registration failed",
      //   });
      // }

      res.status(201).json({
        message: "User registered successfully",
      });
    }
  );
});

app.delete("/bookings/:id", (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM bookings WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Booking cancelled",
      });
    }
  );
});

app.put("/events/:id/cancel-tickets", (req, res) => {
  const id = req.params.id;

  const { quantity } = req.body;

  const sql = `
    UPDATE events
    SET ticketsSold =
    ticketsSold - ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [quantity, id],
    (err) => {
      if (err) {
        return res
          .status(500)
          .json(err);
      }

      res.json({
        message:
          "Tickets restored",
      });
    }
  );
});

app.listen(8000, () => {
  console.log("Listening on 8000");
});