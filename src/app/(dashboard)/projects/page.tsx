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
import { Progress } from "@/components/ui/progress";

const projects = [
    { 
        id: "PROJ-003", 
        name: "Paracetamol IV Formulation", 
        molecule_ref: "MOL-003", 
        status_bar: ["Discovery", "Formulation", "BE", "Filing"], 
        current_milestone: "BE", 
        expected_timeline_end: "2024-12-31"
    },
    { 
        id: "PROJ-001", 
        name: "Molecule X Development", 
        molecule_ref: "MOL-001", 
        status_bar: ["Discovery", "Formulation", "BE", "Filing"], 
        current_milestone: "Formulation", 
        expected_timeline_end: "2025-06-30"
    },
     { 
        id: "PROJ-005", 
        name: "Dapoxetine ER Initial Studies", 
        molecule_ref: "MOL-005", 
        status_bar: ["Discovery", "Formulation", "BE", "Filing"], 
        current_milestone: "Discovery", 
        expected_timeline_end: "2025-09-15"
    },
];

const getProgressValue = (current: string, all: string[]) => {
    const currentIndex = all.indexOf(current);
    if (currentIndex === -1) return 0;
    return ((currentIndex + 1) / all.length) * 100;
}

export default function ProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Tracker (PMO View)</CardTitle>
        <CardDescription>
            Monitor project timelines and milestone progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Current Milestone</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Expected Completion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{project.current_milestone}</Badge>
                </TableCell>
                <TableCell>
                    <div className="flex items-center gap-4">
                        <Progress value={getProgressValue(project.current_milestone, project.status_bar)} className="w-[60%]" />
                        <span>{Math.round(getProgressValue(project.current_milestone, project.status_bar))}%</span>
                    </div>
                </TableCell>
                <TableCell>{project.expected_timeline_end}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
