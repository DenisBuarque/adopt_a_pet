import api from "../utils/api";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import useFlashMessage from "../hooks/useFlashMessage";

const MyVisits = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  const { setMessage } = useFlashMessage();

  useEffect(() => {
    (async () => {
      await api
        .get("/pets/myvisits", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        })
        .then((response) => {
          setPets(response.data.pets);
        })
        .catch((error) => {
          return error.response.data;
        });

      setLoading(false);
    })();
  }, [token]);

  async function handleDelete(id) {
    let msgType = "bg-green-600";

    const data = await api
      .delete(`/pets/deletevisit/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updateListPets = pets.filter((pet) => pet._id !== id);
        setPets(updateListPets);

        return response.data;
      })
      .catch((error) => {
        msgType = "bg-red-600";
        return error.response.data;
      });

    setMessage(data.message, msgType);
  }

  async function handleConclude(id) {
    let msgType = "bg-green-600";

    const data = await api
      .patch(`/pets/conclude/adoption/${id}`, {
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
    <section className="px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Minhas Visitas
          </h3>
          <p className="text-gray-600 mt-2">
            Lista de visitas agendadas na plataforma.
          </p>
        </div>
        <div className="mt-3 md:mt-0">

        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Pet</th>
              <th className="py-3 px-6">Visitante</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {pets.length > 0 &&
              pets.map((pet) => (
                <tr key={pet._id}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {pet.pet.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{pet.visitor.name}</td>
                  <td className="px-6 py-4">
                    {pet.confirmed ? <p>Em adoção</p> : <p>Adotado</p>}
                  </td>
                  <td className="float-right">
                    <div className="flex gap-1 mr-2">
                      {pet.visitor && (
                        <>
                          {pet.confirmed && (
                            <button
                              type="button"
                              onClick={() => handleConclude(pet._id)}
                              className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded duration-150 hover:bg-green-500"
                            >
                              Concluir
                            </button>
                          )}
                        </>
                      )}
                      <Link
                        onClick={() => handleDelete(pet._id)}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded duration-150 hover:bg-red-500"
                      >
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyVisits;
