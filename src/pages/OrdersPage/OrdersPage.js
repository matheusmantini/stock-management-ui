import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardTitle from "../../components/CardTitle/CardTitle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Container, GridMenu, ContainerGrid, CardOrder, CardOrderContent, Icon, DeleteButton, EditButton, CardOrderTitle, IdPedido, ButtonsContainer } from "./styled";

const OrdersPage = () => {

  const pedidos = [
    {id: 1, client_name: "João", delivery_date: "2022-10-06T09:47:00.000Z", item_list: ["1","2"]}, 
    {id: 2, client_name: "Maria", delivery_date: "2022-10-07T11:35:00.000Z", item_list: ["2","3"]}, 
    {id: 3, client_name: "Pedro", delivery_date: "2022-10-11T18:46:00.000Z", item_list: ["7","4"]}, 
    {id: 4, client_name: "Paulo", delivery_date: "2022-10-15T21:12:32.000Z", item_list: ["5","11"]}]
    
    const itensPedidos = pedidos.map((pedido) =>{

      let deliveryDate = new Date(pedido.delivery_date).toLocaleDateString();
      
      return <CardOrder key={pedido.id}>
          <CardOrderTitle>
            <IdPedido>#{pedido.id}</IdPedido>
            <ButtonsContainer>
              <EditButton onClick={() => {alert("Página de Edição do pedido! #sqn")}}><Icon><FontAwesomeIcon icon="fa-regular fa-pen-to-square" /></Icon></EditButton>
              <DeleteButton onClick={() => {alert("Pedido deletado com sucessso! #sqn")}}><Icon><FontAwesomeIcon icon="fa-solid fa-x" /></Icon></DeleteButton>
            </ButtonsContainer>
          </CardOrderTitle>
        <CardOrderContent>
          <p>Cliente: {pedido.client_name}</p>
          <p>Data de Entrega: {deliveryDate}</p>
          <p>Itens do Pedido: {pedido.item_list}</p>
        </CardOrderContent>
      </CardOrder>
      
    })

  return (
    <>
    <Header />
      <CardTitle title="Pedidos" />
      <Container>
        <ContainerGrid>
          <GridMenu>
          {itensPedidos}
          </GridMenu>
        </ContainerGrid>
      </Container>
    <Footer />
    </>
  );
};

export default OrdersPage;
