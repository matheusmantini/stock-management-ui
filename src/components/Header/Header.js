import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Icon } from "./styled";

const Header = () => {
  return (
    <Container>
      <h3>
        <Icon>
          <FontAwesomeIcon icon="fa-solid fa-house" />
        </Icon>
        Menu
      </h3>
    </Container>
  );
};

export default Header;
