import { Axios } from 'axios';
import { GitHubArrayRepositoryResponse, GitHubArrayRepositoryResponseSchema } from './io-schemas';
import { INetworkService } from '../../../../common/interfaces/services';
import mapResponse, { getTotalPageCount } from './mappers';

type RepositoryFetcher = INetworkService['getRepositories'];

export interface CreateRepositoryFetcherDependencies {
  readonly httpClient: Axios;
}

export interface CreateRepositoryFetcherOptions {
  readonly url: string;
}

type CreateRepositoryFetcher = (
  dependencies: CreateRepositoryFetcherDependencies,
  options: CreateRepositoryFetcherOptions
) => RepositoryFetcher;

export const createRepositoryFetcher: CreateRepositoryFetcher =
  ({ httpClient }, { url }) =>
  async ({ handle, page }) => {
    try {
      const cUrl = handle ? url.replace('{username}', handle) : undefined;
      const { data, headers } = await httpClient.get(cUrl, { params: { page } });
      try {
        const parsedResponse: GitHubArrayRepositoryResponse = GitHubArrayRepositoryResponseSchema.parse(data);
        try {
          return {
            totalPageCount: getTotalPageCount(headers),
            items: mapResponse(parsedResponse)
          };
        } catch (e) {
          console.error('err: get-repository-by-user: exception while mapping response');
        }
        return {
          totalPageCount: getTotalPageCount(headers),
          items: mapResponse(parsedResponse)
        };
      } catch (e) {
        console.error('err: get-repository-by-user: parsing exception while verifying search results');
      }
    } catch (e) {
      console.error('err: get-repository-by-user: network error while fetching search results');
    }
  };
