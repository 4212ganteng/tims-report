import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API, setAuthToken } from "./config/api";
import { userContext } from "./context/userContext";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/home";

function App() {
  const [state, dispatch] = useContext(userContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    } else {
      dispatch({ type: "LOGOUT" }); // Pastikan state isLogin selalu false jika tidak ada token
    }

    if (state.isLogin) {
      navigate("/");
    }
  }, [state.isLogin, navigate, dispatch]);

  const checkUser = async () => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.getItem("token"));
      }
      const response = await API.get("/timses/cekauth");

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
