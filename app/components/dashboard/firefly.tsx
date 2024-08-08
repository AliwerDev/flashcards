/** @jsxImportSource @emotion/react */
import React from "react";
import styled from "@emotion/styled";
import { keyframes, css } from "@emotion/react";

const drift = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const flash = keyframes`
  0%, 30%, 100% {
    opacity: 0;
    box-shadow: 0 0 0vw 0vw yellow;
  }
  5% {
    opacity: 1;
    box-shadow: 0 0 2vw 0.4vw yellow;
  }
`;

const generateMoveKeyframes = (index: number, steps: number) => keyframes`
  ${Array.from(
    { length: steps + 1 },
    (_, step) => `
    ${step * (100 / steps)}% {
      transform: translateX(${Math.random() * 100 - 50}vw) translateY(${Math.random() * 100 - 50}vh) scale(${Math.random() * 0.75 + 0.25});
    }
  `
  ).join("")}
`;

interface FireflyProps {
  moveAnimation: ReturnType<typeof keyframes>;
  rotationSpeed: string;
  randomDuration: number;
  randomDelay: number;
}

const Firefly = styled.div<FireflyProps>`
  position: fixed;
  left: 50%;
  top: 50%;
  width: 0.4vw;
  height: 0.4vw;
  margin: -0.2vw 0 0 9.8vw;
  animation: ${(props) => props.moveAnimation} ease 200s alternate infinite;
  pointer-events: none;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform-origin: -10vw;
  }

  &::before {
    background: black;
    opacity: 0.4;
    animation: ${drift} ease alternate infinite;
  }

  &::after {
    background: white;
    opacity: 0;
    box-shadow: 0 0 0vw 0vw yellow;
    animation: ${drift} ease alternate infinite, ${flash} ease infinite;
    animation-duration: ${(props) => props.rotationSpeed}, ${(props) => props.randomDuration}ms;
    animation-delay: 0ms, ${(props) => props.randomDelay}ms;
  }
`;

const FireFlies: React.FC = () => {
  const quantity = 15;
  const fireflies = Array.from({ length: quantity }).map((_, i) => {
    const steps = Math.floor(Math.random() * 12) + 16;
    const rotationSpeed = `${Math.floor(Math.random() * 10) + 8}s`;
    const randomDuration = Math.floor(Math.random() * 6000) + 5000;
    const randomDelay = Math.floor(Math.random() * 8000) + 500;
    const moveAnimation = generateMoveKeyframes(i + 1, steps);

    return <Firefly key={i} moveAnimation={moveAnimation} rotationSpeed={rotationSpeed} randomDuration={randomDuration} randomDelay={randomDelay} />;
  });

  return (
    <div
      css={css`
        height: 100%;
      `}
    >
      {fireflies}
    </div>
  );
};

export default FireFlies;
