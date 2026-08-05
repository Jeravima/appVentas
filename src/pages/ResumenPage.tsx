import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { formatNumber } from "@/lib/format";


function rangoDelMes(mes: string) {
  const [year, month] = mes.split("-").map(Number);
  const inicio = `${mes}-01`;
  // si el mes es 12, el siguiente es enero del año siguiente
  const siguienteMes = month === 12 ? 1 : month + 1;
  const siguienteAnio = month === 12 ? year + 1 : year;
  const fin = `${siguienteAnio}-${String(siguienteMes).padStart(2, "0")}-01`;
  return { inicio, fin };
}

export const ResumenPage = () => {
  const [mes, setMes] = useState(() => new Date().toISOString().slice(0, 7));

  const {
    data: ventas = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ventas", mes],

    queryFn: async () => {
      const { inicio, fin } = rangoDelMes(mes);
      const { data, error } = await supabase
        .from("ventas")
        .select("*")
        //AGREGADO: filtro por rango de fechas -> sólo el mes elegido
        .gte("fecha", inicio)
        .lt("fecha", fin)
        .order("fecha", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  const registros = ventas ?? [];
  const totalVenta = registros.reduce(
    (total, registro) => total + Number(registro.venta),
    0,
  );
  const totalLista = registros.reduce(
    (total, registro) => total + Number(registro.lista),
    0,
  );
  const totalPorciones = registros.reduce(
    (total, registro) => total + (registro.porciones ?? 0),
    0,
  );
  const totalPizzetas = registros.reduce(
    (total, registro) => total + (registro.pizzetas ?? 0),
    0,
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-4">
        <Label htmlFor="mes">Mes</Label>
        <Input
          id="mes"
          type="month"
          className="w-44 mt-2"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
        />
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Detalles</CardTitle>
          <CardDescription>Todos los registros guardados.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Cargando...
            </p>
          ) : error ? (
            <p className="py-8 text-center text-sm text-destructive">
              Error al cargar: {(error as Error).message}
            </p>
          ) : !ventas || ventas.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aún no hay registros. Agrega uno desde el inicio.
            </p>
          ) : (
            <>
              <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Venta</p>
                  <p className="mt-1 text-xl font-semibold">
                    ${formatNumber(totalVenta)}
                  </p>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Lista</p>
                  <p className="mt-1 text-xl font-semibold">
                    ${formatNumber(totalLista)}
                  </p>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Porciones</p>
                  <p className="mt-1 text-xl font-semibold">{totalPorciones}</p>
                </div>
                <div className="rounded-md border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Pizzetas</p>
                  <p className="mt-1 text-xl font-semibold">{totalPizzetas}</p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Venta</TableHead>
                      <TableHead className="text-right">Lista</TableHead>
                      <TableHead className="text-right">Porciones</TableHead>
                      <TableHead className="text-right">Pizzetas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ventas.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">
                          {r.fecha
                            ? new Date(r.fecha).toLocaleDateString("es-MX", {
                                timeZone: "UTC",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : "No Date"}
                        </TableCell>
                        <TableCell className="text-right">
                          ${ formatNumber(   Number(r.venta))}
                        </TableCell>
                        <TableCell className="text-right">
                          ${ formatNumber(  Number(r.lista))}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.porciones}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.pizzetas}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
