import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import styled, { keyframes } from "styled-components";

const fadeInRight = keyframes`
    from {
    opacity: 0;
    transform: translate(0, 0); 
  }
  to {
    opacity: 1;
    transform: translate(150px, 30px);
  }
`;
const ArrowContainer = styled.span`
  display: inline-block;
  font-size: 40px;
  opacity: 0;
  animation: ${fadeInRight} 1s ease-in-out forwards ;

  svg{
    fill: #ebcf62;
    stroke-width: 2;
  }
`;



// const AnimatedArrow = () => (
//   <ArrowContainer>
//     <FaArrowRightLong />
//   </ArrowContainer>
// );
const AnimatedArrow = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // 在元件初次渲染時執行動畫
    setHasAnimated(true);
  }, []); // 空的依賴項表示僅在初次渲染時執行

  return <ArrowContainer style={{ animationPlayState: hasAnimated ? "running" : "paused" }}><FaArrowRightLong /></ArrowContainer>;
};

export default AnimatedArrow;
