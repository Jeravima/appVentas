import { Outlet } from "react-router";
import { AppSidebar } from "../components/Sidebar";
import { ThemeToggle } from "../components/themeToggle";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";

export const Layout = () => {
  return (

    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-muted/30">
        <AppSidebar/>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground">
              Panel de control
            </span>
            <div className="ml-auto">
              <ThemeToggle />
            </div>
          </header>
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
      
    </SidebarProvider>
  );
};
