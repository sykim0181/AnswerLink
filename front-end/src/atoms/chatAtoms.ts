import { atom, atomFamily } from "recoil";

export type Message = {
  type: "Q" | "A";
  text: string;
}

export const messageItemState = atomFamily<Message, string>({
  key: 'messageItemState',
  default: (id) => {
    const data = window.sessionStorage.getItem(id);
    if (data) {
      return JSON.parse(data);
    }
  }
});

export const messageIdsState = atom<string[]>({
  key: 'messageIdsState',
  default: []
});
