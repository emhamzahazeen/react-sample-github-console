export interface IUser {
  name?: string;
  handle: string;
}

export interface ISearchOptions {
  searchTerm: string;
  limit: number;
}

export interface IRepository {
  name: string;
  description: string;
  likes: number;
}

export interface IPaginationOptions {
  page: number;
}
