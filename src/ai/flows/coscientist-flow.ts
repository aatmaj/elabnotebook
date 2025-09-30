'use server';
/**
 * @fileOverview A flow that acts as a pharmaceutical research co-scientist.
 *
 * - askCoScientist - A function that answers questions with cited, factual information.
 * - CoScientistInput - The input type for the askCoScientist function.
 * - CoScientistOutput - The return type for the askCoScientist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CoScientistInputSchema = z.object({
  query: z.string().describe('The question or topic to research.'),
});
export type CoScientistInput = z.infer<typeof CoScientistInputSchema>;

const CoScientistOutputSchema = z.object({
  answer: z
    .string()
    .describe(
      'A factual, referenced answer to the query. Use Markdown for formatting.'
    ),
});
export type CoScientistOutput = z.infer<typeof CoScientistOutputSchema>;

export async function askCoScientist(
  input: CoScientistInput
): Promise<CoScientistOutput> {
  return coScientistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'coScientistPrompt',
  input: {schema: CoScientistInputSchema},
  output: {schema: CoScientistOutputSchema},
  model: 'gemini-1.5-pro-latest',
  prompt: `You are an expert pharmaceutical research co-scientist. Your purpose is to provide factual, evidence-based answers to questions from formulation scientists.

You must answer questions related to chemistry, patents, and FDA regulations.
Your answers must be grounded in facts and provide references or citations for all claims.
Format your responses using Markdown for clarity, including tables, lists, and links where appropriate.

If you cannot find a factual answer with a reference, state that you were unable to find the information. Do not speculate.

Question: {{{query}}}
`,
  // In a real application, you would add a 'tools' parameter here with a web search tool
  // to enable fact-based answers with references. For this prototype, the LLM will generate
  // plausible-looking answers with citations.
});

const coScientistFlow = ai.defineFlow(
  {
    name: 'coScientistFlow',
    inputSchema: CoScientistInputSchema,
    outputSchema: CoScientistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
