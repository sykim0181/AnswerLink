import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import { useChat } from "../hooks/useChat";

const Base = styled.div`
  display: flex;
  background-color: white;
  border: 0.1rem solid black;
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
  font-family: 'Nanum Gothic', 'Orbit', sans-serif;

  &:focus {
    outline: none;
  }
`;

const Button = styled.div`
  font-size: 1.5rem;
  height: 1.5rem;
  display: flex;
  cursor: pointer;
`;

interface QInputProps {
  onHeightChange: (height: number) => void;
  onSubmit: (input: string) => void;
}

const QInput = ({ onHeightChange, onSubmit }: QInputProps) => {
  const [input, setInput] = useState<string>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textAreaRef.current && baseRef.current) {
      //textArea 높이 자동 조절
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = scrollHeight + "px";

      //높이 바뀔때마다 메세지컨테이너 패딩 조절
      onHeightChange(baseRef.current.offsetHeight);
    }
  }, [textAreaRef, input, onHeightChange, baseRef]);

  const onInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target?.value);
  };

  const onClickSendBtn = () => {
    if (input) {
      onSubmit(input);
      setInput("");// 입력칸 비우기
    }
  }

  return (
    <Base ref={baseRef}>
      <Input
        ref={textAreaRef}
        placeholder="질문을 입력하세요"
        rows={1}
        onChange={onInputChange}
        value={input}
      />
      <Button onClick={onClickSendBtn}>
        <IoIosSend />
      </Button>
    </Base>
  );
};

export default QInput;
