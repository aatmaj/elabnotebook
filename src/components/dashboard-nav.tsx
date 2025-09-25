"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Beaker,
  FileText,
  Home,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Logo } from "@/components/logo";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar-1");

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Logo className="h-6 w-6" />
          <span>Paramanu</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarSeparator />
      </SidebarFooter>
    </>
  );
}
