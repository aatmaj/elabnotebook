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
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Placeholder data - this will be managed via a backend and state management
const masterData = {
  plants: [
    { id: 1, name: "PharmaPlant A", location: "New Jersey", category: "Pilot", vertical: "OSD", market: "USA" },
    { id: 2, name: "PharmaPlant B", location: "Hyderabad", category: "Plant 1", vertical: "Injectable", market: "India" },
  ],
  equipment: [
    { id: 1, name: "Granulator-01", type: "Top Spray Granulator", plant: "PharmaPlant A", capacity: "100L" },
    { id: 2, name: "Compressor-5", type: "Tablet Press", plant: "PharmaPlant B", capacity: "500,000 tablets/hr" },
  ],
  parameters: [
    { id: 1, name: "Spray Rate", unitOp: "Granulation", min: 50, max: 200, unit: "mL/min" },
    { id: 2, name: "Turret Speed", unitOp: "Compression", min: 10, max: 60, unit: "RPM" },
  ]
};

export default function MasterDataPage() {
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Master Data Management</h1>
            <p className="text-muted-foreground">
              Manage all plants, equipment, and process parameters.
            </p>
          </div>
           <Button size="sm" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add New
              </span>
            </Button>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Plants</CardTitle>
          <CardDescription>
            Manage manufacturing plant locations and their attributes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Vertical</TableHead>
                <TableHead>Market</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masterData.plants.map((plant) => (
                <TableRow key={plant.id}>
                  <TableCell className="font-medium">{plant.name}</TableCell>
                  <TableCell>{plant.location}</TableCell>
                  <TableCell>{plant.category}</TableCell>
                  <TableCell>{plant.vertical}</TableCell>
                  <TableCell>{plant.market}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Equipment</CardTitle>
          <CardDescription>
            Manage all equipment linked to specific plants.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Linked Plant</TableHead>
                <TableHead>Capacity/Speed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {masterData.equipment.map((equip) => (
                <TableRow key={equip.id}>
                  <TableCell className="font-medium">{equip.name}</TableCell>
                  <TableCell>{equip.type}</TableCell>
                  <TableCell>{equip.plant}</TableCell>
                  <TableCell>{equip.capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
