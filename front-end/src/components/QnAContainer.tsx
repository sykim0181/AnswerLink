import React, { useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import axios from 'axios';
import { messageIdListState, messageItemState } from '../atoms/chatAtoms';
import MessageContainer from './MessageContainer';
import QInput from './QInput';
import { useChat } from '../hooks/useChat';
import { serverAtom } from '../atoms/serverAtom';

const Base = styled.div`
  width: 100%;
  position: relative;
  margin-top: auto;
`;

const ChatContainer = styled.div<{ paddingTop: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: ${({paddingTop}) => `calc(${paddingTop}px + 1rem)`};
`;

const InputContainer = styled.div`
  width: 80%; //1200px;
  position: fixed;
  bottom: .5rem;
  z-index: 3;
`;

interface QnAContainerProps {
  pdTop: number;
}

const QnAContainer = ({ pdTop }: QnAContainerProps) => {
  const messageIdList = useRecoilValue(messageIdListState);  
  const chatRef = useRef<HTMLDivElement>(null);
  const { addMessage, updateMessage } = useChat();
  const server = useRecoilValue(serverAtom); 


  const onQInputHeightChange = (height: number) => {
    if (chatRef.current) {
      chatRef.current.style.paddingBottom = `${height}px`;
    }
  }

  const submitQuestion = useCallback(async (question: string) => {
    addMessage(true, question);

    const aid = addMessage(false);

    await axios.get(`${server}/api/chat?prompt=${question}`)
      .then((res) => {
        if (res.status === 200) updateMessage(aid, res.data);
        else console.log(res.status)
      })
      .catch((err) => {//서버없을때(테스트)
        console.log(err);
        setTimeout(() => {
          updateMessage(aid, `Your question is "${question}".`);
        }, 2000);
      });

    chatRef.current?.scrollTo({left:0, top: 0, behavior: 'smooth'});
  }, [server, addMessage, updateMessage]);

  const reAskQuestion =  useRecoilCallback(
    ({ snapshot, set }) => 
      async (id: string) => {
        //id는 기존 답변의 아이디
        const prevAnswerItem = snapshot.getLoadable(messageItemState(id)).getValue();
        set(messageItemState(id), {
          ...prevAnswerItem,
          text: "",
          isLoading: true
        })
        const qIdx = messageIdList.findIndex(val => val===id) - 1;
        const qid = messageIdList[qIdx];
        const question = snapshot.getLoadable(messageItemState(qid)).getValue();
        
        await axios.get(`${server}/api/chat?prompt=${question.text}`)
          .then((res) => {
            if (res.status === 200) updateMessage(id, res.data);
            else console.log(res.status)
          })
          .catch((err) => {//서버없을때(테스트)
            console.log(err);
            setTimeout(() => {
              updateMessage(id, `Your question is "${question}".`);
            }, 2000);
          })
      }
  );

  return (
    <Base>
      <ChatContainer 
        ref={chatRef} 
        paddingTop={pdTop}
      >
        {
          messageIdList.map((val, idx) => (
            <MessageContainer 
              id={val} key={val}
              isLast={idx===messageIdList.length-1} 
              onReload={reAskQuestion} />
          ))
        }
      </ChatContainer>
      <InputContainer>
        <QInput 
          onHeightChange={onQInputHeightChange}
          onSubmit={submitQuestion}
        />
      </InputContainer>

    </Base>
  )
}

export default QnAContainer;