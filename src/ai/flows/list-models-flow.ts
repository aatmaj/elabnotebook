'use server';
/**
 * @fileOverview A flow that lists available AI models from the registry.
 *
 * - listModels - A function that returns a list of available model names.
 * - ListModelsOutput - The return type for the listModels function.
 */

import { ai } from '@/ai/genkit';
import { listModels as genkitListModels } from 'genkit/registry';
import { z } from 'genkit';

export const ListModelsOutputSchema = z.object({
  models: z.array(z.string()).describe('A list of available model names.'),
});
export type ListModelsOutput = z.infer<typeof ListModelsOutputSchema>;

async function listGoogleAIModels(): Promise<ListModelsOutput> {
  const models = genkitListModels().map(m => m.name);
  return { models };
}


export const listModels = ai.defineFlow(
  {
    name: 'listModelsFlow',
    inputSchema: z.undefined(),
    outputSchema: ListModelsOutputSchema,
  },
  async () => {
    return await listGoogleAIModels();
  }
);
