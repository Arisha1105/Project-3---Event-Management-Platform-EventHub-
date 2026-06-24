import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const handleLogout = () => {
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const location = useLocation();

  const hideAuth =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <nav className="navbar">
      <h2 className="logo">
        EventHub
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {!user && (
          <>
            <Link to="/events">
              Events
            </Link>

            <Link to="/login">
              Login
            </Link>
          </>
        )}

        {user?.role === "organizer" && (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "user" && (
          <>
            <Link to="/events">
              Events
            </Link>

            <Link to="/my-bookings">
              My Bookings
            </Link>

            <Link to="/profile">
              Profile
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;