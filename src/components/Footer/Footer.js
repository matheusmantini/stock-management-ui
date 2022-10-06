import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Icon, Text } from "./styled";

const Footer = () => {
  return (
    <Container>
      <Text>
        <Icon>
          <FontAwesomeIcon icon="fa-regular fa-copyright" />
        </Icon>
        Todos os direitos reservados
      </Text>
    </Container>
  );
};

export default Footer;
