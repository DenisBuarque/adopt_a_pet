import { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import Like from "../components/Like";
import { FaWhatsapp } from "react-icons/fa";

const Home = () => {
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
    // Clean nup functoin
    return () => {
      setPets([]);
    }
  }, []);

  return (
    <section className="md:mb-20">
      <div className="mb-2">
        <form className="w-full">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Digite o quê você progura?"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
        </form>
      </div>
      {!pets && <p>Não há pets cadastrados ou disponível para adoção.</p>}

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 md:mx-0">
        {pets.map((pet) => (
          <article
            className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
            key={pet._id}
          >
            <div className="relative">
              <div className="absolute bottom-2 right-2">
                <Like />
              </div>
              <img
                src={`${process.env.REACT_APP_API}/assets/pets/${pet.images[0]}`}
                loading="lazy"
                alt={pet.name}
                className="w-full h-48 rounded-t-md"
              />
            </div>
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
              <div className="flex-none w-10 h-10 rounded-full">
                <img
                  src={`${process.env.REACT_APP_API}/assets/users/${pet.user.image}`}
                  className="w-full h-full rounded-full"
                  alt={pet.user.name}
                />
              </div>
              <div className="ml-3">
                <span className="block text-gray-900">{pet.user.name}</span>
                <span className="flex items-center text-gray-400 text-sm">
                  <FaWhatsapp className="mr-1" /> {pet.user.phone}
                </span>
              </div>
            </div>
            <div className="pt-3 mx-4 mb-3">
              <Link to="/">
                <h3 className="text-xl text-gray-900">{pet.name}</h3>
              </Link>
              {pet.available ? (
                <div className="mt-3 mx-4 px-4 rounded-md border-l-4 border-green-500 bg-green-50 md:max-w-2xl md:mx-auto md:px-8">
                  <div className="flex justify-between py-3">
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 rounded-full text-green-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="self-center ml-3">
                        <span className="text-green-600 font-semibold">
                          Em processo de adoção
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-3 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8">
                  <div className="flex justify-between py-3">
                    <div className="flex">
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="self-center ml-3">
                        <span className="text-red-600 font-semibold">
                          Adoção concluída
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <p className="text-gray-400 my-3">
                {pet.description.substr(0, 200)}...
              </p>

              <Link to={`/petshow/${pet._id}`} className="px-4 py-2 text-sm text-white duration-100 bg-blue-800 rounded w-full block text-center shadow-md">
                VER MAIS DETALHES
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
