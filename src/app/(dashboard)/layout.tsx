
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
import { LogOut } from 'lucide-react';
import { useAuth, useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    // If not loading and there's no user, or the user is anonymous, redirect to login.
    if (!isUserLoading && (!user || user.isAnonymous)) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const handleSignOut = async () => {
    if (auth) {
        await auth.signOut();
        toast({
            title: "Signed out successfully",
            description: "You have been logged out of your account.",
        });
        router.push('/landing');
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
                    {/* The "Return to Landing" button was here */}
                </div>
            </header>
            <main className="flex-1 overflow-auto p-4 md:p-6">
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
