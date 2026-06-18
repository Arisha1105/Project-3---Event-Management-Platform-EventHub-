import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import CreateEventPage from "./pages/CreateEventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyBookingsPage from "./pages/MyBookingsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/events"
          element={<EventsPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

      <Route
        path="/register"
        element={<RegisterPage />}
      />
      <Route
        path="/dashboard"
        element={<OrganizerDashboard />}
      />
      <Route
        path="/create-event"
        element={<CreateEventPage />}
      />

      <Route
        path="/create-event/:id"
        element={<CreateEventPage />}
      />

      <Route
        path="/events/:id"
        element={<EventDetailsPage />}
      />

      <Route
        path="/my-bookings"
        element={<MyBookingsPage />}
      />

      </Routes>

    </BrowserRouter>
  );
}

export default App;