import { Link } from "react-router-dom";
import Like from "../components/Like";
import { FaWhatsapp } from "react-icons/fa";
import AvailablePet from "./AvailablePet";

const Card = ({pet}) => {
  return (
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
            Responsável
          </span>
        </div>
      </div>
      <div className="pt-3 mx-4 mb-3">
        <Link to="/">
          <h3 className="text-xl text-gray-900">{pet.name}</h3>
        </Link>
        
        <p className="text-gray-400 my-3">
          {pet.description.substr(0, 200)}...
        </p>

        <AvailablePet pet={pet} />

        <Link
          to={`/petshow/${pet._id}`}
          className="px-4 py-4 text-sm text-white duration-100 bg-blue-800 rounded w-full block text-center shadow-md"
        >
          VER MAIS DETALHES
        </Link>
      </div>
    </article>
  );
};

export default Card;
