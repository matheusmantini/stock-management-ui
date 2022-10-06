import styled from "styled-components";

export const Container = styled.button`
  width: 200px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed
    ${(props) => (props.type === "products" ? "white" : "black")};
  cursor: pointer;
  background-color: transparent;
  color: rgb(82, 181, 145);
  :hover {
    opacity: 0.5;
  }
`;

export const Text = styled.p`
  font-size: 26px;
`;

export const Icon = styled.span`
  margin-right: 6px;
  font-size: 22px;
`;
