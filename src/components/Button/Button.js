import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Icon, Text } from "./styled";

const Button = (props) => {
  const navigate = useNavigate();
  return (
    <Container type={props.type} onClick={() => props.onclick(navigate)}>
      <Icon>
        <FontAwesomeIcon icon={props.icon} />
      </Icon>
      <Text>{props.text}</Text>
    </Container>
  );
};

export default Button;
