import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase/client";


// type Registro = {
//   id: string;
//   venta: number;
//   lista: number;
//   porciones: number;
//   pizzetas: number;
//   fecha: string;
//   created_at: string;
// };

export const Resumen = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["ventas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ventas")
        .select("*")
        .order("fecha", { ascending: false })
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) 
    },
  });

  return (
    <div className="mx-auto max-w-5xl">
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
          ) : !data || data.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Aún no hay registros. Agrega uno desde el inicio.
            </p>
          ) : (
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
                  {data.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-medium">
                        {
                        r.fecha?
                        new Date(r.fecha).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }):'No Date'}
                      </TableCell>
                      <TableCell className="text-right">
                        ${Number(r.venta)}
                      </TableCell>
                      <TableCell className="text-right">
                        ${Number(r.lista)}
                      </TableCell>
                      <TableCell className="text-right">
                        {r.porciones}
                      </TableCell>
                      <TableCell className="text-right">{r.pizzetas}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
