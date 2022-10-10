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

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 40px;
`;

/* CARD PEDIDO */

export const CardOrder = styled.li`
  background-color: white;
  width: 60%;
  min-height: 250px;
  box-shadow: 2px 2px 1px 0px var(--color-dark-green);
  color: black;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  border: 1px outset var(--color-light-green);
  border-radius: 10px;
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

export const CardOrderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 26px;
  padding-top: 10px;
  color: var(--color-white);
  background-color: var(--color-dark-green);
  border-radius: 10px 10px 0 0;
  @media screen and (max-width: 1024px) {
    font-size: 22px;
  }
  @media screen and (max-width: 767px) {
    font-size: 18px;
  }
  @media screen and (max-width: 365px) {
    font-size: 16px;
  }
`;

export const CardOrderContent = styled.div`
  background-color: white;
  height: 100%;
  width: 100%;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  border-radius: 10px;
`;

export const Icon = styled.div`
  font-size: 18px;
`;

export const IdPedido = styled.p`
  font-weight: bold;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100px;
  border-radius: 10px;
  margin: 8px 0;
`;

export const EditButton = styled.button`
  color: var(--color-white);
  background-color: var(--color-yellow);
  height: 32px;
  width: 48px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
    background-color: var(--color-yellow);
    color: var(--color-white);
  }
  :active {
    opacity: 0.8;
  }
`;

export const DeleteButton = styled.button`
  color: var(--color-white);
  background-color: var(--color-red);
  height: 32px;
  width: 42px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  :hover {
    opacity: 0.5;
    background-color: var(--color-red);
    color: var(--color-white);
  }
  :active {
    opacity: 0.8;
  }
`;

/* Itens Pedido */

export const ItensPedido = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const ContainerInput = styled.ul`
  width: 100%;
`;

export const CardInputs = styled.p`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

export const ItemInput = styled.p`
  margin: 10px 0;
`;

export const CardItens = styled.li`
  list-style: none;
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

export const CardTotal = styled.p`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

/* Erro */

export const ContainerEmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/-1;
  padding: 0;
  h3 {
    color: rgb(1, 73, 99);
    padding: 10px 20px;
    border-radius: 15px;
    background-color: var(--color-white);
    text-align: center;
  }
`;
