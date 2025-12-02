import { Outlet } from "react-router";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/layout/AdminSidebar";

import { Header } from "./Header";

export function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen flex-col">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <AdminSidebar />
          <SidebarInset className="flex-1 overflow-y-auto bg-background p-4">
            <Outlet />
          </SidebarInset>
        </div>
      </div>

    </SidebarProvider>
  );
}
