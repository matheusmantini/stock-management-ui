import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px);
  z-index: 1;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 250px;
  width: 350px;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-green);
  border-radius: 15px;
  color: var(--color-dark-green);
  h2 {
    text-align: center;
  }
  i {
    font-size: 150px;
  }
  
  @media screen and (max-width: 767px) {
    height: 30%;
    width: 90%;
    font-size: 12px;
    i {
      font-size: 60px;
    }
  }
`;

export const Icon = styled.i`
  color: var(--color-yellow);
`;
