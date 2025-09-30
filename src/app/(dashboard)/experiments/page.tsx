"use client";

import * as React from "react";
import { PlusCircle, MoreHorizontal, Search } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

const allExperiments = [
  {
    id: "EXP-001",
    name: "Metformin ER 500mg Dissolution Study",
    project: "PROJ-001",
    date: "2023-11-10",
    scientist: "user-avatar-1",
    tags: ["metformin", "dissolution", "qbd"],
    outcome: "F2 similarity achieved against innovator."
  },
  {
    id: "EXP-002",
    name: "Amlodipine Besylate API Characterization",
    project: "PROJ-002",
    date: "2023-10-22",
    scientist: "user-avatar-2",
    tags: ["api-char", "amlodipine", "polymorphism"],
    outcome: "Polymorphic Form A confirmed by XRD."
  },
  {
    id: "EXP-003",
    name: "Paracetamol IV Excipient Compatibility",
    project: "PROJ-003",
    date: "2023-09-05",
    scientist: "user-avatar-1",
    tags: ["formulation", "excipients", "hplc"],
    outcome: "No significant degradation with tested excipients."
  },
    {
    id: "EXP-004",
    name: "Dapoxetine ER Stability - 3 Month Accelerated",
    project: "PROJ-005",
    date: "2024-01-15",
    scientist: "user-avatar-3",
    tags: ["stability", "dapoxetine", "accelerated"],
    outcome: "Assay and impurity levels within acceptable limits."
  },
  {
    id: "EXP-005",
    name: "Metformin ER - Wet Granulation Trial",
    project: "PROJ-001",
    date: "2023-12-01",
    scientist: "user-avatar-2",
    tags: ["metformin", "granulation", "process-dev"],
    outcome: "Good flowability achieved with 10% binder."
  }
];

export default function ExperimentsPage() {
  const avatars = PlaceHolderImages.filter(img => img.id.includes('user-avatar'));
  const [searchQuery, setSearchQuery] = React.useState("");

  const getAvatarUrl = (id: string) => {
    return avatars.find(avatar => avatar.id === id)?.imageUrl || "";
  }
  
  const filteredExperiments = allExperiments.filter(experiment => {
    const searchContent = [
      experiment.id,
      experiment.name,
      experiment.project,
      experiment.date,
      ...experiment.tags,
      experiment.outcome,
    ].join(" ").toLowerCase();

    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');

    if (searchTerms.length === 0) {
      return true;
    }

    return searchTerms.every(term => searchContent.includes(term));
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <div>
            <CardTitle>Experiment Library</CardTitle>
            <CardDescription>
              Browse and intelligently search all experiments across projects.
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
        <div className="relative mt-4">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search experiments by name, tag, outcome..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
            {filteredExperiments.map((experiment) => (
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
