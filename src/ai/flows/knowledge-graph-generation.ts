'use server';

/**
 * @fileOverview Knowledge Graph Generation AI agent.
 *
 * - generateKnowledgeGraph - A function that handles the knowledge graph generation process.
 * - KnowledgeGraphInput - The input type for the generateKnowledgeGraph function.
 * - KnowledgeGraphOutput - The return type for the generateKnowledgeGraph function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const KnowledgeGraphInputSchema = z.object({
  experimentalData: z
    .string()
    .describe(
      'A detailed description of experimental data from a lab experiment, including all relevant parameters, results, and observations.'
    ),
});
export type KnowledgeGraphInput = z.infer<typeof KnowledgeGraphInputSchema>;

const KnowledgeGraphOutputSchema = z.object({
  knowledgeGraph: z
    .string()
    .describe(
      'A knowledge graph in the form of a graph description, highlighting key entities, relationships, and connections identified from the experimental data.'
    ),
  novelHypotheses: z
    .string()
    .describe(
      'A list of novel hypotheses generated from the knowledge graph, suggesting potential new research directions or experiments.'
    ),
});
export type KnowledgeGraphOutput = z.infer<typeof KnowledgeGraphOutputSchema>;

export async function generateKnowledgeGraph(
  input: KnowledgeGraphInput
): Promise<KnowledgeGraphOutput> {
  return generateKnowledgeGraphFlow(input);
}

const prompt = ai.definePrompt({
  name: 'knowledgeGraphPrompt',
  input: {schema: KnowledgeGraphInputSchema},
  output: {schema: KnowledgeGraphOutputSchema},
  prompt: `You are an expert in knowledge graph generation and novel hypothesis discovery.

  Based on the experimental data provided, generate a knowledge graph that highlights key entities, relationships, and connections.
  From this knowledge graph, identify previously unseen connections and generate a list of novel hypotheses for further research.

  Experimental Data: {{{experimentalData}}}`,
});

const generateKnowledgeGraphFlow = ai.defineFlow(
  {
    name: 'generateKnowledgeGraphFlow',
    inputSchema: KnowledgeGraphInputSchema,
    outputSchema: KnowledgeGraphOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
