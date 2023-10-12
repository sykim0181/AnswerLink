import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div<{ 
  bgColor?: string | undefined, 
  fontColor?: string | undefined,
}>`
  background-color: ${({ bgColor }) => bgColor ? bgColor : "white"};
  color: ${({ fontColor }) => fontColor ? fontColor : "black"};
  border: .05rem solid;
  border-color: ${({ fontColor }) => fontColor ? fontColor : "black"};
  width: fit-content;
  padding: 1rem 1.5rem;
  border-radius: 1rem;
  position: relative;
  white-space: pre-line;
  display: flex;
  flex-direction: column;
`;

interface TextBoxProps {
  text: string;
  fontColor?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
}

const TextBox = ({ text, backgroundColor, fontColor, children }: TextBoxProps)  => {

  return (
    <Container 
      bgColor={backgroundColor}
      fontColor={fontColor}
    >
      <div>{text}</div>
      {children}
    </Container>
  )
}

export default React.memo(TextBox);