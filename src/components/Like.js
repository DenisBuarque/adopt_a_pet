import { Link } from "react-router-dom";
import { FaHeart, FaComment } from "react-icons/fa";

const Like = () => {
  return (
    <>
      <Link>
        <FaHeart className="w-7 h-7 text-white mb-3" />
      </Link>
      <Link>
        <FaComment className="w-7 h-7 text-white" />
      </Link>
    </>
  );
};

export default Like;
