import api from "../utils/api";
import { useState, useEffect } from "react";
import { HiMiniHandThumbUp } from "react-icons/hi2";
import useFlashMessage from "../hooks/useFlashMessage";

const Like = ({ pet }) => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

  const [liked, setLiked] = useState(false);

  const [countLike, setCountLike] = useState(pet.likes.length);

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

    return () => {
      setUser({});
    };
  }, [token]);

  const toogleLike = async (id) => {
    setLiked(!liked);
    setCountLike(countLike + 1);

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
        console.log(error.response.data);
      });
  };

  const loginLiked = () => {
    let msgType = "bg-red-600";
    let msgText = "Você deve fazer o login para curtir o Pet.";
    setMessage(msgText, msgType);
    setLiked(false);
  };

  return (
    <div className="w-full flex justify-between p-2">
      <div className="flex items-center">
        {!token && (
          <HiMiniHandThumbUp
            className="w-7 h-7 text-black cursor-pointer"
            onClick={loginLiked}
          />
        )}

        {token && (
          <>
            {pet.likes && user && (
              <>
                {pet.likes.includes(user._id) ? (
                  <HiMiniHandThumbUp
                    className="w-7 h-7 text-red-500"
                    title="Curtido"
                  />
                ) : (
                  <>
                    {liked ? (
                      <HiMiniHandThumbUp
                        className="w-7 h-7 text-red-500"
                        title="Curtido"
                      />
                    ) : (
                      <HiMiniHandThumbUp
                        className="w-7 h-7 text-black cursor-pointer"
                        onClick={() => toogleLike(pet._id)}
                        title="Curtir"
                      />
                    )}
                  </>
                )}
              </>
            )}
          </>
        )}

        <p className="text-black ml-3">{countLike}</p>
      </div>

      <div>
        {pet.available ? (
          <small className="bg-green-500 text-white px-3 py-1 text-sm rounded-full">
            Para adoção
          </small>
        ) : (
          <small className="bg-red-500 text-white px-3 py-1 text-sm rounded-full">
            Adoção concluída
          </small>
        )}
      </div>
    </div>
  );
};

export default Like;
