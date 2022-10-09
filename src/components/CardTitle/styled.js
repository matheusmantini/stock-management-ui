import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
`;

export const Icon = styled.div`
  font-size: 18px;
`;

export const CreateButton = styled.button`
  color: var(--color-white);
  background-color: var(--color-light-green);
  height: 32px;
  width: 48px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  margin-left: 30px;
  :hover {
    opacity: 0.5;
    color: var(--color-white);
  }
  :active {
    opacity: 0.8;
  }
`;

export const Line = styled.div`
  width: 40%;
  height: 2px;
  background-color: var(--color-dark-green);
  margin-top: 8px;
`;

export const Text = styled.h2`
  color: var(--color-dark-green);
`;
