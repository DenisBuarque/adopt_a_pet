import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Context
import { useContext } from "react";
import { Context } from "../context/UserContext";

const Navbar = () => {
  const [state, setState] = useState(false);
  //context
  const { authenticated, logout } = useContext(Context);

  useEffect(() => {
    document.onClick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <nav
      className={`bg-white pb-5 md:text-sm ${
        state
          ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
          : ""
      }`}
    >
      <div className="gap-x-14 items-center px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <Link to="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="menu-btn text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
            state ? "block" : "hidden"
          } `}
        >
          <ul className="justify-center items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            <li className="text-gray-700 hover:text-gray-900">
              <Link to="/" className="block">
                Home
              </Link>
            </li>
            <li className="text-gray-700 hover:text-gray-900">
              <Link to="/about" className="block">
                Sobre
              </Link>
            </li>
            <li className="text-gray-700 hover:text-gray-900">
              <Link to="/lei" className="block">
                Lei de Maustratos
              </Link>
            </li>
          </ul>

          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            {authenticated ? (
              <>
                <Link
                  to="/myadoptions"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Minha Adoções
                </Link>
                <Link
                  to="/mypets"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Meus Pets
                </Link>
                <Link
                  to="/profile"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Perfil
                </Link>
                <Link
                  to="/" onClick={logout}
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-red-800 hover:bg-red-700 active:bg-red-900 rounded-full md:inline-flex"
                >
                  Sair
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="block text-gray-700 hover:text-gray-900"
                >
                  Registrar-se
                </Link>
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-blue-800 hover:bg-blue-700 active:bg-blue-900 rounded-full md:inline-flex"
                >
                  Fazer Login
                  
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
