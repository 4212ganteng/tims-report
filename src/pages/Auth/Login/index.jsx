import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../../../config/api";
import { userContext } from "../../../context/userContext";

const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = React.useState(null);
  const [user, dispatch] = React.useContext(userContext);

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = useMutation(async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/timses/login", form);

      localStorage.setItem("token", data.data.token);
      navigate("/");
      dispatch({
        type: "LOGIN",
      });

      setMessage("");
    } catch (error) {
      console.log(error);
      setMessage("Email atau password salah");
    }
  });

  return (
    <div className="h-screen max-w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 backdrop-blur">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-cyan-500 pb-4">LOGIN</h1>
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={(e) => handleLogin.mutate(e)}
          >
            <span className="text-red-500 ease-in-out transition">
              {message}
            </span>
            <input
              type="text"
              placeholder="Email"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25 mb-6"
              name="password"
              onChange={handleChange}
            />
            <Button
              title="Login"
              variant="primary"
              isLoading={handleLogin.isLoading}
            />
            <span className="mt-4 text-white">
              tidak memliki akun ?{" "}
              <Link to="/register" className="text-blue-800 cursor-pointer">
                register disini
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
