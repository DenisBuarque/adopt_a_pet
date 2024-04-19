import { useState, useContext } from "react";
import api from "../utils/api";
import useFlashMessage from "../hooks/useFlashMessage";
// Context
import { Context } from "../context/UserContext";

const AddPet = () => {
  const [token] = useState(localStorage.getItem("token") || "");

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weigth, setWeigth] = useState("");
  const [color, setColor] = useState("");
  const [description, useDescription] = useState("");
  const [imges, setImages] = useState("");

  const { setMessage } = useFlashMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastrar pet...");
  };

  return (
    <section className="max-w-xl m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p>
        Adicione seu pet para que ele possa ser visto e adotado por outros
        usuários da plataforma.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg"
            className="w-full" 
            multiple
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name" className="block font-semibold">
            Nome:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Digite o nome do pet"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="age" className="block font-semibold">
            Idade:
          </label>
          <input
            type="number"
            name="age"
            placeholder="Digite a idade do pet"
            value={age}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="weigth" className="block font-semibold">
            Peso: Kg:
          </label>
          <input
            type="number"
            name="weigth"
            placeholder="Digite o peso do pet"
            value={weigth}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="color" className="block font-semibold">
            Cor:
          </label>
          <input
            type="text"
            name="color"
            placeholder="Digiyte a cor do pet"
            value={color}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block font-semibold">
            Descrição:
          </label>
          <textarea
            name="description"
            placeholder="Digite um breve descrição sobre o pet."
            value={description}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded p-2 w-full"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-800 p-3 w-full text-center text-white rounded-md"
        >
          Cadastrar Dados
        </button>
      </form>
    </section>
  );
};

export default AddPet;
