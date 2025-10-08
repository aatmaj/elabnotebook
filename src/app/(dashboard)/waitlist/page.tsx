"use client";

import * as React from "react";
import { useAppStore } from "@/lib/store";
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

export default function WaitlistPage() {
    const { waitlist } = useAppStore();

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
                        A list of all users currently on the waitlist.
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
                            {waitlist.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{format(user.date, "PPP")}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
