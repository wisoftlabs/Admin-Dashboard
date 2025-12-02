import {Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle} from "@/components/ui/item";
import {UserIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export function SidebarUser() {
  return <Item>
    <ItemMedia>
      <UserIcon className="size-8"/>
    </ItemMedia>
    <ItemContent>
      <ItemTitle>관리자</ItemTitle>
      <ItemDescription>환영합니다.</ItemDescription>
    </ItemContent>
    <ItemActions>
      <Button>
        연장
      </Button>
    </ItemActions>
  </Item>
}