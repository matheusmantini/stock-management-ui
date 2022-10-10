import styled from "styled-components";

export const ContainerPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  height: 100vh;
`;

export const ContainerContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  margin-bottom: 50px;
`;

export const ContainerCardForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const CardForm = styled.div`
  background-color: var(--color-white);
  width: 50%;
  min-height: 250px;
  box-shadow: 2px 2px 1px 0px var(--color-dark-green);
  color: black;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  border: 1px outset var(--color-light-green);
  border-radius: 10px;
  padding: 20px;
  @media screen and (max-width: 1024px) {
    width: 80%;
  }
  @media screen and (max-width: 767px) {
    width: 80%;
    font-size: 16px;
  }
  @media screen and (max-width: 365px) {
    font-size: 14px;
  }
`;

/* estava como .form */
export const CustomForm = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Input = styled.input`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

export const ProductAdded = styled.p`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

export const CardInputs = styled.div`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

export const ItemInput = styled.p`
  margin: 10px 0;
`;

export const ContainerAddedProducts = styled.div`
  width: 100%;
`;

export const ContainerFormProducts = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

export const ContainerSendButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SendButton = styled.button`
color: var(--color-white);
background-color: var(--color-light-green);
height: 40px;
width: 150px;
border: 0;
cursor: pointer;
font-size: 16px;
opacity: 1;
border-radius: 10px;
:hover {
  opacity: 0.7;
  color: var(--color-white);
}
:active {
  opacity: 0.8;
}
`;

export const InputFormProducts = styled.input`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 20%;
`;

export const SelectFormProducts = styled.select`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 80%;
  background-color: var(--color-white);
`;

export const Icon = styled.div`
  font-size: 18px;
`;

export const AddButton = styled.button`
  color: var(--color-white);
  background-color: var(--color-light-green);
  height: 32px;
  width: 48px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
    color: var(--color-white);
  }
  :active {
    opacity: 0.8;
  }
`;