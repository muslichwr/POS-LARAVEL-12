import * as React from "react";
import {
  IconDashboard,
  IconFolder,
  IconUsers,
  IconInnerShadowTop,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useMemo } from "react";
import { Link, usePage } from "@inertiajs/react";

// Data menu (tanpa data pengguna hardcode)
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
  ],
  navAdmin: [
    {
      title: "Dashboard",
      url: "/admin/dashboard/",
      icon: IconDashboard,
    },
    {
      title: "Manage Users",
      url: "/admin/user/index/",
      icon: IconUsers,
    },
    {
      title: "Manage Products",
      url: "/admin/product/index/",
      icon: IconUsers,
    },
  ],
  navCashier: [
    {
      title: "Dashboard",
      url: "/cashier/dashboard/",
      icon: IconDashboard,
    },
    {
      title: "Management Products",
      url: "/admin/product/index",
      icon: IconFolder,
    },
    {
      title: "Management Transaksi",
      url: "/cashier/transaction/index",
      icon: IconFolder,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { auth } = usePage().props;
  const userRole = auth?.user?.role || "user";
  const user = auth?.user || {
    name: "Guest",
    email: "",
    avatar: "",
  }; // Jika tidak login, tampilkan default

  const roleBasedNavItems = useMemo(() => {
    switch (userRole) {
      case "admin":
        return [...data.navAdmin,...data.navCashier];
      case "cashier":
        return [...data.navCashier];
      default:
        return data.navMain;
    }
  }, [userRole]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard" prefetch> {/* Tambahkan Link untuk Dashboard */}
                <div className="flex items-center gap-2">
                  <IconInnerShadowTop className="!size-5" />
                  <span className="text-base font-semibold">Acme Inc.</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={roleBasedNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser 
          user={{
            name: user.name,
            email: user.email,
            avatar: user.avatar, // Pastikan server mengirim avatar
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}