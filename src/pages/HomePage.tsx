import { useState } from "react";
import { supabase } from "../supabase/client";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const hoy = new Date().toISOString().slice(0, 10);

type FormData = {
  venta: string;
  lista: string;
  porciones: string;
  pizzetas: string;
  fecha: typeof hoy;
};

export const HomePage = () => {
  const [form, setForm] = useState<FormData>({
    venta: "",
    lista: "",
    porciones: "",
    pizzetas: "",
    fecha: hoy,
  });

  const [saving, setSaving] = useState(false);

  const update =
    (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const guardarDatos = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !form.venta ||
      !form.lista ||
      !form.porciones ||
      !form.pizzetas ||
      !form.fecha
    ) {
      toast.error("Completa todos los campos");
      return;
    }
    setSaving(true);

    const { error } = await supabase.from("ventas").insert([
      {
        fecha: form.fecha,
        porciones: form.porciones,
        pizzetas: form.pizzetas,
        venta: form.venta,
        lista: form.lista,
      },
    ]);

    setSaving(false);

    if (error) {
      console.error(error);
      toast.error("Error al guardar");
      return;
    }

    toast("Datos guardados");

    setForm({
      venta: "",
      lista: "",
      porciones: "",
      pizzetas: "",
      fecha: hoy,
    });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo registro</CardTitle>
          <CardDescription>
            Ingresa los datos del día y guárdalos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={guardarDatos} className="grid gap-5">
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="venta">Venta</Label>
                <Input
                  id="venta"
                  type="number"
                  placeholder="0"
                  value={form.venta}
                  onChange={update("venta")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lista">Lista</Label>
                <Input
                  id="lista"
                  type="number"
                  placeholder="0"
                  value={form.lista}
                  onChange={update("lista")}
                />
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="porciones">Porciones</Label>
                <Input
                  id="porciones"
                  type="number"
                  placeholder="0"
                  value={form.porciones}
                  onChange={update("porciones")}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pizzetas">Pizzetas</Label>
                <Input
                  id="pizzetas"
                  type="number"
                  placeholder="0"
                  value={form.pizzetas}
                  onChange={update("pizzetas")}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                type="date"
                value={form.fecha}
                onChange={update("fecha")}
              />
            </div>
            <Button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto sm:justify-self-end"
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
