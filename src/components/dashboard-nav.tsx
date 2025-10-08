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
  Database,
  Scaling,
  Users,
} from "lucide-react";

const navItems = [
  { href: "/scale-up-predictor", icon: Scaling, label: "Predictor" },
  { href: "/master-data", icon: Database, label: "Master Data" },
  { href: "/waitlist", icon: Users, label: "Waitlist" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
        <SidebarMenu>
          {navItems.map((item) => (
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
