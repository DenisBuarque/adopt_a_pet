import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import ImageNotFound from "../../assets/images/photo-not-found.png";

// Context
import { Context } from "../../context/UserContext";

const Profile = () => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState();

  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setMessage } = useFlashMessage();

  // Loading data in form
  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
        setImage(response.data.image);
        setId(response.data._id);
        setName(response.data.name);
        setPhone(response.data.phone);
        setEmail(response.data.email);
      });
  }, [token]);

  // handle image preview
  const imageType = /image\/(png|jpg|jpeg)/i;

  const handleChangeImage = (e) => {
    let msgText = "Adicione somente imagens no formato PNG, JPG, JPEG";
    let msgType = "bg-red-600";

    const file = e.target.files[0];

    if (file !== undefined) {
      if (!file.type.match(imageType)) {
        setMessage(msgText, msgType);
        return;
      }
      setFile(file);
    }
  };

  useEffect(() => {
    let fileReader;
    let isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setPreview(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  // Update user data
  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "bg-green-600";

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("image", file);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);

    const data = await api
      .patch(`/users/update/${id}`, formData, {
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
  }

  return (
    <section className="max-w-xl m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p>
        Mantenha seus dados atualizados para poder adotar um pet para ter uma
        experiência transformadora e enriquecedora.
      </p>

      {/*<PreviewImage
        image={image}
        selectedFile={selectedFile}
        preview={preview}
        ImageNotFound={ImageNotFound} 
        setPreview={setPreview}
  />*/}

      <div className="flex justify-center items-center my-7">
        {image || preview ? (
          <img
            src={
              preview ? preview : `http://localhost:5000/assets/users/${image}`
            }
            alt={name}
            className="w-48 h-48 rounded-full border-4"
          />
        ) : (
          <img
            src={ImageNotFound}
            alt="Avatar"
            className="w-28 h-28 rounded-full bg-gray-400"
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            accept=".png, .jpg, .jpeg"
            onChange={handleChangeImage}
            className="w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="name" className="block font-semibold">
            Nome:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Digite seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block font-semibold">
            Telefone:
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="Digite seu telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block font-semibold">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="block font-semibold">
            Senha:
          </label>
          <input
            type="password"
            name="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="confirmPassword" className="block font-semibold">
            Confirme sua senha:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 p-3 w-full text-center text-white rounded-md"
        >
          Atualizar Dados
        </button>
      </form>
    </section>
  );
};

export default Profile;
