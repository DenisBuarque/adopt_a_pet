import api from "../utils/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const MyAdoptions = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await api
        .get("/pets/myadoptions", {
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

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <section className="px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Minhas Adoções
          </h3>
          <p className="text-gray-600 mt-2">Lista de pets adotados.</p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            to="/addpet"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-blue-800 rounded-full hover:bg-blue-800 md:text-sm"
          >
            <FaPlus />
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Pet</th>
              <th className="py-3 px-6">Tutor(a)</th>
              <th className="py-3 px-6">Status</th>
              {/*<th className="py-3 px-6">Peso</th>
              <th className="py-3 px-6">Cor</th>
              
              <th className="py-3 px-6 text-center">Fotos</th>
              <th className="py-3 px-6">Ações</th>*/}
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {pets.length > 0 &&
              pets.map((pet) => (
                <tr key={pet._id}>
                  <td>
                    <div className="flex items-center gap-x-3 py-3 px-6">
                      <img
                        src={`http://localhost:5000/assets/pets/${pet.images[0]}`}
                        className="w-10 h-10 rounded-full"
                        alt={pet.name}
                      />
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {pet.name}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {pet.color}, {pet.age} ano(s), {pet.weigth} Kg
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3 py-3 px-6">
                      <img
                        src={`http://localhost:5000/assets/users/${pet.user.image}`}
                        className="w-10 h-10 rounded-full"
                        alt={pet.user.name}
                      />
                      <div>
                        <span className="block text-gray-700 text-sm font-medium">
                          {pet.user.name}
                        </span>
                        <span className="block text-gray-700 text-xs">
                          {pet.user.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {pet.available ? <p>Em adoção</p> : <p>Adoção concluída</p>}
                  </td>
                  {/*<td className="px-6 py-4">{pet.weigth} Kg</td>
                  <td className="px-6 py-4">{pet.color}</td>
                  
                  <td className="px-6 py-4 text-center">{pet.images.length}</td>
                  <td className="float-right">
                    <div className="flex gap-1 mr-2">
                      <Link
                        to={`/editpet/${pet._id}`}
                        className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500"
                      >
                        <FaEdit />
                      </Link>
                    </div>
              </td>*/}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyAdoptions;
