import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton, SidebarFooter, SidebarGroup, SidebarRail,
} from "@/components/ui/sidebar";
import {
  Award,
  FileText,
  FolderKanban,
  Home,
  Newspaper,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import {SidebarUser} from "@/components/sidebar/SidebarUser";
import * as React from "react";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";

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
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Sidebar
      className="flex-shrink-0"
      collapsible="none"
      variant="sidebar"
      {...props}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarNavItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton className="[&>svg]:size-5 [&>svg]:text-muted-foreground data-[active=true]:[&>svg]:text-foreground justify-start" size="lg" isActive={pathname === item.href} asChild>
                  <Button className="gap-4" onClick={() => navigate(item.href)} variant="ghost">
                    {item.icon}
                    <span className={cn(
                      "text-lg",
                      pathname === item.href ? "font-extrabold text-foreground" : "font-semibold text-muted-foreground"
                    )}>{item.title}</span>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
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