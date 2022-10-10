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
  ContainerAddedProducts,
  CardInputs,
  ItemInput
} from "./styled";

const CreateOrderPage = (props) => {
  const navigate = useNavigate();
  const [data] = useRequestData(`${BASE_URL}/products`);

  const listaProdutos = data && data.map((produto) => {
    return <option key={produto.id} value={produto.id}>{produto.name}</option>
  })

  const [clientName, setClientName] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  let [totalOrderAmount, setTotalOrderAmount] = useState(0);
  const [listOfOrdersProducts, setListOfOrdersProducts] = useState([]);
  const [productsListId, setProductsListId] = useState([]);
  const [productItem, setProductItem] = useState({});
  const [productId, setProductId] = useState(' ');
  const [quantity, setQuantity] = useState(0);

  const onChangeClientName = (event) => {
    setClientName(event.target.value);
  }

  const onChangeDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  }

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
    totalOrderAmount += product.total;
    return (<CardInputs key={product.product_name}>
      <ItemInput>
        <b>Produto:</b> {product.product_name}
      </ItemInput>
      <ItemInput>
        <b>Quantidade:</b> {product.quantity}
      </ItemInput>
      <ItemInput>
        <b>Preço Unitário:</b>{" "}
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price)}
      </ItemInput>
    </CardInputs>)
  })

  /* Request to Add New Order */

  const onClickAddNewOrder = async () => {

    if(clientName === '' || deliveryDate === '' || productsListId.length < 1){
      alert("Informe o nome do cliente, data de entrega e escolha um produto");
      return;
    }

      const BODY = {
        delivery_date: new Date(deliveryDate).toISOString(),
        client_name: clientName,
        items_list_id: productsListId
      }

      try {
        const newOrder = await axios
      .post(
        `${BASE_URL}/orders`,
        BODY,
      );
      setClientName('');
      setDeliveryDate('');
      setProductId(' ');
      setQuantity(0);
      setListOfOrdersProducts([]);
      alert("Pedido cadastrado com sucesso!"); 
      return newOrder;
      } catch (error) {
        alert("Houve um erro e o pedido não pôde ser cadastrado com sucesso!"); 
      }

  }

  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Cadastrar Novo Pedido" hasButton={false} />
        <ContainerCardForm>
          <CardForm>
            <CustomForm>
              <label>Cliente: </label>
              <Input name="client_name" type="text" value={clientName} onChange={onChangeClientName} />
              <label>Data de Entrega: </label>
              <Input name="delivery_date" type="date" value={deliveryDate} onChange={onChangeDeliveryDate} />
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
              <br/>
              <label>ValorTotal: </label>
              <b>{new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalOrderAmount)}</b>
              <ContainerSendButton>
                <SendButton onClick={onClickAddNewOrder}>Enviar</SendButton>
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
