import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
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
  ItensPedido,
  CardInputs,
  ContainerInput,
  CardTotal,
} from "./styled";
import Loading from "../../components/Loading/Loading";

const OrdersPage = () => {
  const [data, isLoading, error] = useRequestData(`${BASE_URL}/orders`);
  const [itensPedido, setItensPedido] = useState();


  useEffect(() => {
    setItensPedido(
      data &&
      data.map((pedido) => {
        const deliveryDate = new Date(
          pedido.delivery_date
        ).toLocaleDateString();

        const shoppingList = pedido.shopping_list;

        const shoppingItems = shoppingList.map(
          ({ product, quantity, price }) => (
            <>
              <CardInputs>
                <p>
                  <b>Produto:</b> {product}
                </p>
                <p>
                  <b>Quantidade:</b> {quantity}
                </p>
                <p>
                  <b>Preço Unitário:</b>{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(price)}
                </p>
              </CardInputs>
            </>
          )
        );

        return (
          <CardOrder key={pedido.id}>
            <CardOrderTitle>
              <IdPedido>#{pedido.id}</IdPedido>
              <ButtonsContainer>
                <EditButton
                  title="Editar pedido"
                  onClick={() => {
                    alert("Página de Edição do pedido! #sqn");
                  }}
                >
                  <Icon>
                    <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
                  </Icon>
                </EditButton>
                <DeleteButton
                  title="Deletar pedido"
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
              <p>Cliente: </p>
              <CardInputs>{pedido.client_name}</CardInputs>
              <p>Data de Entrega: </p>
              <CardInputs>{deliveryDate}</CardInputs>
              <ItensPedido>
                Itens do Pedido:{" "}
                <ContainerInput>{shoppingItems}</ContainerInput>
              </ItensPedido>
              <CardTotal>
                Total:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(pedido.total_amount)}
              </CardTotal>
            </CardOrderContent>
          </CardOrder>
        );
      }));
  },[data]);

  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Pedidos" hasButton={true} />
        <Container>
          {isLoading && <Loading />}
          {!isLoading && error && (
            <h1>Deu erro! Verifique a sua conexão com a internet</h1>
          )}
          {!isLoading &&
            itensPedido &&
            (itensPedido.length > 0 ? (
              <ContainerCards>{itensPedido}</ContainerCards>
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
