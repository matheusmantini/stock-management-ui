import React from "react";
import { goToProductsPage } from "../../routes/coordinator";
import { useNavigate } from "react-router-dom";
import { ButtonsContainer } from "./styled";
import Header from "../../components/Header/Header";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <h1>Bem vindo(a) ao Shopper System</h1>
      <ButtonsContainer>
        <button onClick={() => goToProductsPage(navigate)}>
          Ver página de produtos
        </button>
      </ButtonsContainer>
    </>
  );
};

export default HomePage;
