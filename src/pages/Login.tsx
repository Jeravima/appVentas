import { useState } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error);
      toast.error("Email o contraseña invalida");

      return;
    }

    navigate("/home");
  };

  return (
    <>
      {/* <div className="min-h-screen flex justify-center items-center bg-slate-700 ">
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
      </div> */}

      <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
        <Card className="w-full max-w-md border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Dashboard de Ventas</CardTitle>
            <CardDescription>Inicia sesión para continuar.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="login-email">Correo</Label>
                <Input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="login-password">Contraseña</Label>
                <Input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Ingresando..." : "Ingresar"}
              </Button>
            </form>

            
          </CardContent>
        </Card>
      </div>
    </>
  );
};
