import { useState, useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { Context } from "../../context/UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //Context
  const { register } = useContext(Context);

  const user = {
    name, 
    phone, 
    email, 
    password,
    confirmPassword
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <section className="max-w-md m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Nova Conta</h1>
      <p className="mb-4">
        Cadastre-se para poder adotar um pet e tenha uma experiência
        transformadora e enriquecedora.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label htmlFor="name" className="block font-semibold">Nome:</label>
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
          <label htmlFor="phone" className="block font-semibold">Telefone:</label>
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
          <label htmlFor="email" className="block font-semibold">E-mail:</label>
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
          <label htmlFor="password" className="block font-semibold">Senha:</label>
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
          <label htmlFor="confirmPassword" className="block font-semibold">Confirme sua senha:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="**********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className="border rounded p-2 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-800 p-3 w-full text-center text-white rounded-md">Cadastrar dados</button>
        <p className="mt-8">Já tem conta? <Link to="/login" className="font-bold">Clique aqui</Link></p>
      </form>
    </section>
  );
};

export default Register;
