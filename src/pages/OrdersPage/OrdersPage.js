import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardTitle from "../../components/CardTitle/CardTitle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import {
  Container,
  ContainerCards,
  CardOrderTitle,
  CardOrder,
  IdPedido,
  CardOrderContent,
  Icon,
  ButtonsContainer,
  EditButton,
  DeleteButton,
  ContainerEmptyMessage,
  ContainerPage,
  ContainerContent,
  ItensPedido
} from "./styled";
import Loading from "../../components/Loading/Loading";
import axios from "axios";

const OrdersPage = () => {
  const [data, isLoading, error] = useRequestData(`${BASE_URL}/orders`);

  const itensPedidos =
    data &&
    data.map((pedido) => {
      let deliveryDate = new Date(pedido.delivery_date).toLocaleDateString();

      const itensList = pedido.items_list_id.map((item) => {
        const itens = async () => {
          const itensFinal = await axios.get(`${BASE_URL}/items-list/${item}`);
          console.log("itensFinal",itensFinal.data.product_id, itensFinal.data.quantity);
          return itensFinal.data.product_id;
        }

        itens();
      })



      return (
        <CardOrder key={pedido.id}>
          <CardOrderTitle>
            <IdPedido>#{pedido.id}</IdPedido>
            <ButtonsContainer>
              <EditButton
                onClick={() => {
                  alert("Página de Edição do pedido! #sqn");
                }}
              >
                <Icon>
                  <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                </Icon>
              </EditButton>
              <DeleteButton
                onClick={() => {
                  alert("Pedido deletado com sucessso! #sqn");
                }}
              >
                <Icon>
                  <FontAwesomeIcon icon="fa-solid fa-x" />
                </Icon>
              </DeleteButton>
            </ButtonsContainer>
          </CardOrderTitle>
          <CardOrderContent>
            <p>Cliente: {pedido.client_name}</p>
            <br />
            <p>Data de Entrega: {deliveryDate}</p>
            <br />
            <ItensPedido>Itens do Pedido: <ul>{itensList}</ul></ItensPedido>
          </CardOrderContent>
        </CardOrder>
      );
    });

  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Pedidos" />
        <Container>
          {isLoading && <Loading />}
          {!isLoading && error && (
            <h1>Deu erro! Verifique a sua conexão com a internet</h1>
          )}
          {!isLoading &&
            itensPedidos &&
            (itensPedidos.length > 0 ? (
              <ContainerCards>{itensPedidos}</ContainerCards>
            ) : (
              <ContainerEmptyMessage>
                <h3>Não há pedidos disponíveis no momento.</h3>
              </ContainerEmptyMessage>
            ))}
        </Container>
      </ContainerContent>
      <Footer />
    </ContainerPage>
  );
};

export default OrdersPage;
