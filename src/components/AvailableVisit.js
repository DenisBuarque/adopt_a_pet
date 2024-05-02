import { Link } from 'react-router-dom';

const AvailableVisit = ({ pet, token, schedule }) => {
  return (
    <>
      {pet.available ? (
        <>
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
                    Para adoção
                  </span>
                </div>
              </div>
            </div>
          </div>

          {token ? (
            <div className="text-center mt-5">
              <button
                onClick={schedule}
                type="button"
                className="px-5 py-3 text-white duration-150 bg-blue-800 rounded-full hover:bg-blue-800"
              >
                Agendar uma visita
              </button>
            </div>
          ) : (
            <div className="mt-5 mx-4 px-4 rounded-md border-l-4 border-red-500 bg-red-50 md:max-w-2xl md:mx-auto md:px-8">
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
                      Faça o login para agendar uma visita para esse pet,{" "}
                      <Link to="/login" className="font-semibold">
                        clique aqui.
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
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
    </>
  );
};

export default AvailableVisit;