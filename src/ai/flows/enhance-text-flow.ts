'use server';
/**
 * @fileOverview A flow that enhances text using AI without changing the facts.
 *
 * - enhanceText - A function that enhances a given piece of text.
 * - EnhanceTextInput - The input type for the enhanceText function.
 * - EnhanceTextOutput - The return type for the enhanceText function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'genkit';

const EnhanceTextInputSchema = z.object({
  text: z.string().describe('The text to be enhanced.'),
  context: z
    .string()
    .describe(
      'The context of the text (e.g., "Raw Data & Observations", "Outcome").'
    ),
});
export type EnhanceTextInput = z.infer<typeof EnhanceTextInputSchema>;

const EnhanceTextOutputSchema = z.object({
  enhancedText: z
    .string()
    .describe('The enhanced version of the text, with facts preserved.'),
});
export type EnhanceTextOutput = z.infer<typeof EnhanceTextOutputSchema>;

export async function enhanceText(
  input: EnhanceTextInput
): Promise<EnhanceTextOutput> {
  return enhanceTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'enhanceTextPrompt',
  input: {schema: EnhanceTextInputSchema},
  output: {schema: EnhanceTextOutputSchema},
  model: googleAI('gemini-1.5-flash-latest'),
  prompt: `You are an expert scientific writer. Your task is to enhance the provided text to make it clearer, more professional, and more concise, while strictly preserving all factual information. Do not add or invent any new information.

Context of the text: {{{context}}}

Text to enhance:
"{{{text}}}"

Return only the enhanced text.`,
});

const enhanceTextFlow = ai.defineFlow(
  {
    name: 'enhanceTextFlow',
    inputSchema: EnhanceTextInputSchema,
    outputSchema: EnhanceTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
