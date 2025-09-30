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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

type Experiment = {
  id: string;
  name: string;
  project: string;
  date: string;
  scientist: string;
  tags: string[];
  methodology: string;
  outcome: string;
};


const allExperiments: Experiment[] = [
  {
    id: "EXP-001",
    name: "Metformin ER 500mg Dissolution Study",
    project: "PROJ-001",
    date: "2023-11-10",
    scientist: "user-avatar-1",
    tags: ["metformin", "dissolution", "qbd"],
    methodology: "USP Apparatus II (Paddles) at 50 RPM in 900mL of phosphate buffer at pH 6.8. Samples taken at 1, 2, 4, 6, and 8 hours.",
    outcome: "F2 similarity factor of 68 achieved against the reference listed drug (RLD), meeting the bioequivalence acceptance criteria."
  },
  {
    id: "EXP-002",
    name: "Amlodipine Besylate API Characterization",
    project: "PROJ-002",
    date: "2023-10-22",
    scientist: "user-avatar-2",
    tags: ["api-char", "amlodipine", "polymorphism"],
    methodology: "Powder X-Ray Diffraction (PXRD) analysis performed on the raw API lot #AB-2023-10-05. Scanned from 2° to 40° 2θ.",
    outcome: "Characteristic peaks at 10.1°, 20.3°, and 25.4° 2θ confirm the material is consistent with Polymorphic Form A."
  },
  {
    id: "EXP-003",
    name: "Paracetamol IV Excipient Compatibility",
    project: "PROJ-003",
    date: "2023-09-05",
    scientist: "user-avatar-1",
    tags: ["formulation", "excipients", "hplc"],
    methodology: "Binary mixtures of Paracetamol API with various excipients (Mannitol, Cysteine HCl, Sodium Chloride) were stored at 40°C/75% RH for 4 weeks. Analyzed by a stability-indicating HPLC method.",
    outcome: "No significant degradation or new impurity peaks observed with any of the tested excipients. All excipients deemed compatible."
  },
    {
    id: "EXP-004",
    name: "Dapoxetine ER Stability - 3 Month Accelerated",
    project: "PROJ-005",
    date: "2024-01-15",
    scientist: "user-avatar-3",
    tags: ["stability", "dapoxetine", "accelerated"],
    methodology: "Finished tablets from Lot #DAP-ER-23-01 stored at 40°C/75% RH. Tested for Assay, Impurities, and Dissolution at the 3-month timepoint.",
    outcome: "Assay remains at 99.5%. Total impurities at 0.12%. Dissolution profile remains within specification. The formulation is stable under accelerated conditions."
  },
  {
    id: "EXP-005",
    name: "Metformin ER - Wet Granulation Trial",
    project: "PROJ-001",
    date: "2023-12-01",
    scientist: "user-avatar-2",
    tags: ["metformin", "granulation", "process-dev"],
    methodology: "High-shear wet granulation process trial using a 10% povidone (PVP K30) binder solution. Granules were dried to a target LOD of 2.0%.",
    outcome: "Good granule flowability (Angle of Repose: 28°) and compressibility achieved. Suitable for tablet compression trials."
  }
];

export default function ExperimentsPage() {
  const avatars = PlaceHolderImages.filter(img => img.id.includes('user-avatar'));
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedExperiment, setSelectedExperiment] = React.useState<Experiment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const getAvatarUrl = (id: string) => {
    return avatars.find(avatar => avatar.id === id)?.imageUrl || "";
  }

  const handleViewDetails = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setIsDialogOpen(true);
  };
  
  const filteredExperiments = allExperiments.filter(experiment => {
    const searchContent = [
      experiment.id,
      experiment.name,
      experiment.project,
      experiment.date,
      ...experiment.tags,
      experiment.methodology,
      experiment.outcome,
    ].join(" ").toLowerCase();

    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.trim() !== '');

    if (searchTerms.length === 0) {
      return true;
    }

    return searchTerms.every(term => searchContent.includes(term));
  });

  return (
    <>
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
                    <div className="flex gap-1 flex-wrap">
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
                      <DropdownMenuItem onClick={() => handleViewDetails(experiment)}>
                        View Details
                      </DropdownMenuItem>
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

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Experiment Details</DialogTitle>
            <DialogDescription>
              Detailed information for experiment: {selectedExperiment?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedExperiment && (
            <div className="grid gap-4 py-4 text-sm">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <div id="name" className="col-span-3 font-semibold">{selectedExperiment.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Project
                </Label>
                <div id="project" className="col-span-3">{selectedExperiment.project}</div>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <div id="date" className="col-span-3">{selectedExperiment.date}</div>
              </div>
               <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="scientist" className="text-right">
                  Scientist
                </Label>
                 <div id="scientist" className="col-span-3 flex items-center gap-2">
                    <Avatar className="h-6 w-6 border-2 border-card">
                        <AvatarImage src={getAvatarUrl(selectedExperiment.scientist)} />
                        <AvatarFallback>S</AvatarFallback>
                    </Avatar>
                    <span>{selectedExperiment.scientist}</span>
                 </div>
              </div>

              <Separator className="my-4" />
              
              <div className="grid gap-2">
                 <Label htmlFor="methodology">Methodology</Label>
                 <p id="methodology" className="text-muted-foreground p-3 bg-secondary/30 rounded-md border">
                    {selectedExperiment.methodology}
                 </p>
              </div>

               <div className="grid gap-2">
                 <Label htmlFor="outcome">Outcome</Label>
                 <p id="outcome" className="text-muted-foreground p-3 bg-secondary/30 rounded-md border">
                    {selectedExperiment.outcome}
                 </p>
              </div>

            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
