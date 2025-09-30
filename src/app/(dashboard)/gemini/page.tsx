"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { listModels } from "@/app/actions/ai-actions";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GeminiPage() {
  const [models, setModels] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleListModels = async () => {
    setIsLoading(true);
    setError(null);
    setModels([]);
    try {
      const result = await listModels();
      if (result && result.models) {
        setModels(result.models);
      } else {
        setError("Failed to retrieve model list. The response was empty.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Gemini Models</CardTitle>
        <CardDescription>
          Click the button to get a list of all GenAI models available in your current configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleListModels} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          List Available Models
        </Button>
        {error && (
            <div className="text-destructive p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="font-bold">An error occurred:</p>
                <p className="text-sm">{error}</p>
            </div>
        )}
        {models.length > 0 && (
            <div>
                <h3 className="font-semibold mb-2">Available Models:</h3>
                <div className="flex flex-wrap gap-2">
                    {models.map((model) => (
                        <Badge key={model} variant="secondary" className="text-lg p-2">
                            {model}
                        </Badge>
                    ))}
                </div>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
