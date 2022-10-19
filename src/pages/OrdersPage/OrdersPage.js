import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import CardTitle from "../../components/CardTitle/CardTitle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import {
  Container,
  ContainerCards,
  CardOrderTitle,
  CardOrder,
  IdPedido,
  CardOrderContent,
  ContainerEmptyMessage,
  ContainerPage,
  ContainerContent,
  ItensPedido,
  CardInputs,
  ContainerInput,
  CardTotal,
  ItemInput,
} from "./styled";

const OrdersPage = () => {
  const [data, isLoading, error] = useRequestData(`${BASE_URL}/orders`);
  const [itensPedido, setItensPedido] = useState();

  useEffect(() => {
    setItensPedido(
      data &&
        data.map((pedido, index) => {
          let getDate = pedido.delivery_date.slice(0, 10).split("-");
          const deliveryDate = getDate[2] + "/" + getDate[1] + "/" + getDate[0];

          const shoppingList = pedido.shopping_list;

          const shoppingItems = shoppingList.map(
            ({ product, quantity, price }, index) => (
              <CardInputs key={index}>
                <ItemInput>
                  <b>Produto:</b> {product}
                </ItemInput>
                <ItemInput>
                  <b>Quantidade:</b> {quantity}
                </ItemInput>
                <ItemInput>
                  <b>Preço Unitário:</b>{" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(price)}
                </ItemInput>
              </CardInputs>
            )
          );

          return (
            <CardOrder key={index}>
              <CardOrderTitle>
                <IdPedido># {pedido.id}</IdPedido>
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
        })
    );
  }, [data]);

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
