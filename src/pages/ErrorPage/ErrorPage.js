import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Card, Container, Icon } from "./styled";

const ErrorPage = () => {
  return (
    <>
      <Header />
        <Container>
          <Card>
            <Icon>
              <FontAwesomeIcon icon="fa-solid fa-triangle-exclamation" />
            </Icon>
            <h2>Página não encontrada!</h2>
          </Card>
        </Container>
      <Footer />
    </>
  );
};

export default ErrorPage;
