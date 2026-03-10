import { RouterProvider } from "react-router"
import { router } from "./routes/router"


export const AppVentas = () => {

 
  return (
    <div className="min-h-screen ">
      

      <RouterProvider router={router}/>


    </div>
  )
}
