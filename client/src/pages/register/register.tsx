import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../links";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage.tsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post(`${baseURL}/users/new`, {
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
    <div className="grid gird-cols-1 sm:grid-cols-2 flex justify-center items-center">
      <WelcomeMessage />
      <div className="sm:h-screen flex justify-center items-center">
        <div className="mx-auto w-fit text-center">
          <h2 className="text-3xl mb-4 font-bold">Create new Account</h2>
          <form onSubmit={handleSubmit}>
            <input
              className="rounded mb-4 w-64 lg:w-96 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              type="text"
              name="username"
              placeholder="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <input
              className="rounded mb-4 w-64 lg:w-96 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              type="email"
              name="email"
              placeholder="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              className="rounded mb-4 w-64 lg:w-96 h-10 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black"
              type="password"
              name="password"
              placeholder="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button className="bg-indigo-600 w-24 h-10 text-white mt-2 px-4 py-2 rounded no-underline" type="submit">
              Register
            </button>
          </form>
          {error && <p className="text-red-400 text-lg mt-4">Email already exists!</p>}
          <div className="mt-4">
            <p className="text-lg">Already have an account?</p>
            <a className="text-indigo-600 cursor-pointer text-lg hover:underline" onClick={handleNavigate}>
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
