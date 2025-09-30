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
  { href: "/coscientist", icon: Bot, label: "Co-scientist", roles: ["Scientist", "Leadership", "PMO"] },
];

export function DashboardNav({ role }: { role: UserRole }) {
  const pathname = usePathname();

  const filteredNavItems = navItems.filter(item => {
    if (role === "Leadership") return true; // Leadership sees all
    return item.roles.includes(role);
  });

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