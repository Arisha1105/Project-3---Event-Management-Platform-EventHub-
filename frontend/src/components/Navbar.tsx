import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">EventHub</h2>

      <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/login">Login</Link>
          <Link to="/my-bookings">My Bookings</Link>
      </div>
    </nav>
  );
}

export default Navbar;