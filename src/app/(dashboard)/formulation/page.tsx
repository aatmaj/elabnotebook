"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

type Excipient = {
  id: number;
  name: string;
  quantity: string;
  lotNumber: string;
};

// Placeholder for a future Cloud Function call
const callAutocomplete = async (query: string) => {
  console.log("Searching for excipient:", query);
  // In the future, this will call a Cloud Function endpoint
  // that queries a database of existing excipients.
  const dummyResults = [
    "Microcrystalline Cellulose",
    "Lactose Monohydrate",
    "Croscarmellose Sodium",
    "Magnesium Stearate",
  ];
  return dummyResults.filter(r => r.toLowerCase().includes(query.toLowerCase()));
};


export default function FormulationPage() {
  const [excipients, setExcipients] = React.useState<Excipient[]>([
    { id: 1, name: "", quantity: "", lotNumber: "" },
  ]);

  const addExcipient = () => {
    setExcipients([
      ...excipients,
      { id: Date.now(), name: "", quantity: "", lotNumber: "" },
    ]);
  };

  const removeExcipient = (id: number) => {
    setExcipients(excipients.filter((e) => e.id !== id));
  };
  
  const handleExcipientChange = (id: number, field: keyof Omit<Excipient, 'id'>, value: string) => {
    setExcipients(excipients.map(e => e.id === id ? { ...e, [field]: value } : e));
    
    if (field === 'name') {
      // Trigger autocomplete hook
      callAutocomplete(value);
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>New Formulation Study (Scientist View)</CardTitle>
        <CardDescription>
          Enter experiment details for a new formulation study.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="experiment-id">Experiment ID</Label>
                <Input id="experiment-id" defaultValue={`EXP-${Date.now().toString().slice(-4)}`} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="project-ref">Project Reference</Label>
                <Input id="project-ref" placeholder="e.g., PROJ-003" />
            </div>
        </div>

        <div>
            <Label className="text-base font-medium">Excipients</Label>
            <div className="mt-2 grid gap-4">
                {excipients.map((excipient, index) => (
                <div key={excipient.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center">
                    <div className="grid gap-1 md:col-span-3">
                        <Label htmlFor={`excipient-name-${excipient.id}`} className="sr-only">Name</Label>
                        <Input 
                            id={`excipient-name-${excipient.id}`} 
                            placeholder="Excipient Name" 
                            value={excipient.name}
                            onChange={(e) => handleExcipientChange(excipient.id, 'name', e.target.value)}
                        />
                    </div>
                     <div className="grid gap-1 md:col-span-1">
                         <Label htmlFor={`excipient-qty-${excipient.id}`} className="sr-only">Quantity</Label>
                        <Input 
                            id={`excipient-qty-${excipient.id}`} 
                            placeholder="Qty (mg)" 
                            type="number"
                             value={excipient.quantity}
                            onChange={(e) => handleExcipientChange(excipient.id, 'quantity', e.target.value)}
                        />
                    </div>
                     <div className="grid gap-1 md:col-span-2">
                        <Label htmlFor={`excipient-lot-${excipient.id}`} className="sr-only">Lot Number</Label>
                        <Input 
                            id={`excipient-lot-${excipient.id}`} 
                            placeholder="Lot Number" 
                            value={excipient.lotNumber}
                            onChange={(e) => handleExcipientChange(excipient.id, 'lotNumber', e.target.value)}
                        />
                    </div>
                    <div className="md:col-span-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeExcipient(excipient.id)}
                            disabled={excipients.length === 1}
                            className="text-muted-foreground hover:text-destructive"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                        </Button>
                    </div>
                </div>
                ))}
            </div>
            <Button variant="outline" size="sm" onClick={addExcipient} className="mt-4 gap-1">
                 <PlusCircle className="h-4 w-4" />
                Add Excipient
            </Button>
        </div>

        <div className="grid gap-2">
            <Label htmlFor="raw-data">Raw Data & Observations</Label>
            <Textarea id="raw-data" rows={6} placeholder="Enter unstructured data, observations, and methodologies..." />
        </div>
        
         <div className="grid gap-2">
            <Label htmlFor="outcome">Outcome</Label>
             <Textarea id="outcome" rows={3} placeholder="Describe the outcome, e.g., 'Successful dissolution profile achieved.'"/>
        </div>

      </CardContent>
       <CardFooter>
          <Button>Save Experiment</Button>
      </CardFooter>
    </Card>
  );
}
