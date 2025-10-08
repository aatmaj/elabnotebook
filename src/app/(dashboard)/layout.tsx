
"use client";

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
import { Home, LogOut, Users } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    // If not loading and there's no user, or the user is anonymous, redirect to login.
    if (!isUserLoading && (!user || user.isAnonymous)) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = () => {
    if (auth) {
        auth.signOut();
    }
  };

  // While loading, or if the user is not authenticated (or is anonymous), show loading.
  // The useEffect above will handle the redirect.
  if (isUserLoading || !user || user.isAnonymous) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <p>Loading...</p>
        </div>
    );
  }
  
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                <Link href="/scale-up-predictor" className="flex items-center gap-2 font-bold text-lg">
                    <Logo className="h-6 w-6" />
                    <span className="group-data-[collapsible=icon]:hidden">Scale-Up Predictor</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                 <DashboardNav />
            </SidebarContent>
             <SidebarFooter>
                <Button variant="ghost" onClick={handleSignOut}>
                    <LogOut className='mr-2' /> Sign Out
                </Button>
            </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className="flex h-20 items-center justify-between border-b bg-background px-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="md:hidden" />
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
