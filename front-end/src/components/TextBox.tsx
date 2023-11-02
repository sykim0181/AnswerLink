import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div<{ 
  dark?: boolean | undefined, 
}>`
  background-color: ${({ dark }) => dark ? "black" : "white"};
  color: ${({ dark }) => dark ? "white" : "black"};
  border: .1rem solid black;
  width: fit-content;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  position: relative;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
`;

const TextContainer = styled.div<{ nowrap: boolean | undefined }>`
  white-space: ${({ nowrap }) => nowrap ? "nowrap" : "normal"};
  word-break: break-all; //띄어쓰기 없는 영어텍스트의 경우 너비가 화면 밖으로 나가는 것 방지
`;

interface TextBoxProps {
  text?: string;
  dark?: boolean;
  nowrap?: boolean; 
  children?: React.ReactNode;
}

const TextBox = ({ text, dark, nowrap, children }: TextBoxProps)  => {

  return (
    <Container dark={dark}>
      <TextContainer nowrap={nowrap}>
        {text}
      </TextContainer>
      {children}
    </Container>
  )
}

export default React.memo(TextBox);