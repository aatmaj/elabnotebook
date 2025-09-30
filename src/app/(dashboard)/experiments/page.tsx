"use client";

import * as React from "react";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const experiments = [
  {
    id: "EXP-001",
    name: "CRISPR-Cas9 Gene Editing Efficacy",
    project: "PROJ-001",
    date: "2023-06-23",
    scientist: "user-avatar-1",
    tags: ["crispr", "gene-editing"],
    outcome: "Successful gene insertion with 92% efficiency."
  },
  {
    id: "EXP-002",
    name: "Protein Folding Simulation #3",
    project: "PROJ-002",
    date: "2023-06-15",
    scientist: "user-avatar-2",
    tags: ["simulation", "protein-folding"],
    outcome: "Model inconclusive. Requires parameter tuning."
  },
  {
    id: "EXP-003",
    name: "Formulation Study - Round 1",
    project: "PROJ-003",
    date: "2023-07-01",
    scientist: "user-avatar-1",
    tags: ["formulation", "dissolution"],
    outcome: "Successful dissolution profile achieved."
  },
];

export default function ExperimentsPage() {
  const avatars = PlaceHolderImages.filter(img => img.id.includes('user-avatar'));

  const getAvatarUrl = (id: string) => {
    return avatars.find(avatar => avatar.id === id)?.imageUrl || "";
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Experiments</CardTitle>
            <CardDescription>
              Browse and manage all experiments across projects.
            </CardDescription>
          </div>
           <Button size="sm" className="gap-1" asChild>
             <Link href="/formulation">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Experiment
                </span>
              </Link>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Scientist</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {experiments.map((experiment) => (
              <TableRow key={experiment.id}>
                <TableCell className="font-medium">{experiment.id}</TableCell>
                <TableCell className="font-medium">{experiment.name}</TableCell>
                <TableCell>{experiment.project}</TableCell>
                <TableCell>{experiment.date}</TableCell>
                <TableCell>
                  <Avatar className="h-8 w-8 border-2 border-card">
                    <AvatarImage src={getAvatarUrl(experiment.scientist)} />
                    <AvatarFallback>S</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                    <div className="flex gap-1">
                        {experiment.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
