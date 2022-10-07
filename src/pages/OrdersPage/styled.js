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
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;
/* 
  min-height: calc(100vh - 240px);
   */
export const ContainerCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 20px;
`;

/* CARD PEDIDO */

export const CardOrder = styled.li`
  background-color: white;
  width: 20%;
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
    width: 30%;
  }
  @media screen and (max-width: 767px) {
    width: 40%;
  }
  @media screen and (max-width: 365px) {
    width: 80%;
  }
`;

export const CardOrderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  padding-top: 10px;
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
  margin-right: 20px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100px;
  border-radius: 10px;
`;

export const EditButton = styled.button`
  color: var(--color-yellow);
  background-color: transparent;
  height: 32px;
  width: 48px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  :hover{    
    opacity: 0.5;
    background-color: var(--color-yellow);
    color: var(--color-white);
  }
  :active{
    opacity: 0.8;
  }
`;

export const DeleteButton = styled.button`
  color: var(--color-red);
  background-color: transparent;
  height: 32px;
  width: 48px;
  border: 0;
  cursor: pointer;
  opacity: 1;
  border-radius: 10px;
  :hover{    
    opacity: 0.5;
    background-color: var(--color-red);
    color: var(--color-white);
  }
  :active{
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

/* Erro */

export const ContainerEmptyMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1/-1;
  padding: 0;
  h3{
    color: rgb(1,73,99);
    padding: 10px 20px;
    border-radius: 15px;
    background-color: white;
    text-align: center;    
  }
`;