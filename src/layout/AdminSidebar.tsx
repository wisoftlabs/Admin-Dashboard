import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton, SidebarFooter, SidebarGroup,
} from "@/components/ui/sidebar";
import {
  Award,
  FileText,
  FolderKanban,
  Home,
  Newspaper,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import {SidebarUser} from "@/layout/SidebarUser";
import * as React from "react";

const sidebarNavItems = [
  {
    title: "Home",
    icon: <Home className="size-5 stroke-2" />,
    href: "/home",
  },
  {
    title: "News",
    icon: <Newspaper className="size-5 stroke-2" />,
    href: "/news",
  },
  {
    title: "Project",
    icon: <FolderKanban className="size-5 stroke-2" />,
    href: "/project",
  },
  {
    title: "Paper",
    icon: <FileText className="size-5 stroke-2" />,
    href: "/paper",
  },
  {
    title: "Award",
    icon: <Award className="size-5 stroke-2" />,
    href: "/award",
  },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();

  return (
      <Sidebar
        className="top-(--header-height) h-[calc(99.9svh-var(--header-height))]! flex-shrink-0"
        collapsible="none"
        variant="sidebar"
        {...props}
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {sidebarNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild size="lg" isActive={pathname === item.href}>
                    <Link to={item.href}>
                      {item.icon}
                      <span className="text-lg font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

        </SidebarContent>
        <SidebarFooter>
          <SidebarUser />
        </SidebarFooter>
      </Sidebar>
  );
}