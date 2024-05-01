import api from "../utils/api";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import useFlashMessage from "../hooks/useFlashMessage";

const Like = ({ pet }) => {
  const [user, setUser] = useState({});
  const [color, setColor] = useState("text-white");
  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  // Loading data in form
  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  async function handleLike(id) {

    let msgType = "bg-green-600";

    const data = await api
      .get(`/pets/like/${id}`, {
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
  }

  function loginError() {
    let msgType = "bg-red-600";
    let msgText = "Você deve fazer o login para curtir o Pet.";
    setMessage(msgText, msgType);
  }

  return (
    <>
      {!token ? (
        <div className="text-center">
          <FaHeart
            className="w-7 h-7 text-white cursor-pointer"
            onClick={loginError}
          />
          <p className="">{pet.likes.length}</p>
        </div>
      ) : (
        <>
          {pet.likes && (
            <div className="text-center">
              {pet.likes.includes(user._id) ? (
                <FaHeart className={`w-7 h-7 text-red-500`} />
              ) : (
                <FaHeart
                  onClick={() => handleLike(pet._id)}
                  className="w-7 h-7 text-white cursor-pointer"
                />
              )}
              <p className="text-white">{pet.likes.length}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Like;
