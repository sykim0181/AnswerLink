import { useRecoilCallback } from 'recoil';
import { v1 as uuid } from 'uuid';
import { Message, messageIdsState } from '../atoms/chatAtoms';

export const useChat = () => {

  const addMessage = useRecoilCallback(
    ({ snapshot, set }) => 
      (msg: Message) => {
        const prevMessageIds = snapshot.getLoadable(messageIdsState).getValue();
        const id = uuid();
        set(messageIdsState, [...prevMessageIds, id]);
        //session storage에 저장
        window.sessionStorage.setItem(id, JSON.stringify(msg));
  }, []);

  const deleteMessage = useRecoilCallback(
    ({ snapshot, set }) => 
      (id: string) => {
        const prevMessageIds = snapshot.getLoadable(messageIdsState).getValue();
        set(messageIdsState, prevMessageIds.filter(val => val!==id)); //삭제
        //session storage에서 삭제
        window.sessionStorage.removeItem(id);
    
  }, []);


  return {
    addMessage,
    deleteMessage
  }
}