import { atom } from "recoil";

export const serverAtom = atom<string>({
  key: 'serverState',
  default: ""
});
