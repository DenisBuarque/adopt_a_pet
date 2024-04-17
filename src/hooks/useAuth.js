import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {

    async function register(user) {
        try {
            const data = await api.post('/users/store', user).then((response) => {
                return response.data;
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    return { register };
}

export default useAuth;