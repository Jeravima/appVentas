import { useState } from "react";
import { supabase } from "../supabase/client";
import toast from "react-hot-toast";

type FormData = {
  ventas: number;
  valorLista: number;
  porciones: number;
  pizzetas: number;
  fecha: string;
};

export const Home = () => {
  const [form, setForm] = useState<FormData>({
    ventas: 0,
    valorLista: 0,
    porciones: 0,
    pizzetas: 0,
    fecha: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const guardarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
    .from("ventas")
    .insert([
      {
        fecha: form.fecha,
        porciones: form.porciones,
        pizzetas: form.pizzetas,
        venta: form.ventas,
        lista: form.valorLista,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Error al guardar");
      return;
    }

    toast("Datos guardados");

    setForm({
      ventas: 0,
      valorLista: 0,
      porciones: 0,
      pizzetas: 0,
      fecha: "",
    });
  };

  return (
    <div className="flex flex-col w-full justify-center ">
      <h1 className="text-2xl font-bold ">Dashboard</h1>
      <div className="mt-10">
        <form onSubmit={guardarDatos}>
          <label>Venta</label>
          <input
            type="number"
            name="ventas"
            value={form.ventas}
            onChange={handleChange}
            placeholder="Ventas"
          />

          <input
            type="number"
            name="valorLista"
            value={form.valorLista}
            onChange={handleChange}
            placeholder="Valor lista"
          />

          <input
            type="number"
            name="porciones"
            value={form.porciones}
            onChange={handleChange}
            placeholder="Porciones"
          />

          <input
            type="number"
            name="pizzetas"
            value={form.pizzetas}
            onChange={handleChange}
            placeholder="Pizzetas"
          />

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
          />

          <button type="submit">Guardar</button>
        </form>
      
      </div>
    </div>
  );
};
