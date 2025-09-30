"use server";

import { summarizeExperiment as summarizeExperimentFlow } from "@/ai/flows/ai-driven-experiment-summaries";
import { generateKnowledgeGraph as generateKnowledgeGraphFlow } from "@/ai/flows/knowledge-graph-generation";
import type { SummarizeExperimentInput, SummarizeExperimentOutput } from "@/ai/flows/ai-driven-experiment-summaries";
import type { KnowledgeGraphInput, KnowledgeGraphOutput } from "@/ai/flows/knowledge-graph-generation";

export async function summarizeExperiment(input: SummarizeExperimentInput): Promise<SummarizeExperimentOutput> {
    return await summarizeExperimentFlow(input);
}

export async function generateKnowledgeGraph(input: KnowledgeGraphInput): Promise<KnowledgeGraphOutput> {
    return await generateKnowledgeGraphFlow(input);
}
