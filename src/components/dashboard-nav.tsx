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
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/experiments", icon: Beaker, label: "Experiments" },
  { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/dashboard/ai", icon: Sparkles, label: "AI Tools" },
  { href: "/dashboard/compliance", icon: FileText, label: "Compliance" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar-1");

  return (
    <>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg">
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
        <SidebarGroup>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
               <Avatar className="size-8">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" />}
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="text-sm font-semibold">Dr. S. Rosalind</span>
                <span className="text-xs text-muted-foreground">
                  s.rosalind@pioneerlabs.com
                </span>
              </div>
            </div>
             <SidebarMenuButton variant="ghost" size="icon" className="group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2" asChild>
                <Link href="/">
                    <LogOut />
                </Link>
            </SidebarMenuButton>
          </div>
        </SidebarGroup>
      </SidebarFooter>
    </>
  );
}
