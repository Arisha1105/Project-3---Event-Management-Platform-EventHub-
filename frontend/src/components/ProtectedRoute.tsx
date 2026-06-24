import { Navigate } from "react-router-dom";

function ProtectedRoute({
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

  return children;
}

export default ProtectedRoute;