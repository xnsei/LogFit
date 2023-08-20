import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/users/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        setError(false);
        console.log(response.data);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        alert("Login Successfull!");
        navigate("/");
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginUser();
  };

  const handleNavigate = (e: any) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <p className="error-message">{error && "Invalid Credentials"}</p>
        <div className="login-links">
          <a className="login-link" onClick={handleNavigate}>
            Create an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
