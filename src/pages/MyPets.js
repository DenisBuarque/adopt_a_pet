import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  const tableItems = [
    {
      avatar:
        "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Liam James",
      email: "liamjames@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Software engineer",
      salary: "$100K",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/86.jpg",
      name: "Olivia Emma",
      email: "oliviaemma@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Product designer",
      salary: "$90K",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/79.jpg",
      name: "William Benjamin",
      email: "william.benjamin@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Front-end developer",
      salary: "$80K",
    },
    {
      avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      name: "Henry Theodore",
      email: "henrytheodore@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Laravel engineer",
      salary: "$120K",
    },
    {
      avatar:
        "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
      name: "Amelia Elijah",
      email: "amelia.elijah@example.com",
      phone_nimber: "+1 (555) 000-000",
      position: "Open source manager",
      salary: "$75K",
    },
  ];

  return (
    <section className="px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
            Meus Pets
          </h3>
          <p className="text-gray-600 mt-2">
            Lista de pets cadastrados na plataforma.
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <Link
            to="/addpet"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-blue-800 rounded-full hover:bg-blue-800 md:text-sm"
          >
            <FaPlus />
          </Link>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Username</th>
              <th className="py-3 px-6">Idade</th>
              <th className="py-3 px-6">Peso</th>
              <th className="py-3 px-6">Cor</th>
              <th className="py-3 px-6">Fotos</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {pets.length > 0 &&
              pets.map((pet) => (
                <tr key={pet._id}>
                  <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                    <img
                      src={`http://localhost:5000/assets/pets/${pet.images[0]}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <span className="block text-gray-700 text-sm font-medium">
                        {pet.name}
                      </span>
                      <span className="block text-gray-700 text-xs">
                        {pet.user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pet.age} ano(s)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {pet.weigth} Kg
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{pet.images.length}</td>
                  <td className="">
                    <div className="flex gap-1">
                      <Link
                        to="/mypets"
                        className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded duration-150 hover:bg-indigo-500"
                      >
                        <FaEdit />
                      </Link>
                      <Link
                        to="/mypets"
                        className="flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded duration-150 hover:bg-red-500"
                      >
                        <FaTrash />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyPets;
