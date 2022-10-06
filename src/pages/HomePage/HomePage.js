import React from "react";
import { goToProductsPage, goToOrdersPage } from "../../routes/coordinator";
import { Container, LeftCard, RightCard } from "./styled";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/Button/Button";

const HomePage = () => {
  return (
    <>
      <Header />
      <Container>
        <LeftCard>
          <Button
            text="Produtos"
            type="products"
            icon="fa-solid fa-boxes-stacked"
            onclick={goToProductsPage}
          />
        </LeftCard>
        <RightCard>
          <Button
            text="Pedidos"
            icon="fa-solid fa-list"
            onclick={goToOrdersPage}
          />
        </RightCard>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
