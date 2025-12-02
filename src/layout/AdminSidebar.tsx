import * as React from "react";
import { type JSX } from "react";
import { useLocation, useNavigate } from "react-router";

import {
  Award,
  FileText,
  FolderKanban,
  Home,
  ImagesIcon,
  NewspaperIcon,
} from "lucide-react";

import { SidebarUser } from "@/components/sidebar/SidebarUser";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
type AdminSidebarItemData = {
  title: string;
  icon: JSX.Element;
  href: string;
};
const sidebarNavItems: Array<AdminSidebarItemData> = [
  {
    title: "Home",
    icon: <Home />,
    href: "/home",
  },
  {
    title: "News",
    icon: <NewspaperIcon />,
    href: "/news",
  },
  {
    title: "Gallery",
    icon: <ImagesIcon />,
    href: "/gallery",
  },
  {
    title: "Project",
    icon: <FolderKanban />,
    href: "/project",
  },
  {
    title: "Paper",
    icon: <FileText />,
    href: "/paper",
  },
  {
    title: "Award",
    icon: <Award />,
    href: "/award",
  },
];

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="flex-shrink-0 border-r"
      collapsible="none"
      variant="sidebar"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <AdminSidebarItem {...sidebarNavItems[0]} />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <SidebarMenu>
            {sidebarNavItems.slice(1).map(item => <AdminSidebarItem {...item} />)}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

function AdminSidebarItem(item: AdminSidebarItemData) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = pathname === item.href;

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton className="[&_svg:not([class*='size-'])]:size-5 [&_svg]:stroke-2 [&_svg]:text-muted-foreground data-[active=true]:[&_svg]:text-foreground justify-start" size="lg" isActive={pathname === item.href} asChild>
        <Button
          className={cn(
            "gap-4 rounded-l-none ",
            isActive ? "border-l-2 border-l-primary" : "border-none",
          )}
          onClick={() => navigate(item.href)}
          variant="ghost"
        >
          {item.icon}
          <span className={cn(
            "text-lg",
            isActive ? "font-extrabold text-foreground" : "font-semibold text-muted-foreground",
          )}
          >
            {item.title}
          </span>
        </Button>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
