
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
import { PlusCircle, Trash2, Paperclip, Bot, File as FileIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { summarizeExperiment, enhanceText } from "@/app/actions/ai-actions";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useExperimentStore } from "@/lib/store";
import { useRouter } from "next/navigation";

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
  const { toast } = useToast();
  const router = useRouter();
  const addExperiment = useExperimentStore((state) => state.addExperiment);

  const [excipients, setExcipients] = React.useState<Excipient[]>([
    { id: 1, name: "", quantity: "", lotNumber: "" },
  ]);
  const [attachments, setAttachments] = React.useState<File[]>([]);
  const [isSummarizing, setIsSummarizing] = React.useState(false);
  const [isEnhancing, setIsEnhancing] = React.useState<null | 'rawData' | 'outcome'>(null);
  const [summary, setSummary] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [rawData, setRawData] = React.useState("");
  const [outcome, setOutcome] = React.useState("");


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
      callAutocomplete(value);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setAttachments(Array.from(event.target.files));
    }
  };

  const handleRemoveAttachment = (fileName: string) => {
    setAttachments(attachments.filter(f => f.name !== fileName));
  };
  
  const handleGenerateSummary = async () => {
    if (attachments.length === 0) {
      toast({
        variant: "destructive",
        title: "No file selected",
        description: "Please attach a file to generate a summary.",
      });
      return;
    }
    
    setIsSummarizing(true);
    setSummary(null);

    const file = attachments[0];
    if (!file) {
        setIsSummarizing(false);
        return;
    }
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = async () => {
      const fileContent = reader.result as string;
      try {
        const result = await summarizeExperiment({ experimentDetails: fileContent });
        setSummary(result.summary);
      } catch (error) {
        console.error("Error generating summary:", error);
        toast({
          variant: "destructive",
          title: "Summarization Failed",
          description: "Could not generate summary from the attached file.",
        });
      } finally {
        setIsSummarizing(false);
      }
    };
    reader.onerror = () => {
       toast({
        variant: "destructive",
        title: "File Read Error",
        description: "Could not read the attached file.",
      });
      setIsSummarizing(false);
    }
  };

  const handleEnhanceText = async (field: 'rawData' | 'outcome') => {
    const textToEnhance = field === 'rawData' ? rawData : outcome;
    if (!textToEnhance.trim()) {
        toast({
            variant: "destructive",
            title: "No text to enhance",
            description: "Please enter some text before using the AI enhancement.",
        });
        return;
    }

    setIsEnhancing(field);
    try {
        const context = field === 'rawData' ? 'Raw Data & Observations' : 'Outcome';
        const result = await enhanceText({ text: textToEnhance, context });
        if (field === 'rawData') {
            setRawData(result.enhancedText);
        } else {
            setOutcome(result.enhancedText);
        }
    } catch (error) {
        console.error(`Error enhancing ${field}:`, error);
        toast({
            variant: "destructive",
            title: "Enhancement Failed",
            description: "The AI could not enhance the text.",
        });
    } finally {
        setIsEnhancing(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const experimentId = formData.get("experiment-id") as string;
    const projectRef = formData.get("project-ref") as string;
    
    const newExperiment = {
        id: experimentId,
        name: `New Study: ${experimentId}`, // Simple name for now
        project: projectRef,
        date: new Date().toISOString().split('T')[0], // Today's date
        scientist: 'user-avatar-4', // Placeholder for current user
        tags: ['new', 'formulation'],
        methodology: rawData,
        outcome: outcome,
    };

    addExperiment(newExperiment);

    toast({
      title: "Experiment Saved",
      description: "Your new formulation study has been successfully saved.",
    });

    router.push('/experiments');
  };

  return (
    <form onSubmit={handleSubmit}>
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
                  <Input name="experiment-id" id="experiment-id" defaultValue={`EXP-${Date.now().toString().slice(-4)}`} />
              </div>
              <div className="grid gap-2">
                  <Label htmlFor="project-ref">Project Reference</Label>
                  <Input name="project-ref" id="project-ref" placeholder="e.g., PROJ-003" />
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
                              type="button"
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
              <Button variant="outline" size="sm" type="button" onClick={addExcipient} className="mt-4 gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Add Excipient
              </Button>
          </div>

          <div className="grid gap-2">
              <Label htmlFor="attachments">Attachments</Label>
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="mr-2 h-4 w-4" />
                  Add Files
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple
                />
                 {attachments.length > 0 && (
                  <Button type="button" onClick={handleGenerateSummary} disabled={isSummarizing}>
                    <Bot className="mr-2 h-4 w-4" />
                    {isSummarizing ? "Summarizing..." : "Generate Summary"}
                  </Button>
                )}
              </div>
              <div className="mt-2 space-y-2">
                {attachments.map((file) => (
                  <div key={file.name} className="flex items-center justify-between p-2 rounded-md border text-sm">
                    <div className="flex items-center gap-2">
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{file.name}</span>
                      <Badge variant="outline">{(file.size / 1024).toFixed(2)} KB</Badge>
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveAttachment(file.name)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
          </div>
          
          {summary && (
              <Alert>
                <Bot className="h-4 w-4" />
                <AlertTitle>AI Summary</AlertTitle>
                <AlertDescription>
                  {summary}
                </AlertDescription>
              </Alert>
          )}

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="raw-data">Raw Data & Observations</Label>
              <Button type="button" variant="ghost" size="sm" onClick={() => handleEnhanceText('rawData')} disabled={isEnhancing === 'rawData'}>
                <Bot className="mr-2 h-4 w-4" />
                {isEnhancing === 'rawData' ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
            </div>
              <Textarea name="raw-data" id="raw-data" rows={6} placeholder="Enter unstructured data, observations, and methodologies..." value={rawData} onChange={(e) => setRawData(e.target.value)} />
          </div>
          
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="outcome">Outcome</Label>
               <Button type="button" variant="ghost" size="sm" onClick={() => handleEnhanceText('outcome')} disabled={isEnhancing === 'outcome'}>
                <Bot className="mr-2 h-4 w-4" />
                {isEnhancing === 'outcome' ? 'Enhancing...' : 'Enhance with AI'}
              </Button>
            </div>
              <Textarea name="outcome" id="outcome" rows={3} placeholder="Describe the outcome, e.g., 'Successful dissolution profile achieved.'" value={outcome} onChange={(e) => setOutcome(e.target.value)} />
          </div>

        </CardContent>
        <CardFooter>
            <Button type="submit">Save Experiment</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
