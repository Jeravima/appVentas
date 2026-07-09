import { Outlet } from "react-router"
import { Sidebar } from "../components/Sidebar"


export const Layout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
        

        <Sidebar/>

        <main className="flex-1 p-4">

        <Outlet/>

        </main>
        

      

    </div>
  )
}
