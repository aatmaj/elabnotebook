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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const experiments = [
  {
    id: "EXP-001",
    name: "CRISPR-Cas9 Gene Editing Efficacy",
    status: "In Progress",
    date: "2023-06-23",
    collaborators: ["user-avatar-1", "user-avatar-2", "user-avatar-3"],
  },
  {
    id: "EXP-002",
    name: "Protein Folding Simulation #3",
    status: "Completed",
    date: "2023-06-15",
    collaborators: ["user-avatar-1"],
  },
  {
    id: "EXP-003",
    name: "Drug Compound Screening - Set B",
    status: "Planning",
    date: "2023-07-01",
    collaborators: ["user-avatar-1", "user-avatar-4"],
  },
  {
    id: "EXP-004",
    name: "Cell Culture Contamination Analysis",
    status: "On Hold",
    date: "2023-05-30",
    collaborators: ["user-avatar-2", "user-avatar-4"],
  },
];

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  "In Progress": "default",
  "Completed": "secondary",
  "Planning": "outline",
  "On Hold": "destructive",
};

export default function ExperimentsPage() {
  const [open, setOpen] = React.useState(false);
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
              Manage your lab experiments and track their progress.
            </CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  New Experiment
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Create New Experiment</DialogTitle>
                <DialogDescription>
                  Enter the details for your new experiment.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" defaultValue="New Experiment Title" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    Experiment ID
                  </Label>
                  <Input id="id" defaultValue={`EXP-${Math.floor(100 + Math.random() * 900)}`} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="notes" className="text-right pt-2">
                    Notes / Observations
                  </Label>
                  <Textarea id="notes" placeholder="Enter unstructured data, observations, and methodologies..." className="col-span-3" rows={6} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button type="submit" onClick={() => setOpen(false)}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Collaborators</TableHead>
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
                <TableCell>
                  <Badge variant={statusVariantMap[experiment.status] || "default"}>
                    {experiment.status}
                  </Badge>
                </TableCell>
                <TableCell>{experiment.date}</TableCell>
                <TableCell>
                  <div className="flex -space-x-2">
                    {experiment.collaborators.map((avatarId, index) => (
                      <Avatar key={index} className="border-2 border-card">
                        <AvatarImage src={getAvatarUrl(avatarId)} />
                        <AvatarFallback>U{index+1}</AvatarFallback>
                      </Avatar>
                    ))}
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
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
