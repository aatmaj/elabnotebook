"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { BrainCircuit, Loader, Share2, Sparkles } from "lucide-react";
import { summarizeExperiment, generateKnowledgeGraph } from "@/app/actions/ai-actions";
import { useToast } from "@/hooks/use-toast";

export default function AiToolsPage() {
  const [summaryInput, setSummaryInput] = React.useState("");
  const [summaryResult, setSummaryResult] = React.useState("");
  const [isSummaryLoading, setIsSummaryLoading] = React.useState(false);

  const [graphInput, setGraphInput] = React.useState("");
  const [graphResult, setGraphResult] = React.useState<{knowledgeGraph?: string, novelHypotheses?: string}>({});
  const [isGraphLoading, setIsGraphLoading] = React.useState(false);
  
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!summaryInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some experiment details to summarize.",
        variant: "destructive",
      });
      return;
    }
    setIsSummaryLoading(true);
    setSummaryResult("");
    try {
      const result = await summarizeExperiment({ experimentDetails: summaryInput });
      setSummaryResult(result.summary);
    } catch (error) {
      console.error(error);
       toast({
        title: "Error",
        description: "Failed to generate summary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummaryLoading(false);
    }
  };

  const handleGenerateGraph = async () => {
     if (!graphInput.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some experimental data to generate a knowledge graph.",
        variant: "destructive",
      });
      return;
    }
    setIsGraphLoading(true);
    setGraphResult({});
    try {
        const result = await generateKnowledgeGraph({ experimentalData: graphInput });
        setGraphResult(result);
    } catch (error) {
        console.error(error);
        toast({
            title: "Error",
            description: "Failed to generate knowledge graph. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsGraphLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI-Powered Tools</h1>
        <p className="text-muted-foreground">
          Leverage generative AI to accelerate your research and uncover novel insights.
        </p>
      </div>
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">
            <Sparkles className="mr-2 h-4 w-4" />
            Experiment Summary
          </TabsTrigger>
          <TabsTrigger value="knowledge-graph">
            <Share2 className="mr-2 h-4 w-4" />
            Knowledge Graph
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>AI-driven Experiment Summaries</CardTitle>
              <CardDescription>
                Paste your complex experiment details, methodology, and results below to get a concise summary.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full gap-2">
                <Label htmlFor="summary-input">Experiment Details</Label>
                <Textarea
                  id="summary-input"
                  placeholder="Enter your detailed experimental data here..."
                  rows={8}
                  value={summaryInput}
                  onChange={(e) => setSummaryInput(e.target.value)}
                  disabled={isSummaryLoading}
                />
              </div>
              {isSummaryLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {summaryResult && (
                <Card className="bg-muted">
                    <CardHeader className="flex flex-row items-center gap-2">
                        <BrainCircuit className="h-5 w-5 text-primary"/>
                        <CardTitle className="text-lg">Generated Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{summaryResult}</p>
                    </CardContent>
                </Card>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleSummarize} disabled={isSummaryLoading}>
                {isSummaryLoading ? 'Generating...' : 'Generate Summary'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="knowledge-graph">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Graph Generation</CardTitle>
              <CardDescription>
                Automatically generate a knowledge graph from your data to identify unseen connections and form new hypotheses.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid w-full gap-2">
                <Label htmlFor="graph-input">Experimental Data</Label>
                <Textarea
                  id="graph-input"
                  placeholder="Paste your raw experimental data here..."
                  rows={8}
                  value={graphInput}
                  onChange={(e) => setGraphInput(e.target.value)}
                  disabled={isGraphLoading}
                />
              </div>
              {isGraphLoading && (
                <div className="flex items-center justify-center p-8">
                  <Loader className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {graphResult.knowledgeGraph && (
                <div className="space-y-4">
                    <Card className="bg-muted">
                         <CardHeader className="flex flex-row items-center gap-2">
                            <Share2 className="h-5 w-5 text-primary"/>
                            <CardTitle className="text-lg">Knowledge Graph</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-mono whitespace-pre-wrap">{graphResult.knowledgeGraph}</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-muted">
                        <CardHeader className="flex flex-row items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary"/>
                            <CardTitle className="text-lg">Novel Hypotheses</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="text-sm space-y-2 whitespace-pre-wrap">{graphResult.novelHypotheses}</div>
                        </CardContent>
                    </Card>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateGraph} disabled={isGraphLoading}>
                {isGraphLoading ? 'Generating...' : 'Generate Knowledge Graph'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
