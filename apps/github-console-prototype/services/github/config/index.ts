interface Config {
  BASE_API_URL: string;
  SEARCH: {
    ENDPOINTS: string;
  };
  REPOSITORY: {
    ENDPOINTS: {
      GET_BY_USER: string;
    };
  };
}
const config: Config = {
  BASE_API_URL: 'https://api.github.com',
  SEARCH: {
    ENDPOINTS: '/search/users'
  },
  REPOSITORY: {
    ENDPOINTS: {
      GET_BY_USER: '/users/{username}/repos'
    }
  }
};

export default config;
