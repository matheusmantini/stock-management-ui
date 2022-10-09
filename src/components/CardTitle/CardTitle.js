import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { goToCreateOrderPage } from "../../routes/coordinator";
import { Container, ContainerTitle, CreateButton, Icon, Line, Text } from "./styled";

const CardTitle = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <ContainerTitle>
        <Text>{props.title}</Text>
        {props.hasButton && <CreateButton
          title={'Criar ' + props.title.toLowerCase()}
          onClick={() => {
            if (props.title === "Pedidos") {
              goToCreateOrderPage(navigate);
            } else if (props.title === "Produtos") {
              alert("Página de Criação de Produtos! #sqn");
            };
          }}
        >
          <Icon>
            <FontAwesomeIcon icon="fa-solid fa-plus" />
          </Icon>
        </CreateButton>}
      </ContainerTitle>
      <Line />
    </Container>
  );
};

export default CardTitle;
