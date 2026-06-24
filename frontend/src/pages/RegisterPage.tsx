import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (name.trim() === "") {
            setSuccess("");
            setError("Name is required");
            return;
        }

        if (email.trim() === "") {
            setSuccess("");
            setError("Email is required");
            return;
        }

        if (!email.includes("@")) {
            setSuccess("");
            setError("Enter a valid email");
            return;
        }

        if (phone.length !== 10) {
            setSuccess("");
            setError("Phone number must be 10 digits");
            return;
        }

        if (role === "") {
            setSuccess("");
            setError("Please select a role");
            return;
        }

        if (
            role === "Organizer" &&
            organizationName.trim() === ""
        ) {
            setSuccess("");
            setError("Organization Name is required");
            return;
        }

        if (password.length < 8) {
            setSuccess("");
            setError(
            "Password must be at least 8 characters"
            );
            return;
        }

        if (password !== confirmPassword) {
            setSuccess("");
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(
            "http://localhost:8000/register",
            {
            method: "POST",

            headers: {
                "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
                name,
                email,
                phone,
                dob,
                password,
                role:
                    role === "Organizer"
                        ? "organizer"
                        : "user",
                organizationName,
            }),
            }
        );

            const data =
                await response.json();

            // console.log(data);

            if (!response.ok) {
                setSuccess("");
                setError(data.message);
            return;
}

            setError("");

            setSuccess(
                "Account created successfully!"
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

            } catch (error) {
            console.error(error);

            setSuccess("");

            setError(
                "Registration failed"
            );
            }
        };

    return (
    <div className="page">
      <Navbar />

      <div className="register-container">
        <h1>Create Account</h1>

        <form className="register-form"
            onSubmit={handleSubmit}
        >
            
          {error && (
            <p className="error-message">
                {error}
                </p>
          )}   

         {success && (
            <p className="success-message">
                {success}
            </p>
         )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}            
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type={dob ? "date" : "text"}
            placeholder="Date of Birth"
            value={dob}
            onFocus={(e) => {
                e.target.type = "date";
            }}
            onChange={(e) => setDob(e.target.value)}
          />

          <div className="password-container">
            <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="button"
                onClick={() =>
                setShowPassword(!showPassword)
                }
            >
                 {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            </div>

            <div className="password-container">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    type="button"
                    onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                    }
                >
                     {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>

            <div className="role-section">
                <p>Select Role</p>

                <label>
                    <input
                    type="radio"
                    value="Attendee"
                    checked={role === "Attendee"}
                    onChange={(e) => setRole(e.target.value)}
                    />
                    Attendee
                </label>

                <label>
                    <input
                    type="radio"
                    value="Organizer"
                    checked={role === "Organizer"}
                    onChange={(e) => setRole(e.target.value)}
                    />
                    Organizer
                </label>
                </div>

            {role === "Organizer" && (
            <input
                type="text"
                placeholder="Organization Name"
                value={organizationName}
                onChange={(e) =>
                setOrganizationName(e.target.value)
                }
            />
            )}

          <button type="submit"
                  className="register-btn">
            Create Account
          </button>

        <p className="auth-switch">
            Already have an account?{" "}
           <Link to="/login">Login</Link>
        </p>

        </form>
        {/* <p>Role: {role}</p> */}
      </div>
    </div>
  );
}

export default RegisterPage;
