import { array, define } from 'cooky-cutter';
import { AxiosInstance } from 'axios';
import { faker } from '@faker-js/faker';
import { GitHubSingleRepositoryResponse } from './io-schemas';
import { createRepositoryFetcher, CreateRepositoryFetcherDependencies, CreateRepositoryFetcherOptions } from './index';

function createDependencies(httpGet: AxiosInstance['get']): CreateRepositoryFetcherDependencies {
  return {
    httpClient: {
      get: httpGet
    } as AxiosInstance
  };
}

const optionsFactory = define<CreateRepositoryFetcherOptions>({
  url: `${faker.internet.url()}/{username}/repos`
});

const githubRepositorySingleResponseFactory = define<GitHubSingleRepositoryResponse>({
  name: faker.word.noun(),
  description: faker.lorem.sentences(2),
  stargazers_count: parseInt(faker.random.numeric(2))
});
const githubRepositoryArrayResponseFactory = array(githubRepositorySingleResponseFactory, 1);

describe('get-repositories', () => {
  test('calls the correct API URL', async () => {
    const httpGet = jest.fn().mockResolvedValue({ data: githubRepositoryArrayResponseFactory() });
    const options = optionsFactory();
    const dependencies = createDependencies(httpGet);
    const repositoryFetcher = createRepositoryFetcher(dependencies, options);
    const repositoryFetcherParams = { handle: faker.internet.userName() };
    const expectedUrl = options.url.replace('{username}', repositoryFetcherParams.handle);

    await repositoryFetcher(repositoryFetcherParams);

    expect(httpGet).toHaveBeenCalled();
    expect(httpGet).toHaveBeenCalledWith(expectedUrl);
  });

  test('returns the correct mapped values', async () => {
    const remoteResponse = githubRepositoryArrayResponseFactory();
    const httpGet = jest.fn().mockResolvedValue({ data: remoteResponse });
    const options = optionsFactory();
    const dependencies = createDependencies(httpGet);
    const repositoryFetcher = createRepositoryFetcher(dependencies, options);
    const repositoryFetcherParams = { handle: faker.internet.userName() };
    const expected = [
      {
        name: remoteResponse[0].name,
        description: remoteResponse[0].description,
        likes: remoteResponse[0].stargazers_count
      }
    ];

    const actual = await repositoryFetcher(repositoryFetcherParams);

    await expect(actual).toStrictEqual(expected);
  });
});
