
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { CheckCircle, Terminal } from "lucide-react";
import { useFirestore, addDocumentNonBlocking, useAuth } from "@/firebase";
import { collection } from "firebase/firestore";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";


export default function SignupPage() {
    const firestore = useFirestore();
    const auth = useAuth();
    const router = useRouter();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!firestore || !auth) return;

        try {
            // 1. Create the user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // 2. Add user to the waitlist collection
            const waitlistCollection = collection(firestore, 'waitlist');
            addDocumentNonBlocking(waitlistCollection, {
                firstName,
                lastName,
                email,
                date: new Date()
            });

            // 3. Mark as submitted and redirect
            setSubmitted(true);

        } catch (e) {
            const authError = e as AuthError;
            switch (authError.code) {
                case 'auth/email-already-in-use':
                    setError("This email is already registered. Please try logging in instead.");
                    break;
                case 'auth/weak-password':
                    setError("The password is too weak. Please use at least 6 characters.");
                    break;
                case 'auth/invalid-email':
                    setError("Please enter a valid email address.");
                    break;
                default:
                    setError("An unexpected error occurred. Please try again.");
                    break;
            }
        }
    };

    if (submitted) {
        return (
             <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">You're on the list!</CardTitle>
                    <CardDescription>
                       Thank you for signing up! You can now log in to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center text-center p-8">
                        <CheckCircle className="w-16 h-16 text-primary mb-4" />
                        <p className="text-muted-foreground">We've created your account and added you to our waitlist.</p>
                        <Button asChild className="mt-6">
                            <Link href="/login">Proceed to Login</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Sign up to get access to Paramanu and be added to our waitlist.
        </CardDescription>
      </CardHeader>
        <form onSubmit={handleSubmit}>
            <CardContent>
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Signup Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input
                        id="first-name"
                        placeholder="Max"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    </div>
                    <div className="grid gap-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input
                        id="last-name"
                        placeholder="Robinson"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                        id="password" 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Create account
                </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline">
                    Sign in
                </Link>
                </div>
            </CardContent>
        </form>
    </Card>
  );
}
