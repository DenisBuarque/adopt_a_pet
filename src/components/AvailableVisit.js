import { Link } from "react-router-dom";

const AvailableVisit = ({ token, schedule }) => {
  return (
    <>
      {token ? (
        <div className="text-center">
          <button
            onClick={schedule}
            type="button"
            className="px-5 py-3 text-white duration-150 bg-blue-800 rounded-full hover:bg-blue-800"
          >
            Agendar uma visita
          </button>
        </div>
      ) : (
        <div className="mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8">
          <div className="flex justify-between py-3">
            <div className="flex">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 rounded-full text-red-500"
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
                <span className="text-red-600 font-semibold">Atenção!</span>
                <p className="text-red-600 mt-1">
                  Faça o login para agendar uma visita para esse pet.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvailableVisit;
