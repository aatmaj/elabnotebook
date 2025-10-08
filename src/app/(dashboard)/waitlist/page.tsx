"use client";

import * as React from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
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
    
    const waitlistQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, "waitlist"), orderBy("date", "desc"));
    }, [firestore]);

    const { data: waitlist, isLoading } = useCollection<WaitlistUser>(waitlistQuery);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Waitlist</h1>
                <p className="text-muted-foreground">
                    Users who have signed up to join the platform.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Waitlist Signups</CardTitle>
                    <CardDescription>
                        A real-time list of all users currently on the waitlist.
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
                            {isLoading ? (
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
                                    <TableCell>{user.date ? format(user.date.toDate(), "PPP") : 'N/A'}</TableCell>
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
