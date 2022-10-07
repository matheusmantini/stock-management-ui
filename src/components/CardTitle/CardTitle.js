import React from "react";
import { Container, Line, Text } from "./styled";

const CardTitle = (props) => {
  return (
    <Container>
      <Text>{props.title}</Text>
      <Line />
    </Container>
  );
};

export default CardTitle;
