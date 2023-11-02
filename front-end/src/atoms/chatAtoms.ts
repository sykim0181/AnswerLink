import { atom, atomFamily } from "recoil";

export type Message = {
  id: string;
  type?: "Q" | "A";
  text?: string;
  isLoading?: boolean;
}

export const messageItemState = atomFamily<Message, string>({
  key: 'messageItemState',
  default: (id) => {
    return {
      id: id
    }
  }
});

export const messageIdListState = atom<string[]>({
  key: 'messageListState',
  default: []
});
