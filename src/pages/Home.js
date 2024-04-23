import { useState, useEffect } from "react";
import api from "../utils/api";
import { Link } from "react-router-dom";
import Like from '../components/Like'

const Home = () => {
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get('/pets').then((response) => {
      setPets(response.data.pets);
    })
  },[]);

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
                <span className="block text-gray-900">{pet.name}</span>
                <span className="block text-gray-400 text-sm">
                  {pet.color}
                </span>
              </div>
            </div>
            <div className="pt-3 ml-4 mr-2 mb-3">
              <Link to="/">
                <h3 className="text-xl text-gray-900">{pet.name}</h3>
              </Link>
              <p className="text-gray-400 text-sm mt-1">{pet.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Home;
