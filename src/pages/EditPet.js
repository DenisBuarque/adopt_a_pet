import api from "../utils/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFlashMessage from "../hooks/useFlashMessage";

const EditPet = () => {
  const { id } = useParams();

  const [token] = useState(localStorage.getItem("token") || "");

  const { setMessage } = useFlashMessage();

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPet, setImagesPet] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [weigth, setWeigth] = useState("");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");

  // List data pet
  useEffect(() => {
    api
      .get(`/pets/show/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setImagesPet(response.data.pet.images);
        setName(response.data.pet.name);
        setAge(response.data.pet.age);
        setWeigth(response.data.pet.weigth);
        setColor(response.data.pet.color);
        setDescription(response.data.pet.description);
      });

      return () => {
        setImagesPet([]);
        setName("");
        setAge("");
        setWeigth("");
        setColor("");
        setDescription("");
      }
  }, [token, id]);

  // handle image preview
  const imageType = /image\/(png|jpg|jpeg)/gm;

  const handleChangeImage = (e) => {

    let msgText = "Adicione somente images no formato jpg, jpeg, png";
    let msgType = "bg-red-600";

    const { files } = e.target;
    const validImageFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageType)) {
        validImageFiles.push(file);
      }
    }

    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    setMessage(msgText, msgType);
  };

  useEffect(() => {
    const images = [];
    const fileReaders = [];
    let isCancel = false;

    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === imageFiles.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });
    }
    return () => {
      isCancel = true;
      fileReaders.forEach((fileReader) => {
        if (fileReader.readyState === 1) {
          fileReader.abort();
        }
      });
      setImages([]);
    };
  }, [imageFiles]);

  // update data pet
  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "bg-green-600";

    const formData = new FormData();

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    formData.append("name", name);
    formData.append("age", age);
    formData.append("weigth", weigth);
    formData.append("color", color);
    formData.append("description", description);

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
        Pet Edit <span className="text-red-600">{name}</span>
      </h1>
      <p>
        Mantenha os dados do seu pet atualizado para que ele possa ser visto e
        adotado por outros usuários da plataforma.
      </p>
      <div className="flex justify-start flex-wrap gap-2 py-5">
        {images.length > 0 ? (
          <>
            {images.map((image, index) => (
              <img
                src={image}
                alt="Pet"
                key={index}
                className="w-28 h-28 rounded-full border-4"
              />
            ))}
          </>
        ) : (
          <>
            {imagesPet &&
              imagesPet.map((img, index) => (
                <img
                  src={`${process.env.REACT_APP_API}/assets/pets/${img}`}
                  alt="Pet"
                  key={index}
                  className="w-28 h-28 rounded-full border-4"
                />
              ))}
          </>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            name="images"
            accept=".png, .jpg, .jpeg"
            className="w-full"
            multiple
            onChange={handleChangeImage}
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
            onChange={(e) => setAge(e.target.value)}
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
            onChange={(e) => setWeigth(e.target.value)}
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
            onChange={(e) => setColor(e.target.value)}
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
            onChange={(e) => setDescription(e.target.value)}
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

export default EditPet;
