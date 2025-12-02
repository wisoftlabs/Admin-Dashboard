import { Link, useLocation } from "react-router";
import {
  Award,
  FileText,
  FolderKanban,
  Home,
  Newspaper,
} from "lucide-react";
import { SidebarUser } from "@/layout/SidebarUser";
import * as React from "react";
import { cn } from "@/lib/utils";

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

export function CustomSidebar() {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full w-64 flex-shrink-0 flex-col border-r bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-4">
        <nav className="flex flex-col gap-2">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-700",
                pathname === item.href && "bg-gray-200 dark:bg-gray-700"
              )}
            >
              {item.icon}
              <span className="text-lg font-bold">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <SidebarUser />
      </div>
    </div>
  );
}
