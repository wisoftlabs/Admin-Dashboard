import { useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WisoftLogo from "@/assets/wisoft-fav.webp";
import { useAuthStore } from "@/store/useAuthStore";
import { Clock, LogOut } from "lucide-react";

export function SidebarUser() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
          환영합니다.
        </p>
      </div>
      <div className="ml-auto flex items-center space-x-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => alert("연장 버튼 클릭!")}
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