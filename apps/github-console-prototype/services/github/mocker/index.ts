import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from '../config';
import searchResponse from '../resolvers/search-users/mocks/data/response.js';
import getRepositoriesResponse from '../resolvers/get-repositories-by-user/mocks/data/response.js';

export default function createRemoteApiMocks(_axios: AxiosInstance) {
  const mock = new MockAdapter(_axios);

  mock.onGet(`${config.BASE_API_URL}${config.SEARCH.ENDPOINTS}`).reply(function (config) {
    console.log(`info: network: sending simulated response for ${config.url}`);
    return [200, searchResponse()];
  });

  const _rPaths = config.REPOSITORY.ENDPOINTS.GET_BY_USER.split('/');
  mock.onGet(new RegExp(`${config.BASE_API_URL}/${_rPaths[1]}/.*/${_rPaths[3]}`)).reply(function (config) {
    console.log(`info: network: sending simulated response for ${config.url}`);
    return [
      200,
      getRepositoriesResponse(),
      {
        link: '<https://api.github.com/user/35577545/repos?page=2>; rel="next", <https://api.github.com/user/35577545/repos?page=2>; rel="last"'
      }
    ];
  });
}
