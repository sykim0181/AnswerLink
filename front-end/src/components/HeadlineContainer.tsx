import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import ArrowContainer from './ArrowContainer';
import TextBox from './TextBox';
import { useRecoilValue } from 'recoil';
import { serverAtom } from '../atoms/serverAtom';

const Base = styled.div`
  display: flex;
  width: 100%;
`;

const Headline = styled.div`
  background-color: white;
  border: .1rem solid black;
  border-radius: 1rem;
  padding: 1rem 1.5rem;
  height: fit-content;
  width: 100%;
  overflow:hidden; 
  text-overflow:ellipsis; 
  white-space:nowrap;
  margin: 0 10px;
`;

const HeadlineContainer = () => {
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [curIdx, setCurIdx] = useState(0);
  const server = useRecoilValue(serverAtom); 

  const decreaseIdx = () => {
    if (curIdx > 0) 
      setCurIdx(curIdx - 1);
    else
      setCurIdx(headlines.length - 1);
  }

  const increaseIdx = () => {
    if (curIdx < headlines.length - 1) 
      setCurIdx(curIdx + 1)
    else
      setCurIdx(0);
  }

  const setHeadline = useCallback(async () => {
    const dummy =  [
      "이스라엘 지상전 확대에 국제유가 2.8% 상승",
      "바이든·시진핑 다음달 정상회당 개최 합의",
      "전청조 투자사기, 남현희 공모 의혹...경찰에 진정 접수",
      "럼피스킨병 52건으로 늘어...의심 신고 6건 검사 중",
      `오늘 오후 이태원 참사 1주기 추모제..."진상규명"`,
      `조규홍 장관 "미니·지방·국립대 의대 정원 확대"`
    ];

    await axios.get(`${server}/api/title`)
    .then((res) => {
      if (res.status === 200){
        setHeadlines(res.data);
      } else {
        setHeadlines(dummy);
      }
    })
    .catch((err) => {
      setHeadlines(dummy);
    });
  }, [server]);

  useEffect(() => {
    setHeadline();
  }, [setHeadline]);

  return (
    <Base>
      <TextBox nowrap dark text="최신 이슈" />
      <Headline>{headlines[curIdx]}</Headline>
      <ArrowContainer 
        onPressLeftArrow={decreaseIdx}
        onPressRightArrow={increaseIdx}
      />
    </Base>

  )
}

export default HeadlineContainer;