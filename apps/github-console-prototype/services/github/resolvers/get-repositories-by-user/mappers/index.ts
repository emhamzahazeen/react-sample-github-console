import type { AxiosResponseHeaders } from 'axios';
import parseLinkHeader from 'parse-link-header';
import { GitHubArrayRepositoryResponse } from '../io-schemas';
import { IRepository } from '../../../../../common/interfaces/data';

export default function mapResponse(input: GitHubArrayRepositoryResponse): Array<IRepository> {
  return input.map(({ name, description, stargazers_count }) => ({
    name,
    description,
    likes: stargazers_count
  }));
}

export function getTotalPageCount(headers: AxiosResponseHeaders): number {
  if (headers['link']) {
    const paginationInfo = parseLinkHeader(headers['link']);
    return paginationInfo['last'] && paginationInfo['last']['page'] ? parseInt(paginationInfo['last']['page']) : 1;
  }
}
