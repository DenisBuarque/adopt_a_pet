import { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import useFlashMessage from "../../hooks/useFlashMessage";
import ImageNotFound from "../../assets/images/photo-not-found.png";
import PreviewImage from "../../components/PreviewImage";

// Context
import { Context } from "../../context/UserContext";

const Profile = () => {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem("token") || "");

  const [file, setFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setMessage } = useFlashMessage();

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

  async function handleSubmit(e) {
    e.preventDefault();

    let msgType = "bg-green-600";

    const formData = new FormData();
    formData.append("_id", id);
    formData.append("image", selectedFile);
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

  // create image preview
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const onSelectFile = (e) => {
    let file = e.target.files[0];

    if (!file.type.match(imageMimeType)) {
      let msgText = "Adicione somente imagens no formato PNG, JPG, JPEG";
      let msgType = "bg-red-600";
      setMessage(msgText, msgType);
      setSelectedFile(undefined);
      setFile("");
      return;
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <section className="max-w-xl m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p>
        Mantenha seus dados atualizados para poder adotar um pet para ter uma
        experiência transformadora e enriquecedora.
      </p>
      
      <PreviewImage
        image={image}
        selectedFile={selectedFile}
        preview={preview}
        ImageNotFound={ImageNotFound} 
        setPreview={setPreview}
      />

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="file"
            name="image"
            value={file}
            accept=".png, .jpg, .jpeg"
            onChange={onSelectFile}
            className="w-full" multiple={true}
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
