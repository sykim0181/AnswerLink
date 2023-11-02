import React from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner';
import { AiOutlineReload } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa';
import { messageItemState } from '../atoms/chatAtoms';
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
  margin-top: .5rem;
`;

interface MessageContainerProps {
  id: string;
  isLast?: boolean;
  onReload: (id: string) => void;
}

const MessageContainer = ({ id, isLast, onReload }: MessageContainerProps) => {
  const message = useRecoilValue(messageItemState(id));

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
      <TextBox dark={message.type==="Q"} text={message.text}>
        {message.isLoading ? (
          <ThreeDots 
            height="1rem"
            color='gray'
          />
        ) : (
          message.type==="A" && (
            <ButtonsContainer>
              {
                isLast && (/* 새로고침 */
                  <Button onClick={() => onReload(id)}>
                    <AiOutlineReload />
                  </Button>
                )
              }
              <Button onClick={() => copyText(message.text!)}>
                <FaRegCopy />
              </Button>
            </ButtonsContainer>
          )
        )}
      </TextBox>
    </Base>
    
  )
}

export default MessageContainer;