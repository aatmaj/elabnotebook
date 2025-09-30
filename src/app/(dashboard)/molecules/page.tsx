"use client";

import * as React from "react";
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
import { Badge } from "@/components/ui/badge";

// This data would be fetched from Firestore.
// Query: Sort Molecules by risk_score (desc) and filter where status is NOT 'Filing'.
const molecules = [
  { id: "MOL-003", name: "Paracetamol IV", status: "BE", risk_score: 9.2, patent_expiry_date: "2026-08-15" },
  { id: "MOL-001", name: "Molecule X", status: "Formulation", risk_score: 8.5, patent_expiry_date: "2025-11-20" },
  { id: "MOL-005", name: "Dapoxetine ER", status: "Discovery", risk_score: 7.8, patent_expiry_date: "2027-02-10" },
  { id: "MOL-002", name: "Molecule Y", status: "Discovery", risk_score: 6.1, patent_expiry_date: "2028-01-30" },
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "Discovery": "outline",
  "Formulation": "secondary",
  "BE": "default",
  "Filing": "default", // Although we filter it out, it's good practice to have it.
};


export default function MoleculesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Portfolio Dashboard (Leadership View)</CardTitle>
        <CardDescription>
          High-level overview of the molecule pipeline, sorted by risk.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Molecule Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Risk Score</TableHead>
              <TableHead>Patent Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {molecules.map((molecule) => (
              <TableRow key={molecule.id}>
                <TableCell className="font-medium">{molecule.name}</TableCell>
                <TableCell>
                  <Badge variant={statusVariantMap[molecule.status] || "default"}>
                    {molecule.status}
                  </Badge>
                </TableCell>
                <TableCell>{molecule.risk_score}</TableCell>
                <TableCell>{molecule.patent_expiry_date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
