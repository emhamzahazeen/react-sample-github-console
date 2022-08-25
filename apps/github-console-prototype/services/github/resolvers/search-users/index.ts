import { Axios } from 'axios';
import { GitHubArrayUserResponse, GitHubArrayUserResponseSchema } from './io-schemas';
import { ISearchOptions, IUser } from '../../../../common/interfaces/data';
import mapResponse from './mappers';

type UserSearcher = (searcherOptions: ISearchOptions) => Promise<Array<IUser>>;

export interface CreateUserSearcherDependencies {
  readonly httpClient: Axios;
}

export interface CreateUserSearcherOptions {
  readonly url: string;
}

type CreateUserSearcher = (
  dependencies: CreateUserSearcherDependencies,
  options: CreateUserSearcherOptions
) => UserSearcher;

export const createUserSearcher: CreateUserSearcher =
  ({ httpClient }, { url }) =>
  async ({ searchTerm, limit }) => {
    try {
      const params = searchTerm ? { q: searchTerm, per_page: limit } : undefined;
      const { data } = await httpClient.get(url, { params });
      try {
        const parsedResponse: GitHubArrayUserResponse = GitHubArrayUserResponseSchema.parse(data);
        return mapResponse(parsedResponse);
      } catch (e) {
        console.error('err: search-users: parsing exception while verifying search results');
      }
    } catch (e) {
      console.error('err: search-users: network error while fetching search results');
    }
  };
