import { Outlet } from "react-router";
import { Header } from "./Header";
import { CustomSidebar } from "./CustomSidebar";

export function HomeLayout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <CustomSidebar />
        <main className="flex-1 overflow-y-auto bg-muted p-2">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
