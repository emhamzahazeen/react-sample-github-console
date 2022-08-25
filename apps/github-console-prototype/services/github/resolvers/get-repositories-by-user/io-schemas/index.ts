import * as z from 'zod';

const GitHubSingleRepositoryResponseSchema = z.object({
  name: z.string(),
  description: z.string().optional().or(z.null()),
  stargazers_count: z.number()
});
export type GitHubSingleRepositoryResponse = z.infer<typeof GitHubSingleRepositoryResponseSchema>;

export const GitHubArrayRepositoryResponseSchema = z.array(GitHubSingleRepositoryResponseSchema);
export type GitHubArrayRepositoryResponse = z.infer<typeof GitHubArrayRepositoryResponseSchema>;
