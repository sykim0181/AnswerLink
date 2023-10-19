import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";
import { IoIosSend } from "react-icons/io";
import useAutosizeTextArea from "../hooks/useAutoSizeTextArea";
import { useChat } from "../hooks/useChat";

const Container = styled.div`
  display: flex;
  background-color: white;
  border: 0.05rem solid black;
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
  };

  const sendQuestion = async () => {
    if (input) {
      addMessage({
        type: "Q",
        text: input,
      });
      await axios.get(`/api/chat?prompt=${input}`).then((res) => {
        addMessage({
          type: "A",
          text: res.data,
        });
      });
    }
  };

  return (
    <Container>
      <Input
        ref={textAreaRef}
        placeholder="질문을 입력하세요"
        rows={1}
        onChange={onInputChange}
        value={input}
      />
      <Button onClick={sendQuestion}>
        <IoIosSend />
      </Button>
    </Container>
  );
};

export default QInput;
