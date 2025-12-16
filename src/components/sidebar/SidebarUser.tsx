import { Clock, LogOut } from "lucide-react";

import WisoftLogo from "@/assets/wisoft-fav.webp";
import { LoginTimer } from "@/components/sidebar/LoginTimer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLoginExtends, useLogout } from "@/hooks/auth/mutations";

export function SidebarUser() {
  const { mutate: logout } = useLogout();
  const { mutate: loginExtends } = useLoginExtends();

  const handleLogout = async () => logout();
  const handleLoginExtends = async () => loginExtends();

  return (
    <div className="flex items-center p-2 border-t">
      <Avatar className="h-9 w-9">
        <AvatarImage src={WisoftLogo} />
        <AvatarFallback>WS</AvatarFallback>
      </Avatar>
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
          관리자
        </p>
        <LoginTimer />
      </div>
      <div className="ml-auto flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleLoginExtends}
            >
              <Clock className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>연장</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>로그아웃</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
