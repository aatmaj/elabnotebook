
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
import { CheckCircle } from "lucide-react";
import { useFirestore, addDocumentNonBlocking } from "@/firebase";
import { collection } from "firebase/firestore";

export default function SignupPage() {
    const firestore = useFirestore();
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [submitted, setSubmitted] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!firestore) return;

        const waitlistCollection = collection(firestore, 'waitlist');
        addDocumentNonBlocking(waitlistCollection, {
            firstName,
            lastName,
            email,
            date: new Date()
        });

        setSubmitted(true);
    };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{submitted ? "You're on the list!" : "Join the Waitlist"}</CardTitle>
        <CardDescription>
          {submitted
            ? "Thank you for your interest! We'll be in touch soon."
            : "Sign up to be one of the first to get access to Paramanu."
          }
        </CardDescription>
      </CardHeader>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
            <CardContent>
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
                <Button type="submit" className="w-full">
                    Join Waitlist
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
      ) : (
        <CardContent>
            <div className="flex flex-col items-center justify-center text-center p-8">
                <CheckCircle className="w-16 h-16 text-primary mb-4" />
                <p className="text-muted-foreground">We've received your information and will notify you when access is ready.</p>
                 <Button variant="outline" asChild className="mt-6">
                    <Link href="/landing">Return to Homepage</Link>
                </Button>
            </div>
        </CardContent>
      )}
    </Card>
  );
}
