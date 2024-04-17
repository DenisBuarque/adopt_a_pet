import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFlashMessage from "./useFlashMessage";

const useAuth = () => {

    const { setMessage } = useFlashMessage();

    async function register(user) {

        let msgText = "Cadastro realizado com sucesso!";
        let msgType = "bg-green-600";

        try {
            const data = await api.post('/users/store', user).then((response) => {
                return response.data;
            });
            console.log(data);
        } catch (error) {
            msgText = error.response.data.message;
            msgType = "bg-red-600";
        }

        setMessage(msgText, msgType);
    }

    return { register };
}

export default useAuth;