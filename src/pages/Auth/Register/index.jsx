import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API } from "../../../config/api";
import { userContext } from "../../../context/userContext";

const Register = () => {
  const navigate = useNavigate();

  const [message, setMessage] = React.useState(null);
  const [user, dispatch] = React.useContext(userContext);
  const [datakecamatan, setDataKecamatan] = React.useState([]);

  const [form, setForm] = React.useState({});

  React.useEffect(() => {
    getKecamatan.mutate();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = useMutation(async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/timses/register", form);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  });

  const getKecamatan = useMutation(async () => {
    try {
      const { data } = await API.get("/kecamatan/findall");

      setDataKecamatan(data.data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="h-screen max-w-full bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 backdrop-blur">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center bg-white/10 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-cyan-500 pb-4">Register</h1>
          <form
            className="flex flex-col items-center justify-center w-full h-full"
            onSubmit={(e) => handleRegister.mutate(e)}
          >
            <span className="text-red-500 ease-in-out transition">
              {message}
            </span>
            <input
              type="text"
              placeholder="Name"
              className="w-80 h-10 px-2 my-4 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25"
              name="nama"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25 mb-6"
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
            <input
              type="text"
              placeholder="No Telp"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25 mb-6"
              name="wa"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Desa"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25 mb-6"
              name="desa"
              onChange={handleChange}
            />
            {/* <select
              name="kecamatan"
              className="w-80 h-10 px-2 my-2 shadow rounded-lg focus:outline-none focus:border-blue-500 bg-white/25 mb-6"
              onChange={handleChange}
            >
              <option value="">Pilih Kecamatan</option>
              {datakecamatan.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.nama}
                </option>
              ))}
            </select> */}
            <Button
              title="Register"
              variant="primary"
              isLoading={handleRegister.isLoading}
            />
            <span className="mt-4 text-white">
              sudah memiliki akun ?{" "}
              <Link to="/login" className="text-blue-800 cursor-pointer">
                login disini
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
