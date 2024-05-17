import api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";
import AvailableVisit from "../components/AvailableVisit";
import Like from "../components/Like";

const PetShow = () => {
  const { id } = useParams();

  const [pet, setPet] = useState({});
  const { setMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }
  }, [token]);

  useEffect(() => {
    (async () => {
      await api
        .get(`/pets/detail/${id}`)
        .then((response) => {
          setPet(response.data.pet);
        })
        .catch((error) => {
          console.log(error.data);
        });

      setLoading(false);
    })();

    return () => {
      setPet({});
    };
  }, [id]);

  async function schedule() {
    let msgType = "bg-green-600";

    const data = await api
      .patch(`/pets/schedule/${pet._id}`, {
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="max-w-xl m-auto mb-10">
      <h1 className="text-2xl font-semibold mb-1">
        Pet <span className="text-red-600">{pet.name}</span>
      </h1>
      <p className="mb-5">
        Se tiver interrese, agende uma visita para conhecê-lo.
      </p>

      <div className="grid grid-cols-3 gap-4 mt-3">
        {pet.images &&
          pet.images.map((image, index) => (
            <div key={index}>
              <img
                src={process.env.REACT_APP_API + `/assets/pets/` + image}
                alt={pet.name}
                loading="eager"
              />
            </div>
          ))}
      </div>

      <div className="w-full flex justify-between p-2">
        <Like pet={pet} />
      </div>

      <div className="border p-4 rounded-md">
        <div className="flex items-center">
          {pet.user.image && pet.user.image !== undefined && (
            <div className="flex-none w-10 h-10 rounded-full mr-2">
              <img
                src={`${process.env.REACT_APP_API}/assets/users/${pet.user.image}`}
                className="w-full h-full rounded-full"
                alt={pet.user.name}
              />
            </div>
          )}
          <div>
            <span className="block text-gray-900">{pet.user.name}</span>
            <span className="flex items-center text-gray-400 text-sm">
              Falar com:
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-3">Caracteristicas do Pet</h2>
        <p>Nome: {pet.name}</p>
        <p>Idade: {pet.age} ano(s)</p>
        <p>Peso: {pet.weigth} Kg</p>
        <p>Cor: {pet.color}</p>
        <h2 className="text-xl font-semibold mt-3">Descrição do Pet</h2>
        <p className="mb-10">{pet.description}</p>

        <AvailableVisit token={token} schedule={schedule} />
      </div>
    </section>
  );
};

export default PetShow;
