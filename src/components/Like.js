import api from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useFlashMessage from "../hooks/useFlashMessage";

const Like = ({ pet }) => {
  const [color, setColor] = useState("text-white");
  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  function handleLike(id) {

    const data = api
      .patch(`/pets/like/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        //msgType = "bg-red-600";
        //return error.response.data;
      });

    /*let msgType = "bg-green-600";

    const dataLike = {
      usuario: pet.user._id,
      animal: pet._id,
    };

    const data = await api
      .post(`/pets/like`, dataLike, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "bg-red-600";
        return error.response.data;
      });

    setMessage(data.message, msgType);

    setColor("text-red-500");*/
  }

  function loginError() {
    let msgType = "bg-red-600";
    let msgText = "Você deve fazer o login para curtir o Pet.";
    setMessage(msgText, msgType);
  }

  return (
    <>
      {!token ? (
        <Link onClick={loginError}>
          <FaHeart className={`w-7 h-7 mb-3 text-white`} />
        </Link>
      ) : (
        <Link onClick={() => handleLike(pet.user._id)}>
          <FaHeart className={`w-7 h-7 mb-3 text-white`} />
        </Link>
      )}
    </>
  );
};

export default Like;
