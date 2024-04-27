import api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";
import { FaHeart } from "react-icons/fa";
import AvailableVisit from "../components/AvailableVisit";

const PetShow = () => {
  const { id } = useParams();

  const [pet, setPet] = useState({});
  const { setMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");

  const [loading, setLoading] = useState(true);

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

  if(loading) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="max-w-xl m-auto mb-20">
      <h1 className="text-2xl font-semibold mb-1">
        Pet <span className="text-red-600">{pet.name}</span>
      </h1>
      <p className="mb-5">
        Se tiver interrese agende uma visita para conhecê-lo.
      </p>

      <AvailableVisit pet={pet} token={token} schedule={schedule} />

      <div className="grid grid-cols-3 gap-4 my-6">
        {pet.images &&
          pet.images.map((image, index) => (
            <div key={index}>
              <img
                src={process.env.REACT_APP_API + `/assets/pets/` + image}
                alt={pet.name}
              />
            </div>
          ))}
      </div>

      <h1 className="mt-5">Nome: {pet.name}</h1>
      <p>Idade: {pet.age} ano(s)</p>
      <p>Peso: {pet.weigth} Kg</p>
      <p>Cor: {pet.color}</p>

      <div className="mt-5">
        <Link to="/">
          <FaHeart className="w-8 h-8" />
        </Link>
      </div>
      <hr className="my-5" />
      <p>{pet.description}</p>
    </section>
  );
};

export default PetShow;
