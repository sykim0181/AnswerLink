import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { IoIosSend } from 'react-icons/io';
import useAutosizeTextArea from '../hooks/useAutoSizeTextArea';
import { useChat } from '../hooks/useChat';

const Container = styled.div`
  display: flex;
  background-color: white;
  border: .05rem solid black;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  align-items: center;
`;

const Input = styled.textarea`
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  font-size: 1rem;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  font-size: 1.5rem;
  cursor: pointer;
`;

const QInput = () => {
  const [input, setInput] = useState<string>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage } = useChat();

  useAutosizeTextArea(textAreaRef.current, input);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target?.value);
  }

  const sendQuestion = async () => {
    if (input) {
      addMessage({
        type: "Q",
        text: input
      });
      // const response: string = await axios.get(`/api/chat?prompt=${input}`);
      const sample_response = `초능력이 있다면 그것을 어떻게 활용할지는 완전히 당신에게 달려 있습니다. 하지만 여기 몇 가지 생각해 볼 만한 아이디어가 있습니다:
        1.치유: 자신 또는 다른 사람의 상처나 질병을 치료할 수 있는 능력이 있다면, 이는 의학적으로 해결하기 어려운 많은 문제를 해결하는 데 도움이 될 수 있습니다.
        2.시간 여행: 과거나 미래로 여행하여 역사를 체험하거나 미래의 발전을 보는 것은 흥미로울 것입니다.
        3.마음 읽기: 다른 사람의 생각을 알 수 있다면, 이해와 커뮤니케이션에서 큰 도움이 될 것입니다.
        4.텔레포트: 원하는 장소로 순간 이동하면 교통 문제를 해결하고, 세계 각지를 방문하는 것도 가능합니다.
        5.무적: 위협에 대한 걱정 없이 모든 종류의 위험한 상황에서 자유롭게 탐색하고 경험할 수 있습니다.
        그러나 초능력을 사용함에 있어서 항상 윤리적인 책임성과 신중함을 기억해야 합니다!
      `;
      setTimeout(() => {
        addMessage({
          type: "A",
          text: sample_response //response
        });
      }, 2000);
      
    }
  }

  return (
    <Container>
      <Input 
        ref={textAreaRef} 
        placeholder='질문을 입력하세요' 
        rows={1}
        onChange={onInputChange}
        value={input}
      />
      <Button onClick={sendQuestion}>
        <IoIosSend />
      </Button>
    </Container>
  )
}

export default QInput;