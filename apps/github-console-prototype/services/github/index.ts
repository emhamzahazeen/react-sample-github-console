import { createUserSearcher, CreateUserSearcherDependencies } from './resolvers/search-users';
import { INetworkService } from '../../common/interfaces/services';
import config from './config';
import axios from 'axios';
import createRemoteApiMocks from './mocker';
import { createRepositoryFetcher } from './resolvers/get-repositories-by-user';

const NAME = 'GITHUB_SERVICE';

type GithubService = INetworkService;

type CreateGithubServiceDependencies = CreateUserSearcherDependencies;

interface CreateGithubServiceOptions {
  readonly baseUrl: string;
}

type CreateGithubService = (
  dependencies: CreateGithubServiceDependencies,
  options: CreateGithubServiceOptions
) => GithubService;

export const createGithubService: CreateGithubService = ({ httpClient }, { baseUrl }) => {
  return {
    search: createUserSearcher({ httpClient }, { url: `${baseUrl}${config.SEARCH.ENDPOINTS}` }),
    getRepositories: createRepositoryFetcher(
      { httpClient },
      { url: `${baseUrl}${config.REPOSITORY.ENDPOINTS.GET_BY_USER}` }
    )
  };
};

const axiosClient = axios.create();

if (process.env.NODE_ENV !== 'production') {
  console.log(`dev: mocking httpClient for ${NAME}`);
  createRemoteApiMocks(axiosClient);
}

const networkService: INetworkService = createGithubService(
  { httpClient: axiosClient },
  { baseUrl: config.BASE_API_URL }
);

export default networkService;
