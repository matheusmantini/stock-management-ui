import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ContainerFormProducts,
  InputFormProducts,
  SelectFormProducts,
  AddButton,
  Icon,
  ContainerSendButton,
  SendButton,
  ProductAdded,
  ContainerAddedProducts
} from "./styled";

const CreateOrderPage = (props) => {
  const navigate = useNavigate();
  const [data] = useRequestData(`${BASE_URL}/products`);

  const listaProdutos = data && data.map((produto) => {
    return <option key={produto.id} value={produto.id}>{produto.name}</option>
  })

  const [listOfOrdersProducts, setListOfOrdersProducts] = useState([]);
  const [productsListId, setProductsListId] = useState([]);
  const [productItem, setProductItem] = useState({});
  const [productId, setProductId] = useState(' ');
  const [quantity, setQuantity] = useState(0);

  const onChangeProductId = (event) => {
    setProductId(event.target.value);
  }

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }

  const onSubmitAddProductToList = (e) => {
    e.preventDefault();    
    productItem.product_id = productId;
    productItem.quantity = +quantity;
    if(productId === undefined || quantity < 1){
      alert('Por favor, escolha um produto e quantidade mairo que 0.');
      return;
    }

    /* Request to create a new Item List */
    
    const addProductToList = async() => {

      const BODY = {
        product_id: productId,
        quantity: +quantity
      }
      console.log("BODY",BODY);

      try {
        const itemList = await axios
      .post(
        `${BASE_URL}/items-list`,
        BODY,
      );
      setProductsListId([...productsListId,itemList.data.id]);
      setProductId(' ');
      setQuantity(0);
      return itemList;
      } catch (error) {
        alert("Houve um erro e o produto não pôde ser cadastrado com sucesso!"); 
      }
    }
    addProductToList();

  }

  /* Request to get all items list */

  useEffect(() => {
    productsListId && productsListId.map(async(productId) => {
      const product = await axios.get(`${BASE_URL}/items-list/${productId}`);
      setListOfOrdersProducts([...listOfOrdersProducts,product.data])
      console.log("data", product.data);
    })
  },[productsListId])
  
  const listOfProductsAddedToOrder = listOfOrdersProducts && listOfOrdersProducts.map((product) => {
    return <ProductAdded>Produto: {product.product_name} / Quantidade: {product.quantity}</ProductAdded>
  })


  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Cadastrar Novo Pedido" hasButton={false} />
        <ContainerCardForm>
          <CardForm>
            <CustomForm>
              <label>Cliente: </label>
              <Input name="client_name" type="text" />
              <label>Data de Entrega: </label>
              <Input name="delivery_date" type="date" />
              <label>Adicionar Produtos: </label>
              <ContainerFormProducts onSubmit={onSubmitAddProductToList}>
                <SelectFormProducts name="product_id"  value={productId} onChange={onChangeProductId}>
                <option label=" -- Selecione uma opção -- "></option>
                  {listaProdutos}
                </SelectFormProducts>
                <InputFormProducts name="quantity" type="number" placeholder="Quantidade" value={quantity} onChange={onChangeQuantity}/>
                <AddButton
                  title='Adicionar produto ao pedido'
                >
                  <Icon>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                  </Icon>
                </AddButton>
              </ContainerFormProducts>
              <label>Produtos Adicionados: </label>
              <ContainerAddedProducts>
                {listOfProductsAddedToOrder}
              </ContainerAddedProducts>
              <ContainerSendButton>
                <SendButton>Enviar</SendButton>
              </ContainerSendButton>
            </CustomForm>
          </CardForm>
        </ContainerCardForm>
      </ContainerContent>
      <Footer />
    </ContainerPage>
  );
};

export default CreateOrderPage;
