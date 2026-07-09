import { RouterProvider } from "react-router";
import { router } from "./routes/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

export const AppVentas = () => {
  const queryClient = new QueryClient();

  return (
    <div className="min-h-screen ">
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};
