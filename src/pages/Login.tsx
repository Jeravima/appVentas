import { useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate } from "react-router";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginUser(email, password);
      if (user) {
        navigate("/home");
      }
    } catch (error) {
      alert("Usuario no encontrado");
    }
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-slate-700 ">
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 h-100 flex flex-col gap-4 ">
          <h1 className="font-extrabold text-4xl  text-center mb-5">Login</h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="Email" className="">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Usuario"
                className="w-full border border-gray-400 rounded p-2 focus:outline-none focus:border-blue-500 mb-4"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label>Contraseña</label>
              <input
                id="contraseña"
                type="password"
                placeholder="Contraseña"
                className="border p-2 border-gray-500 focus:border-blue-500 focus:outline-none rounded w-full"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="rounded-md mt-4 p-1 bg-purple-500 text-white cursor-pointer hover:bg-purple-600 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
