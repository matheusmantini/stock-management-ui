import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 60px - 40px);
  z-index: 1;
`;

export const LeftCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
  width: 50%;
  height: 100%;
`;

export const RightCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  width: 50%;
  height: 100%;
`;

export const ButtonsContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
