import React, { useState } from "react";
import "./register.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post("http://localhost:8000/users/new", {
        username: username,
        email: email,
        password: password,
      });
      if (response.status === 200) {
        console.log(response.data);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
        }
        alert("Registration Successfull!");
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
    registerUser();
  };

  const handleNavigate = (e: any) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h2 className="registration-heading">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="registration-input"
            type="text"
            name="username"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <input
            className="registration-input"
            type="email"
            name="email"
            placeholder="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="registration-input"
            type="password"
            name="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button className="registration-button" type="submit">
            Register
          </button>
        </form>
        <p className="error-message">{error && "Email already exists"}</p>
        <div className="registration-links">
          <p>Already have an account?</p>
          <a className="registration-link" onClick={handleNavigate}>
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
