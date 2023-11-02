import { useRecoilCallback } from 'recoil';
import { v1 as uuid } from 'uuid';
import { Message, messageItemState, messageIdListState } from '../atoms/chatAtoms';

export const useChat = () => {

  const addMessage = useRecoilCallback(
    ({ snapshot, set }) => 
      (isQuestion: boolean, text?: string) => {
        const prevMessages = snapshot.getLoadable(messageIdListState).getValue();
        const id = uuid();
        const item: Message = {
          id: id,
          type: isQuestion ? "Q" : "A",
          text: text, //question이면 text가 무조건 있고, answer면 없을 수 있음
          isLoading: isQuestion ? false : true
        }
        set(messageItemState(id), item);

        set(messageIdListState, [...prevMessages, id]);
        return id;     
  }, []);

  const updateMessage = useRecoilCallback(
    ({ snapshot, set }) =>  
      (id: string, text: string) => {
        const prevMessage = snapshot.getLoadable(messageItemState(id)).getValue();
        const newItem = {
          ...prevMessage,
          text: text,
          isLoading: false
        }
        set(messageItemState(id), newItem);
  });

  // const deleteMessage = useRecoilCallback(
  //   ({ snapshot, set, reset }) => 
  //     (id: string) => {
  //       const prevMessageIds = snapshot.getLoadable(messageIdListState).getValue();
  //       set(messageIdListState, prevMessageIds.filter(val => val !== id)); //삭제
  //       reset(messageItemState(id));    
  // }, []);

  return {
    addMessage,
    updateMessage,
  }
}