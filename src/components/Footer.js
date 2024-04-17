import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-gray-500 bg-white px-4 py-5 md:px-8">
      <div className="max-w-lg sm:mx-auto sm:text-center">
        <img
          src="https://www.floatui.com/logo.svg"
          className="w-32 sm:mx-auto"
        />
        <p className="leading-relaxed mt-2 text-[15px]">
        Adotar um pet pode ser uma decisão muito gratificante e benéfica, tanto para a pessoa quanto 
        para o animal. São ótimos companheiros, trazem beneficios para saúde mental, ensina responsabilidade e compaixão, 
        ajuda na contribuição social. Tenha uma experiência transformadora e enriquecedora.
        </p>
      </div>
      <ul className="items-center justify-center mt-8 space-y-5 sm:flex sm:space-x-4 sm:space-y-0">
        <li className=" hover:text-gray-800">
          <Link to="">About</Link>
        </li>
        <li className=" hover:text-gray-800">
          <Link to="">Blog</Link>
        </li>
        <li className=" hover:text-gray-800">
          <Link to="">Team</Link>
        </li>
        <li className=" hover:text-gray-800">
          <Link to="">careers</Link>
        </li>
        <li className=" hover:text-gray-800">
          <Link to="">Support</Link>
        </li>
      </ul>
      <div className="mt-8 items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          &copy; 2024 Adopt a Pet All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link to="https://twitter.com/" target="_blank">
                <FaTwitter className="text-blue-400" />
              </Link>
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link to="https://pt-br.facebook.com/r" target="_blank">
                <FaFacebook className="text-blue-600" />
              </Link>
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link to="https://www.linkedin.com/home" target="_blank">
                <FaLinkedin className="text-blue-800" />
              </Link>
            </li>

            <li className="w-10 h-10 border rounded-full flex items-center justify-center">
              <Link to="https://www.youtube.com/" target="_blank">
                <FaYoutube className="text-red-500" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
