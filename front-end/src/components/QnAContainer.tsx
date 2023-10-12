import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';
import { AiOutlineReload } from 'react-icons/ai';
import { FaRegCopy } from 'react-icons/fa';
import TextBox from './TextBox';
import { messageIdsState } from '../atoms/chatAtoms';
import MessageContainer from './MessageContainer';

const Base = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

interface QnAContainerProps {
}

const QnAContainer = ({  }: QnAContainerProps) => {
  // const baseRef = useRef<HTMLDivElement>(null);
  const chatIdList = useRecoilValue(messageIdsState);  

  return (
    <Base>
      {
        chatIdList.map((id, idx) => (
          <MessageContainer id={id} isLast={idx===chatIdList.length-1} key={id}/>
        ))
      }
    </Base>
  )
}

export default QnAContainer;