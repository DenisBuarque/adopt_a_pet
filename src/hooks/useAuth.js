import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const { setMessage } = useFlashMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
    }
  }, []);

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

  async function authUser(data) {
    setAuthenticated(true);

    localStorage.setItem("token", JSON.stringify(data.token));

    navigate("/");
  }

  return { register, authenticated };
};

export default useAuth;
