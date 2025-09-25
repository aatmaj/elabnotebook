import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { LandingHeader } from '@/components/landing-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-grow">
          {children}
      </main>
    </div>
  );
}
