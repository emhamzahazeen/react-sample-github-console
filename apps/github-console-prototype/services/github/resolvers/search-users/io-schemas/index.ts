import * as z from 'zod';

const GitHubSingleUserResponseSchema = z.object({
  login: z.string(),
  name: z.string().optional()
});

export const GitHubArrayUserResponseSchema = z.object({
  items: z.array(GitHubSingleUserResponseSchema)
});
export type GitHubArrayUserResponse = z.infer<typeof GitHubArrayUserResponseSchema>;
