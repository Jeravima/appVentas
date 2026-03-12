import { BarCharts } from "../components/BarCharts";
import { Sidebar } from "../components/Sidebar"

export const Home = () => {
  return (
    <div className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>
      <div className="w-full xl:ml-80 h-full">
        <h1 className="text-black font-extrabold text-5xl text-center">
          Dashboard
        </h1>
        <BarCharts/>
      </div>
    </div>
  );
}
