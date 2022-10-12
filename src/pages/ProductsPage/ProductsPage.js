import React, { useState } from "react";
import CardTitle from "../../components/CardTitle/CardTitle";
import Filters from "../../components/Filter/Filter";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import {
  CardInputs,
  CardProduct,
  CardProductContent,
  CardProductTitle,
  ContainerContent,
  ContainerCards,
  ContainerEmptyMessage,
  Id,
  ContainerFilterSort,
} from "./styled";

const ProductsPage = () => {
  const [data, isLoading] = useRequestData(`${BASE_URL}/products`);
  
  /* filter */

  const [query, setQuery] = useState("");
  const [sortingParameter, setSortingParameter] = useState("name");
  const [order, setOrder] = useState(1);

  const updateQuery = (event) => {
    setQuery(event.target.value);
  };

  const updateSortingParameter = (event) => {
    setSortingParameter(event.target.value);
  };

  const updateOrder = (event) => {
    setOrder(event.target.value);
  };

  /* filter */

  const listaProdutos =
    data &&
    data
    .filter(product => {
      return product.name.toLowerCase().includes(query.toLowerCase());
    })
    .sort((currentProduct, nextProduct) => {
      switch (sortingParameter) {
        case "price": 
        return order * (currentProduct.price - nextProduct.price)
        case "stock":   
        return order * (currentProduct.qty_stock - nextProduct.qty_stock)
        default:                
          return order * ('' + currentProduct.name.toLowerCase()).localeCompare(nextProduct.name.toLowerCase());
      }
    })
    .map((produto) => {
      return (
        <CardProduct key={Math.random()}>
          <CardProductTitle>
            <Id># {produto.id}</Id>
          </CardProductTitle>
          <CardProductContent>
            <p>Nome: </p>
            <CardInputs>{produto.name}</CardInputs>
            <p>Preço: </p>
            <CardInputs>{new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.price)}</CardInputs>
            <p>Quantidade em Estoque: </p>
            {produto.qty_stock < 1 ? (
              <CardInputs estoque="zero">{produto.qty_stock}</CardInputs>
            ) : (
              <CardInputs>{produto.qty_stock}</CardInputs>
            )}
          </CardProductContent>
        </CardProduct>
      );
    });

  return (
    <>
      <Header />
      <CardTitle title="Produtos" />
      <ContainerFilterSort>
        <Filters
          query={query}
          updateQuery={updateQuery}
          updateSortingParameter={updateSortingParameter}
          updateOrder={updateOrder}
          sortingParameter={sortingParameter}
          order={order}
        />
      </ContainerFilterSort>

      <ContainerContent>
        {!isLoading &&
          listaProdutos &&
          (listaProdutos.length > 0 ? (
            <ContainerCards>{listaProdutos}</ContainerCards>
          ) : (
            <ContainerEmptyMessage>
              <h3>Não há produtos disponíveis no momento.</h3>
            </ContainerEmptyMessage>
          ))}
      </ContainerContent>
      <Footer />
    </>
  );
};

export default ProductsPage;
