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
  ItemInput,
  ButtonsContainer,
  EditButton,
  DeleteButton,
  ContainerEmptyMessage,
  TotalTag,
  LabelForm
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

      let validate = false;

      const BODY = {
        product_id: productId,
        quantity: +quantity
      }

      const productDetail = await axios
      .get(`${BASE_URL}/products/${productId}`);

      if(BODY.quantity > productDetail.data.qty_stock){
        alert(`A quantidade informada não está disponível em estoque. Escolha um valor menor ou igual a ${productDetail.data.qty_stock}`);
        validate = true;
      }

      listOfOrdersProducts && listOfOrdersProducts.forEach((product) => {

        if (product.product_id === productId) {
          setProductId(' ');
          setQuantity(0);
          alert("O produto selecionado já foi adicionado ao pedido!");
          validate = true;
        }
      });

      if(!validate){
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
      return;
      
    }
    addProductToList();

  }

  /* Request to get all items list */

  useEffect(() => {
    productsListId && productsListId.map(async(productId) => {
      const product = await axios.get(`${BASE_URL}/items-list/${productId}`);
      setListOfOrdersProducts([...listOfOrdersProducts,product.data])
    })
  },[productsListId])
  
  const listOfProductsAddedToOrder = listOfOrdersProducts && listOfOrdersProducts.map((product) => {
    totalOrderAmount += product.total;
    return (<CardInputs key={Math.floor(Math.random() * Math.random())}>
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
      <ButtonsContainer>
        <EditButton
          title="Editar quantidade"
          onClick={async () => {
            const newQuantity = +prompt('Digite a nova quantidade: ');
            product.quantity = newQuantity;

            const BODY = {
              quantity: newQuantity
            }
            try {
              await axios
            .patch(
              `${BASE_URL}/items-list/${product.item_list_id}`,BODY);

              alert("Produto editado com sucessso! #sqn");

            }catch(err){
            alert("Houve um erro e o produto não pôde ser deletado.");
          }
          }}
        >
          <Icon>
            <FontAwesomeIcon icon="fa-regular fa-pen-to-square" />
          </Icon>
        </EditButton>
        <DeleteButton
          title="Deletar produto do pedido"
          onClick={async () => {
            try {
              await axios
            .delete(
              `${BASE_URL}/items-list/${product.item_list_id}`);

              if(productsListId.includes(product.item_list_id)){
              const newListOrderProducts = listOfOrdersProducts.filter((productOrder)=>{
                return productOrder.item_list_id !== product.item_list_id;
              });
              setListOfOrdersProducts(newListOrderProducts);

            }                            

            alert("Produto deletado do pedido com sucessso! #sqn");
          }catch(err){
            alert("Houve um erro e o produto não pôde ser deletado.");
          }
            
        }}
        >
          <Icon>
            <FontAwesomeIcon icon="fa-solid fa-x" />
          </Icon>
        </DeleteButton>
      </ButtonsContainer>
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

      for (let i = 0; i < productsListId.length; i++) {
        const item = await axios.get(`${BASE_URL}/items-list/${productsListId[i]}`); 
        await axios.patch(`${BASE_URL}/products/${item.data.product_id}`,{quantity: item.data.quantity});
      }

      setClientName('');
      setDeliveryDate('');
      setProductId(' ');
      setQuantity(0);
      setListOfOrdersProducts([]);
      alert("Pedido cadastrado com sucesso!"); 
      return newOrder;
      } catch (error) {
        alert("Houve um erro e o pedido não pôde ser cadastrado com sucesso! ",error); 
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
              <LabelForm>Cliente </LabelForm>
              <Input name="client_name" type="text" value={clientName} onChange={onChangeClientName} />
              <LabelForm>Data de Entrega </LabelForm>
              <Input name="delivery_date" type="date" value={deliveryDate} onChange={onChangeDeliveryDate} />
              <LabelForm>Adicionar Produtos </LabelForm>
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
              <LabelForm>Produtos Adicionados </LabelForm>
              <ContainerAddedProducts>
              {listOfProductsAddedToOrder && listOfProductsAddedToOrder.length > 0 ? listOfProductsAddedToOrder : <ContainerEmptyMessage><h3>Não há produtos adicionados</h3></ContainerEmptyMessage>}
              </ContainerAddedProducts>
              <LabelForm>ValorTotal </LabelForm>
              <TotalTag>{new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(totalOrderAmount)}</TotalTag>
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
