import { Outlet } from "react-router";
import { Header } from "./Header";
import {AdminSidebar} from "@/layout/AdminSidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";

export function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <SidebarInset className="flex-1 overflow-y-auto bg-muted p-2">
            <Outlet />
          </SidebarInset>
        </div>
      </div>

    </SidebarProvider>
  );
}
