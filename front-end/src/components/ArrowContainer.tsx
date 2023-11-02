import React from 'react';
import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward} from 'react-icons/io';

const Base = styled.div`
  display: flex;
  border: .1rem solid black;
  border-radius: 1rem;
  background-color: white;
`;

const Arrow = styled.div<{ border: "left" | "right" }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: ${({ border }) => border==="left" ? "0.05rem solid black" : ""};
  border-right: ${({ border }) => border==="right" ? "0.05rem solid black" : ""};
  padding: 0 1rem;
  cursor: pointer;
`;

interface ArrowContainerProps {
  onPressLeftArrow: () => void;
  onPressRightArrow: () => void;
}

const ArrowContainer = ({ onPressLeftArrow, onPressRightArrow}: ArrowContainerProps) => {
  return (
    <Base>
      <Arrow 
        onClick={onPressLeftArrow}
        border={"right"}
      >
        <IoIosArrowBack />
      </Arrow>
      <Arrow 
        onClick={onPressRightArrow}
        border={"left"}
      >
        <IoIosArrowForward />
      </Arrow>
    </Base>
  )
}

export default ArrowContainer;