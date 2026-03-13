import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <div className="h-screen ">
      <div className="h-full border-r flex flex-col  ">
        <h1 className="text-4xl font-extrabold mx-auto p-4">SideBar</h1>
        <div className="flex flex-col items-center gap-4 p-4 text-xl font-bold ">
          <Link
            to="/settings"
            className="hover:bg-gray-200 hover:rounded w-full text-center transition h-10 "
          >
            Configuración
          </Link>
        </div>
      </div>
    </div>
  );
};
