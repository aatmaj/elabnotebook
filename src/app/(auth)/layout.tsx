
'use client';

import Link from "next/link";
import { Logo } from "@/components/logo";
import { useAuth, initiateAnonymousSignIn, useUser } from "@/firebase";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();

  React.useEffect(() => {
    // If user is not logged in and we are not in the process of loading the user
    // sign them in anonymously. This is required for the user to be able to
    // have the permissions to even sign up or log in.
    if (!isUserLoading && !user) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);


  return (
    <div className="flex min-h-screen flex-col">
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Logo className="h-6 w-6" />
            <span>Paramanu</span>
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}
