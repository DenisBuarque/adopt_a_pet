import { Link } from "react-router-dom";
import Like from "../components/Like";

const Card = ({ pet }) => {
  return (
    <article
      className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm"
      key={pet._id}
    >
      <div
        style={{
          backgroundImage: `url(${process.env.REACT_APP_API}/assets/pets/${pet.images[0]})`,
        }}
        className="w-full h-64 object-cover bg-no-repeat"
      ></div>

      <Like pet={pet} />

      <div className="pt-3 mx-4 mb-3">
        <h3 className="text-xl text-gray-900">{pet.name}</h3>
        <p className="text-gray-400 my-3">
          {pet.description.substr(0, 200)}...
        </p>
        <Link
          to={`/petshow/${pet._id}`}
          className="px-4 py-4 text-sm text-white duration-100 bg-blue-800 rounded w-full block text-center shadow-md"
        >
          VER DETALHES
        </Link>
      </div>
    </article>
  );
};

export default Card;
