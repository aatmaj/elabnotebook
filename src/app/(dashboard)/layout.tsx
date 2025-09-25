import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { Atom } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <DashboardNav />
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <SidebarTrigger asChild className="md:hidden">
             <Button variant="ghost" size="icon">
                <Atom className="size-5"/>
              </Button>
          </SidebarTrigger>
          <div className="flex items-center gap-2 font-bold text-lg md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Atom className="h-6 w-6 text-primary" />
              <span className="font-headline">Paramanu</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 sm:px-6 sm:py-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
