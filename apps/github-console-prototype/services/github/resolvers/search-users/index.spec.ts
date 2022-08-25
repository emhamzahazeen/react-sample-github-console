import { define } from 'cooky-cutter';
import { AxiosInstance } from 'axios';
import { faker } from '@faker-js/faker';
import { GitHubArrayUserResponse } from './io-schemas';
import { createUserSearcher, CreateUserSearcherDependencies, CreateUserSearcherOptions } from './index';

function createDependencies(httpGet: AxiosInstance['get']): CreateUserSearcherDependencies {
  return {
    httpClient: {
      get: httpGet
    } as AxiosInstance
  };
}

const optionsFactory = define<CreateUserSearcherOptions>({
  url: faker.internet.url()
});

const githubUsersArrayResponseFactory = define<GitHubArrayUserResponse>({
  items: () => [
    {
      name: faker.name.fullName(),
      login: faker.internet.userName()
    }
  ]
});

describe('search-users', () => {
  test('calls the correct API URL with correct params', async () => {
    const httpGet = jest.fn().mockResolvedValue({ data: githubUsersArrayResponseFactory() });
    const options = optionsFactory();
    const dependencies = createDependencies(httpGet);
    const userSearcher = createUserSearcher(dependencies, options);
    const userSearcherParams = { searchTerm: 'some term', limit: 5 };
    const expectedUrl = options.url;
    const expectedParams = { params: { q: 'some term', per_page: 5 } };

    await userSearcher(userSearcherParams);

    expect(httpGet).toHaveBeenCalled();
    expect(httpGet).toHaveBeenCalledWith(expectedUrl, expectedParams);
  });

  test('returns the correct mapped values', async () => {
    const remoteResponse = githubUsersArrayResponseFactory();
    const httpGet = jest.fn().mockResolvedValue({ data: remoteResponse });
    const options = optionsFactory();
    const dependencies = createDependencies(httpGet);
    const userSearcher = createUserSearcher(dependencies, options);
    const userSearcherParams = { searchTerm: 'some term', limit: 5 };
    const expected = [
      {
        name: remoteResponse.items[0].name,
        handle: remoteResponse.items[0].login
      }
    ];

    const actual = await userSearcher(userSearcherParams);

    await expect(actual).toStrictEqual(expected);
  });
});
