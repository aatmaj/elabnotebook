
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
import { useRouter } from "next/navigation";
import { useAuth } from "@/firebase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useUser } from "@/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, AuthError } from "firebase/auth";

export default function LoginPage() {
    const router = useRouter();
    const auth = useAuth();
    const { user, isUserLoading } = useUser();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // The onAuthStateChanged listener in the layout will handle the redirect
        } catch (e) {
            const authError = e as AuthError;
            switch (authError.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    setError("Invalid email or password. Please try again.");
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

    React.useEffect(() => {
        if (!isUserLoading && user) {
            router.push("/scale-up-predictor");
        }
    }, [user, isUserLoading, router]);

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-4">
                    {error && (
                        <Alert variant="destructive">
                            <Terminal className="h-4 w-4" />
                            <AlertTitle>Authentication Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
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
                        Sign in
                    </Button>
                </CardContent>
            </form>
            <div className="mt-4 text-center text-sm p-6 pt-0">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline">
                    Join Waitlist
                </Link>
            </div>
        </Card>
    );
}
