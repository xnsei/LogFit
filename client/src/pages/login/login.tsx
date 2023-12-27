import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import baseURL from "../../../links";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage.tsx";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (_email: string, _password: string) => {
    try {
      const response = await axios.post(`${baseURL}/users/login`, {
        email: _email,
        password: _password,
      });
      if (response.status === 200) {
        console.log(response)
        setError(false);
        console.log(response.data);
        const token = response.data.token;
        if (token) {
          localStorage.setItem("token", token);
          toast.success("Login Successful!");
          navigate("/");
        } else {
          setError(true);
          toast.error("Invalid Credentials!");
        }
      } else {
        setError(true);
        toast.error("Invalid Credentials!");
      }
    } catch (error) {
      setError(true);
      toast.error(`Login Failed: ${error.response?.data?.message || error.response?.data?.messaeg}`);
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginUser(email, password);
  };

  const handleNavigate = (e: any) => {
    e.preventDefault();
    navigate("/register");
  };

  const testLogin = (e: any) => {
    e.preventDefault();
    loginUser("admin2@admin.com", "admin2@admin.com");
  }

  return (
    <main className="grid gird-cols-1 sm:grid-cols-2 justify-center items-center">
      <WelcomeMessage />
      <div className="sm:h-screen flex justify-center items-center">
        <div className="mx-auto w-fit text-center">
          <h2 className="text-3xl mb-4 font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </form>
          {error && <p className="text-red-400 text-lg mt-4">Please enter valid credentials</p>}
          <div className="mt-4 cursor-pointer">
            <p className="text-lg">New to LogFit?</p>
            <a className="text-indigo-600 text-lg hover:underline" onClick={handleNavigate}>
              Create new account
            </a>
          </div>
          <div>
            <p className="text-lg">or</p>
            <button onClick={testLogin} className="bg-muted-foreground text-white mt-2 px-4 py-2 rounded no-underline">
              Login with test credentials
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
