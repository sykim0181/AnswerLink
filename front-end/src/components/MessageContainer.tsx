import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { AiOutlineReload } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa';
import { Message, messageIdsState } from '../atoms/chatAtoms';
import { useChat } from '../hooks/useChat';
import TextBox from './TextBox';

const Base = styled.div<{ isQuery: boolean }>`
  margin: ${({ isQuery }) => isQuery ? "0 0 0 auto" : "0 auto 0 0"};
  padding: .5rem 0;
`;

const Button = styled.div`
  font-size: 1rem;
  cursor: pointer;

  & + & {
    margin-left: .5rem;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: auto;
`;

interface MessageContainerProps {
  id: string;
  isLast?: boolean;
}

const MessageContainer = ({ id, isLast }: MessageContainerProps) => {
  const [message, setMessage] = useState<Message>({
    type: "Q",
    text: "default"
  });
  const chatIdList = useRecoilValue(messageIdsState);
  const { addMessage, deleteMessage } = useChat();

  useEffect(() => {
    const data = window.sessionStorage.getItem(id.toString());
    if (data)
      setMessage(JSON.parse(data));
  }, [id]);

  const reload = async () => {
    alert("reload");

    //마지막 답 객체 삭제
    const lastId = chatIdList[chatIdList.length-1];
    deleteMessage(lastId);

    //마지막 질문을 다시 넘겨서 답을 받아옴
    //const response = await axios.post('/api/chat', input);
    const sample_response = `새로운 답`;
    addMessage({
      type: "A",
      text: sample_response
    });
  }

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("복사 성공");
    } catch(e) {
      alert("복사 실패");
    }
  }

  return (
    <Base isQuery={message.type==="Q"}>
      <TextBox
        text={message.text}
      >
        {
          message.type==="A" && (
            <ButtonsContainer>
              {
                isLast && (
                  <Button onClick={reload}>
                    <AiOutlineReload />
                  </Button>
                )
              }
              <Button onClick={() => copyText(message.text)}>
                <FaRegCopy />
              </Button>
            </ButtonsContainer>
          )
        }
      </TextBox>
    </Base>
    
  )
}

export default MessageContainer;