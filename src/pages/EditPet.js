import api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useFlashMessage from "../hooks/useFlashMessage";

import FormPet from "../components/FormPet";

const EditPet = () => {
  const { id } = useParams();

  const [pet, setPet] = useState({});

  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  // List data pet
  useEffect(() => {
    api
      .get(`/pets/show/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  // update data pet
  async function handleSubmit(pet) {

    let msgType = "bg-green-600";

    const formData = new FormData();

    for (let i = 0; i < pet.images.length; i++) {
      formData.append("images", pet.images[i]);
    }

    formData.append("name", pet.name);
    formData.append("age", pet.age);
    formData.append("weigth", pet.weigth);
    formData.append("color", pet.color);
    formData.append("description", pet.description);

    const data = await api
      .patch(`/pets/update/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        msgType = "bg-red-600";
        return error.response.data;
      });

    setMessage(data.message, msgType);

  }

  return (
    <section className="max-w-xl m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">
        Pet Edit <span className="text-red-600">{pet.name}</span>
      </h1>
      <p>
        Mantenha os dados do seu pet atualizado para que ele possa ser visto e
        adotado por outros usuários da plataforma.
      </p>
    <FormPet handleSubmit={handleSubmit} petData={pet}/>
      
    </section>
  );
};

export default EditPet;
