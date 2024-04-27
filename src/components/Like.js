import api from '../utils/api';
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Like = ({ pet, handleLike }) => {
  const [color, setColor] = useState("text-white");
  const [userId, setUserId] = useState(pet.user._id);
  const [petId, setPetId] = useState(pet._id);

  const [token] = useState(localStorage.getItem('token') || "");

  async function like(e) {
    e.preventDefault();

    let msgType = "bg-green-600";

    const formData = new FormData();
    formData.append("userId", userId);
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

    setColor("text-red-500");
  }

  return (
    <>
      <form onSubmit={like}>
        <button type="submit">
          <FaHeart className={`w-7 h-7 mb-3 ${color}`} />
        </button>
      </form>
    </>
  );
};

export default Like;
