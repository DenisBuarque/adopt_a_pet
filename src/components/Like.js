import api from "../utils/api";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useFlashMessage from "../hooks/useFlashMessage";

const Like = ({ pet }) => {
  const [color, setColor] = useState("text-white");
  const [petId, setPetId] = useState(pet._id || "");

  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  async function handleLike(e) {
    e.preventDefault();

    let msgType = "bg-green-600";

    const formData = new FormData();
    formData.append("petId", petId);

    const data = await api
      .post(`/pets/like`, formData, {
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
    setColor("text-red-500");
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
        <form onSubmit={handleLike}>
          <input type="hidden" name="petId" value={petId} onChange={(e) => setPetId(e.target.value)} />
          <button type="submit">
            <FaHeart className={`w-7 h-7 mb-3 text-white`} />
          </button>
        </form>
      )}
    </>
  );
};

export default Like;
