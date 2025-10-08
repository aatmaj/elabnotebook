
"use client";

import * as React from "react";
import { useFirestore, useCollection, useMemoFirebase, useUser } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import type { WaitlistUser } from "@/lib/store";


export default function WaitlistPage() {
    const firestore = useFirestore();
    const { user, isUserLoading: isUserLoading } = useUser();
    
    const waitlistQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        // Only allow the specific user to query the collection
        if (user?.email === 'phaniksrm@gmail.com') {
            return query(collection(firestore, "waitlist"), orderBy("date", "desc"));
        }
        return null;
    }, [firestore, user]);

    const { data: waitlist, isLoading: isWaitlistLoading } = useCollection<WaitlistUser>(waitlistQuery);

    if (isUserLoading) {
        return (
            <div className="space-y-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-96" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-80" />
                    </CardHeader>
                    <CardContent>
                       <Skeleton className="h-48 w-full" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (user?.email !== 'phaniksrm@gmail.com') {
        return (
             <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Permission Denied</h1>
                    <p className="text-muted-foreground">
                        You do not have access to this page.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Users</h1>
                <p className="text-muted-foreground">
                    A list of users who have signed up and joined the waitlist.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Platform Users & Waitlist</CardTitle>
                    <CardDescription>
                        A real-time list of all users who have created an account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>First Name</TableHead>
                                <TableHead>Last Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Signup Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isWaitlistLoading ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                    </TableRow>
                                ))
                            ) : waitlist && waitlist.length > 0 ? (
                                waitlist.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.date && user.date.toDate ? format(user.date.toDate(), "PPP") : 'N/A'}</TableCell>
                                </TableRow>
                            ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        No users on the waitlist yet.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
