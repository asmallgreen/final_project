import React from "react";
import styled, { keyframes } from "styled-components";

const drawIn = keyframes`
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Circle = styled.circle`
  fill: #ffffff;
  stroke-width: 12;
  stroke: #616153;
  stroke-dasharray: 1000;
  animation: ${drawIn} 0.8s ease-in-out forwards;
`;

const ThinCircle = styled.circle`
  fill: none;
  stroke-width: 4;
  stroke: #616153;
  stroke-dasharray: 1000;
  animation: ${drawIn} 1s ease-in-out infinite;
`;

const InnerCircle = styled.circle`
  fill: #e74c3c;
`;

const ConcentricCircles = () => {
  return (
    <Container>
      <svg width="150" height="150">
        <Circle cx="75" cy="75" r="65" />
        <ThinCircle cx="75" cy="75" r="50" />
        <Circle cx="75" cy="75" r="35" />
        <InnerCircle cx="75" cy="75" r="15" />
      </svg>
    </Container>
  );
};

export default ConcentricCircles;
