import { atom } from 'recoil';

export const searchedUsers = atom({
  key: 'searched-users',
  default: []
});
