import { useState } from "react";
import{loginUser} from "../services/auth"
import { useNavigate } from "react-router";




export const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        const user = await loginUser(email, password);

        
        if(user){
          navigate('/home')

        }
        
      } catch (error) {
        alert('Usuario no encontrado')
      }
    
    };
   


  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100 ">
        <div className="bg-white shadow-lg rounded-lg p-6 w-100 flex flex-col gap-4">
          <h1 className="font-extrabold text-2xl  text-center">Login</h1>

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h2>Email</h2>
            <input
            id='1'
              type="email"
              placeholder="Ingresa tu usuario"
              className="border p-1 rounded "
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <h2>Contraseña</h2>
            <input
            id="2"
              type="password"
              placeholder="Contraseña"
              className="border p-1 rounded"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button
              type="submit"
              className="rounded-md p-1 bg-purple-500 text-white cursor-pointer hover:bg-purple-600 transition"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
