import React, { useState } from 'react'
import styled from '@emotion/styled';
import { serverAtom } from '../atoms/serverAtom';
import { useRecoilState } from 'recoil';

const Base = styled.div`
  border: .1rem solid black;
  border-radius: 1rem;
  padding: 1rem 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 1rem 0;
`;

const Button = styled.div`
  cursor: pointer;
  border: .1rem solid black;
  border-radius: 1rem;
  width: fit-content;
  padding: 1rem;
`;

interface SettingModalProps {
  onClose: () => void
}

const SettingModal = ({ onClose }: SettingModalProps) => {
  const [input, setInput] = useState<string>();
  const [server, setServer] = useRecoilState(serverAtom); 

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target?.value);
  };

  const applyAndClose = () => {
    onClose();
    if (input)
      setServer(input);
  }

  return (
    <Base>
      <div>서버 주소 입력</div>
      <Input onChange={onInputChange} value={input} />
      <Button onClick={applyAndClose}>적용</Button>
    </Base>
  )
}

export default SettingModal