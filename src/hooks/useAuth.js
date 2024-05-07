import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { setMessage } = useFlashMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    navigate("/");
  }

  async function register(user) {
    let msgText = "Cadastro realizado com sucesso!";
    let msgType = "bg-green-600";

    try {
      const data = await api.post("/users/store", user).then((response) => {
        return response.data;
      });
      await authUser(data);
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "bg-red-600";
    }

    setMessage(msgText, msgType);
  }

  function logout () {
    const msgText = "Logout realizado com sucesso!";
    const msgType = "bg-green-600";

    setAuthenticated(false);
    localStorage.removeItem('token');
    api.defaults.headers.Authorization = undefined;

    navigate('/');

    setMessage(msgText, msgType);
  }

  async function login (user) {

    let msgText = "Login realizado com sucesso";
    let msgType = "bg-green-600";

    try {

      const data = await api.post('/users/login', user).then((response) => {
        return response.data;
      });

      await authUser(data);
      
    } catch (error) {
      msgText = error.response.data.message;
      msgType = "bg-red-500";
    }

    setMessage(msgText, msgType);
  }

  return { register, authenticated, logout, login };
};

export default useAuth;
