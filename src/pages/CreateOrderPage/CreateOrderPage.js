import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CardTitle from "../../components/CardTitle/CardTitle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import {
  CardForm,
  ContainerCardForm,
  ContainerContent,
  ContainerPage,
  CustomForm,
  Input,
} from "./styled";

const CreateOrderPage = (props) => {
  const [data, isLoading, error] = useRequestData(`${BASE_URL}/products`);
  console.log(data);

  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Cadastrar Novo Pedido" hasButton={false} />
        <ContainerCardForm>
          <CardForm>
            <CustomForm>
              <label>Cliente: </label>
              <Input type="text" />
              <label>Data de Entrega: </label>
              <Input type="date" />
              <label>Adicionar Produtos: </label>
              <select>
                <options>Produto 1</options>
                <options>Produto 2</options>
                <options>Produto 3</options>
                <options>Produto 4</options>
              </select>
              <label>Produtos Adicionados: </label>
              <Input type="text" />
              <button>Enviar</button>
            </CustomForm>
          </CardForm>
        </ContainerCardForm>
      </ContainerContent>
      <Footer />
    </ContainerPage>
  );
};

export default CreateOrderPage;
