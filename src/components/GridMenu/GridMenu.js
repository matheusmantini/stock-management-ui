import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container, Icon, Item, Text } from "./styled";

const GridMenu = (props) => {
  return (
    <Container>
      {props.content}
    </Container>
  );
};

export default GridMenu;
