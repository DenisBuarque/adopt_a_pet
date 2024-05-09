import api from "../utils/api";
import { useState, useEffect } from "react";
import { HiMiniHandThumbUp } from "react-icons/hi2";
import useFlashMessage from "../hooks/useFlashMessage";

const Like = ({ pet }) => {
  const [user, setUser] = useState({});
  const [totalLikes, setTotalLikes] = useState(0);
  const [color, setColor] = useState("text-black");
  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  useEffect(() => {
    if (token) {
      (async () => {
        await api
          .get("/users/checkuser", {
            headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
            },
          })
          .then((response) => {
            setUser(response.data);
          });
      })();
    }

    setTotalLikes(pet.likes.length);

    return () => {
      setUser({});
      setTotalLikes(0)
    };
  }, [token, pet.likes.length]);

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
    setColor("text-red-500");
    setTotalLikes(totalLikes + 1);
  }

  function loginError() {
    let msgType = "bg-red-600";
    let msgText = "Você deve fazer o login para curtir o Pet.";
    setMessage(msgText, msgType);
  }

  return (
    <>
      {!token ? (
        <div className="flex items-center">
          <HiMiniHandThumbUp
            className="w-7 h-7 text-black cursor-pointer"
            onClick={loginError}
          />
          <p className="text-black ml-3">{totalLikes} like(s)</p>
        </div>
      ) : (
        <>
          {pet.likes && user && (
            <div className="flex items-center">
              {pet.likes.includes(user._id) ? (
                <HiMiniHandThumbUp className={`w-7 h-7 text-red-500`} />
              ) : (
                <HiMiniHandThumbUp
                  onClick={() => handleLike(pet._id)}
                  className={`w-7 h-7 cursor-pointer ${color}`}
                />
              )}
              <p className="text-black ml-3">{totalLikes} like(s)</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Like;
