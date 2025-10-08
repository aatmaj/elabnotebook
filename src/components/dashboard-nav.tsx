
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
import { useUser } from "@/firebase";

const allNavItems = [
  { href: "/scale-up-predictor", icon: Scaling, label: "Predictor", adminOnly: false },
  { href: "/master-data", icon: Database, label: "Master Data", adminOnly: false },
  { href: "/waitlist", icon: Users, label: "Users", adminOnly: true },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = React.useMemo(() => {
    if (!user) return [];
    return allNavItems.filter(item => {
        if (item.adminOnly) {
            return user.email === 'phaniksrm@gmail.com';
        }
        return true;
    });
  }, [user]);

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
