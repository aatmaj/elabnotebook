'use server';
/**
 * @fileOverview An AI co-scientist to help with pharmaceutical research.
 *
 * - askCoScientist - A function that answers questions about chemistry, patents, and FDA guidelines.
 * - CoScientistInput - The input type for the askCoScientist function.
 * - CoScientistOutput - The return type for the askCoScientist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const CoScientistInputSchema = z.object({
  query: z.string().describe('The user\'s question for the co-scientist.'),
});
export type CoScientistInput = z.infer<typeof CoScientistInputSchema>;

const CoScientistOutputSchema = z.object({
  response: z.string().describe('The co-scientist\'s answer, formatted in Markdown.'),
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
  model: googleAI.model('gemini-1.5-flash'),
  prompt: `You are an expert AI Co-scientist for pharmaceutical R&D, specializing in generic drug development. Your name is Paramanu.

Your task is to answer user questions about chemistry, patents, and FDA guidelines with factual, accurate, and concise information.

**Crucially, you MUST cite your sources and provide references for all claims.** You can link to research papers, patent databases (like Google Patents), FDA guidance documents, or other authoritative sources. Format your responses in clear Markdown.

For example, if asked about FDA bioequivalence guidelines for a specific drug, you should summarize the key points and provide a direct link to the relevant FDA document.

User Question: {{{query}}}`,
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
