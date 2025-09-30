'use server';
/**
 * @fileOverview A flow that lists available AI models for debugging purposes.
 */

import { ai } from '@/ai/genkit';
import { listModels as genkitListModels } from 'genkit/registry';
import { z } from 'genkit';

export const ListModelsOutputSchema = z.object({
  models: z.array(z.string()),
});
export type ListModelsOutput = z.infer<typeof ListModelsOutputSchema>;

async function listGoogleAIModels(): Promise<string[]> {
  const models = await genkitListModels();
  return models
    .filter(m => m.name.startsWith('googleai/'))
    .map(m => m.name)
    .sort();
}

export const listModels = ai.defineFlow(
  {
    name: 'listModelsFlow',
    inputSchema: z.void(),
    outputSchema: ListModelsOutputSchema,
  },
  async () => {
    const modelIds = await listGoogleAIModels();
    return { models: modelIds };
  }
);
