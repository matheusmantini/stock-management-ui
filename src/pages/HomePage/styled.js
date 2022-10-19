import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: calc(100vh - 100px);
  
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const LeftCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-black);
  width: 50%;
  height: 100%;
  
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const RightCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-white);
  width: 50%;
  height: 100%;
  
  @media screen and (max-width: 767px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ButtonsContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
