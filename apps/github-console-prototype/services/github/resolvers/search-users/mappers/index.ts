import { GitHubArrayUserResponse } from '../io-schemas';
import { IUser } from '../../../../../common/interfaces/data';

export default function mapResponse(input: GitHubArrayUserResponse): Array<IUser> {
  return input.items.map((elem) => ({ name: elem.name, handle: elem.login }));
}
