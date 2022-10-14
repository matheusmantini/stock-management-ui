import styled from "styled-components";

export const Container = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid var(--color-light-green);
  cursor: pointer;
  background-color: ${(props) => (props.type === "products" ? "var(--color-white)" : "var(--color-black)")};
  color: var(--color-light-green);
  :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 767px) {
    width: 70%;
  }
`;

export const Text = styled.p`
  font-size: 26px;

  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;

export const Icon = styled.span`
  margin-right: 6px;
  font-size: 22px;

  @media screen and (max-width: 767px) {
    font-size: 16px;
  }
`;
