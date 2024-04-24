import { useState, useEffect } from "react";
import useFlashMessage from "../hooks/useFlashMessage";

const FormPet = ({handleSubmit, petData}) => {

  const [pet, setPet] = useState(petData || "");

  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPet, setImagesPet] = useState([]);

  const [name, setName] = useState(pet.name || "");
  const [age, setAge] = useState(pet.age || "");
  const [weigth, setWeigth] = useState(pet.weigth || "");
  const [color, setColor] = useState(pet.color || "");
  const [description, setDescription] = useState(pet.description || "");

  const { setMessage } = useFlashMessage();

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
    };
  }, [imageFiles]);

  const data = {
    name,
    age,
    weigth,
    color,
    description,
    images: imageFiles,
  };

  function handleCreate(e) {
    e.preventDefault();
    handleSubmit(data);
  }

  return (
    <div>
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

      <form onSubmit={handleCreate}>
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
    </div>
  );
};

export default FormPet;
