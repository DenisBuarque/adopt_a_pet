import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = ({ handleSubmit}) => {
  const [search, setSearch] = useState("");
  async function handleSearch (e) {
    e.preventDefault();
    handleSubmit(search);
  }
  return (
    <div className="mb-2">
      <form className="w-full" onSubmit={handleSearch}>
        <div className="flex">
          <div className="flex-1 relative">
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
              required={true}
              className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="flex justify-center items-center ml-2 py-3 px-5 text-center text-white rounded-md bg-blue-800"
          >
            <FaSearch />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
