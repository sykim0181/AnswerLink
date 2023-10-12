import React, { useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';
// import { BrowserView, MobileView } from 'react-device-detect';
import TextInput from './components/TextBox';
import QInput from './components/QInput';
import QnAContainer from './components/QnAContainer';

const Inner = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: beige; */
  position: relative;
`;

const Header = styled.div`
  width: 1200px;
  /* background-color: aquamarine; */
  display: flex;

  & > div {
    &:nth-of-type(even) {
      margin: 0 10px;
    }
  }
`;

const Logo = styled.img`
  /* background-color: aliceblue; */
  width: 10%;
`;

const QnAContainerContainer = styled.div`
  width: 100%;
  position: relative;
  /* background-color: aliceblue; */
  display: flex;
  overflow: scroll;


  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;


const InputContainer = styled.div`
  width: 1200px;
`;

const Home = () => {
  const inputRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && contentRef.current && inputRef.current) {
      const height = headerRef.current.offsetHeight + inputRef.current.offsetHeight;
      contentRef.current.style.height = `calc(100vh - ${height}px)`;
    }
  }, [headerRef]); 

  return (
    <RecoilRoot>
      <Inner>
        <Header ref={headerRef}>
          {/* <TextInput text='최신이슈'
            backgroundColor='black' fontColor='white'
          /> */}
        </Header>

        {/* <Logo src='Aiku.svg' /> */}

        <QnAContainerContainer ref={contentRef}>
          <QnAContainer/>
        </QnAContainerContainer>
        
        <InputContainer ref={inputRef}>
          <QInput />
        </InputContainer>
          
      </Inner> 
    </RecoilRoot>
  );
}

export default Home;