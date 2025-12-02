import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import WisoftLogo from "@/assets/wisoft-fav.webp";
import {Button} from "@/components/ui/button";
import {SidebarMenu, SidebarMenuItem} from "@/components/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export function SidebarUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Item variant="outline">
          <ItemMedia>
            <Avatar>
              <AvatarImage src={WisoftLogo}/>
              <AvatarFallback>WS</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>관리자</ItemTitle>
            <ItemDescription>환영합니다.</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button onClick={() => alert("연장 버튼 클릭!")}>
              연장
            </Button>
          </ItemActions>
        </Item>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}