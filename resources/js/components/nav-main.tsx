import { type Icon } from "@tabler/icons-react";
import { Link } from "@inertiajs/react"; // Tambahkan import Link dari Inertia
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        {/* Wrap SidebarMenuButton dengan Link dari InertiaJS */}
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <Link href={item.url} prefetch> {/* Tambahkan Link di sini */}
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon className="size-4" />} {/* Tambahkan className untuk ukuran ikon */}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}