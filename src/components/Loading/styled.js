import styled, { keyframes } from "styled-components";

export const sideToSideSlide = keyframes`
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
`;

export const LoadingSlider = styled.div`
  border: 1.6rem solid var(--color-light-green);
  border-radius: 50%;
  border-top: 1.6rem solid var(--color-dark-green);
  width: 6rem;
  height: 6rem;
  animation: ${sideToSideSlide} 1.5s linear infinite;
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  width: 100vw;
`;
