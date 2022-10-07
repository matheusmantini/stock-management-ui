import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Line, Text } from "./styled";

const CardTitle = (props) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Text>{props.title}</Text>
      <Line />
    </Container>
  );
};

export default CardTitle;
