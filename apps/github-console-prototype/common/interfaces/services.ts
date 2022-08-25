import { IPaginationOptions, IRepository, ISearchOptions, IUser } from './data';

export interface PaginatedResponse<T> {
  totalPageCount: number;
  items: T[];
}

export interface INetworkService {
  search: (searchOptions: ISearchOptions) => Promise<Array<IUser>>;
  getRepositories: (
    fetcherOptions: Pick<IUser, 'handle'> & IPaginationOptions
  ) => Promise<PaginatedResponse<IRepository>>;
}
