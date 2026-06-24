import Navbar from "../components/Navbar";

function ProfilePage() {
  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div className="page">
      <Navbar />

      <div className="register-container">
        <h1>My Profile</h1>

        <p>
          <strong>Name:</strong>{" "}
          {user?.name}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {user?.phone}
        </p>

        <p>
          <strong>DOB:</strong>{" "}
          {user?.dob}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user?.role}
        </p>

        {user?.organizationName && (
          <p>
            <strong>
              Organization:
            </strong>{" "}
            {
              user.organizationName
            }
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;