import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";

import FormPet from "../components/FormPet";

const AddPet = () => {
  const navigate = useNavigate();

  const { setMessage } = useFlashMessage();

  const [token] = useState(localStorage.getItem("token") || "");

  // Add pet data
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
      .post(`/pets/store`, formData, {
        headers: {
          Authorization: `Beare ${JSON.parse(token)}`,
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

    navigate("/mypets");
  }

  return (
    <section className="max-w-xl m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Pet</h1>
      <p>
        Adicione seu pet para que ele possa ser visto e adotado por outros
        usuários da plataforma.
      </p>
      <FormPet handleSubmit={handleSubmit} />
      </section>
  );
};

export default AddPet;
