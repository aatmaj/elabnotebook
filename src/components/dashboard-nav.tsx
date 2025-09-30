"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Beaker,
  Bot,
  FlaskConical,
  FolderKanban,
  LayoutDashboard,
} from "lucide-react";
import type { UserRole } from "@/app/(dashboard)/layout";

const navItems = [
  { href: "/molecules", icon: LayoutDashboard, label: "Portfolio", roles: ["Leadership"] },
  { href: "/projects", icon: FolderKanban, label: "Projects", roles: ["PMO", "Leadership"] },
  { href: "/experiments", icon: Beaker, label: "Experiments", roles: ["Scientist", "PMO", "Leadership"] },
  { href: "/formulation", icon: FlaskConical, label: "Formulation Study", roles: ["Scientist"] },
];

export function DashboardNav({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    if (role === "Leadership") {
      // A small hack to show all items for leadership in this view, except formulation
      return item.href !== "/formulation";
    }
    return item.roles.includes(role);
  });

   if (role === 'Leadership') {
    const allItemsForLeadership = [
      { href: "/molecules", icon: LayoutDashboard, label: "Portfolio", roles: ["Leadership"] },
      { href: "/projects", icon: FolderKanban, label: "Projects", roles: ["Leadership", "PMO"] },
      { href: "/experiments", icon: Beaker, label: "Experiments", roles: ["Leadership", "Scientist", "PMO"] },
    ];
    return (
       <SidebarMenu>
          {allItemsForLeadership.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
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
    )
  }


  return (
        <SidebarMenu>
          {filteredNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
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
  );
}
