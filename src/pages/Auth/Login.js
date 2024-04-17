import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Cadastra usuário...");
  };

  return (
    <section className="max-w-md m-auto border p-9 rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-4">Log in</h1>
      <p className="mb-4">
        Entre com seus dados para poder adotar um pet e tenha uma experiência
        transformadora e enriquecedora.
      </p>
      <form onSubmit={handleSubmit}>
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

        <button
          type="submit"
          className="bg-blue-800 p-3 w-full text-center text-white rounded-md"
        >
          Entrar
        </button>
        <p className="mt-8">
          Não tem conta?{" "}
          <Link to="/register" className="font-bold">
            Clique aqui
          </Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
