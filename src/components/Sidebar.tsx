import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-white h-screen p-6 ">
      <nav className="flex flex-col gap-y-4 ">
        <Link to="settings">Settings</Link>
        <Link to="settings">Settings</Link>
        <Link to="settings">Settings</Link>
        <Link to="settings">Settings</Link>
      </nav>
    </aside>
  );
};
