import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter
} from '@/components/ui/sidebar';
import { DashboardNav } from '@/components/dashboard-nav';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { LogOut } from 'lucide-react';
import { Home } from 'lucide-react';

// Define user roles
export type UserRole = "Scientist" | "PMO" | "Leadership";

// Simulate the current user's role. In a real app, this would come from your auth provider.
const currentUserRole: UserRole = "Leadership";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userAvatar = PlaceHolderImages.find((img) => img.id === "user-avatar-1");
  
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <Link href="/molecules" className="flex items-center gap-2 font-bold text-lg">
                    <Logo className="h-6 w-6" />
                    <span className="group-data-[collapsible=icon]:hidden">Paramanu</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                 <DashboardNav role={currentUserRole} />
            </SidebarContent>
             <SidebarFooter>
                <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar?.imageUrl} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm group-data-[collapsible=icon]:hidden">
                        <span className="font-medium text-sidebar-foreground">Leadership User</span>
                        <span className="text-muted-foreground text-xs">leadership@paramanu.ai</span>
                    </div>
                     <Button variant="ghost" size="icon" className="ml-auto group-data-[collapsible=icon]:hidden">
                        <LogOut />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-20 items-center justify-between border-b bg-background px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden" />
                    <h1 className="text-lg font-semibold">Dashboard</h1>
                </div>
                 <div className="flex items-center gap-4">
                    <Button variant="outline" asChild>
                        <Link href="/landing"><Home className='mr-2' /> Return to Landing</Link>
                    </Button>
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
