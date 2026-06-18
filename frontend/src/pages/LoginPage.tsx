import { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

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

    if (password.trim() === "") {
      setSuccess("");
      setError("Password is required");
      return;
    }

    setError("");

    setSuccess("Login successful!");
  };

  return (
    <div className="page">
      <Navbar />

      <div className="register-container">
        <h1>Login</h1>

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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

         <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? ( <FaEyeSlash />) : (<FaEye />)}
            </button>
          </div>

        <div className="login-options">
          <label className="remember-me">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(!rememberMe)
              }
            />
            Remember Me
          </label>

          <p className="forgot-password">
            Forgot Password?
          </p>
        </div>

        <button
          type="submit"
          className="register-btn"
        >
          Login
        </button>
             
        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/register">Sign Up</Link>
        </p>

        </form>
      </div>
    </div>
  );
}

export default LoginPage;