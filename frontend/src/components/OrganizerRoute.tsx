import { Navigate } from "react-router-dom";

function OrganizerRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "organizer") {
    return <Navigate to="/" />;
  }

  return children;
}

export default OrganizerRoute;