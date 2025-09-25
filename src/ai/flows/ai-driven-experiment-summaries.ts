'use server';
/**
 * @fileOverview A flow that summarizes complex experiments using AI.
 *
 * - summarizeExperiment - A function that summarizes an experiment.
 * - SummarizeExperimentInput - The input type for the summarizeExperiment function.
 * - SummarizeExperimentOutput - The return type for the summarizeExperiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeExperimentInputSchema = z.object({
  experimentDetails: z
    .string()
    .describe('Detailed description of the experiment, its methodology, and results.'),
});
export type SummarizeExperimentInput = z.infer<typeof SummarizeExperimentInputSchema>;

const SummarizeExperimentOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the experiment and its key findings.'),
});
export type SummarizeExperimentOutput = z.infer<typeof SummarizeExperimentOutputSchema>;

export async function summarizeExperiment(input: SummarizeExperimentInput): Promise<SummarizeExperimentOutput> {
  return summarizeExperimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeExperimentPrompt',
  input: {schema: SummarizeExperimentInputSchema},
  output: {schema: SummarizeExperimentOutputSchema},
  prompt: `You are an expert scientific summarizer. Please provide a concise summary of the following experiment details, focusing on the key findings and implications.\n\nExperiment Details: {{{experimentDetails}}}`,
});

const summarizeExperimentFlow = ai.defineFlow(
  {
    name: 'summarizeExperimentFlow',
    inputSchema: SummarizeExperimentInputSchema,
    outputSchema: SummarizeExperimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
