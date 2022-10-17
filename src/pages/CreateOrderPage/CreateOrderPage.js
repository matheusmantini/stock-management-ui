import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import CardTitle from "../../components/CardTitle/CardTitle";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { BASE_URL } from "../../constants/urls";
import useRequestData from "../../hooks/useRequestData";
import * as notification from "./Notifications/notifications";
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
  ContainerAddedProducts,
  CardInputs,
  ItemInput,
  ButtonsContainer,
  EditButton,
  DeleteButton,
  ContainerEmptyMessage,
  TotalTag,
  LabelForm,
} from "./styled";

const CreateOrderPage = (props) => {
  // Pega todos os produtos disponíveis e seta como opção no select
  const [data] = useRequestData(`${BASE_URL}/products`);

  const listaProdutos =
    data &&
    data.map((produto, index) => {
      return (
        <option key={index} value={produto.id}>
          {produto.name}
        </option>
      );
    });

  const [productItem, setProductItem] = React.useState({});
  const [listOfOrdersProducts, setListOfOrdersProducts] = React.useState([]);
  const [totalOrderAmount, setTotalOrderAmount] = React.useState([]);

  const [clientName, setClientName] = React.useState("");
  const [deliveryDate, setDeliveryDate] = React.useState("");
  const [productId, setProductId] = React.useState(" ");
  const [quantity, setQuantity] = React.useState(0);
  const [productsListId, setProductsListId] = React.useState([]);

  const onChangeClientName = (event) => {
    setClientName(event.target.value);
  };

  const onChangeDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  };

  const onChangeProductId = (event) => {
    setProductId(event.target.value);
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  React.useEffect(() => {
    productsListId &&
      productsListId.map(async (productId) => {
        const product = await axios.get(`${BASE_URL}/items-list/${productId}`);
        for (let i = 0; i < listOfOrdersProducts.length; i++) {
          if (listOfOrdersProducts[i].product_id === product.data.product_id) {
            return;
          }
        }
        setListOfOrdersProducts([...listOfOrdersProducts, product.data]);
      });
  }, [productsListId]);

  const onSubmitAddProductToList = (e) => {
    e.preventDefault();
    setProductItem({ ...productItem, product_id: productId });
    productItem.quantity = +quantity;

    if (productId === " ") {
      notification.warnChooseAProduct();
      return;
    }

    if (quantity < 1) {
      notification.warnQuantityMustBeHigherThanZero();
      return;
    }

    const addProductToList = async () => {
      let isValid = true;

      const BODY = {
        product_id: productId,
        quantity: Number(quantity),
      };

      const productDetail = await axios.get(
        `${BASE_URL}/products/${productId}`
      );

      if (productDetail.data.qty_stock === 0) {
        notification.warnUnavailableStock();
        isValid = false;
      }

      if (BODY.quantity > productDetail.data.qty_stock) {
        notification.warnUnavailableQuantity(productDetail.data.qty_stock);
        isValid = false;
      }

      listOfOrdersProducts &&
        listOfOrdersProducts.forEach((product) => {
          if (product.product_id === productId) {
            setProductId(" ");
            setQuantity(0);
            notification.warnProductAlreadyAdded();
            isValid = false;
          }
        });

      if (isValid) {
        try {
          const itemList = await axios.post(`${BASE_URL}/items-list`, BODY);
          setProductsListId([...productsListId, itemList.data.id]);
          setProductId(" ");
          setQuantity(0);
          notification.successProductAdded();
          const itemListDetails = await axios.get(
            `${BASE_URL}/items-list/${itemList.data.id}`
          );
          setTotalOrderAmount([
            ...totalOrderAmount,
            { itemId: itemList.data.id, total: itemListDetails.data.total },
          ]);
          return itemList;
        } catch (error) {
          notification.errorProductCouldNotBeAdded();
        }
      }
      return;
    };
    addProductToList();
  };

  const listOfProductsAddedToOrder =
    listOfOrdersProducts &&
    listOfOrdersProducts.map((product, index) => {
      return (
        <CardInputs key={index}>
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
                const newQuantity = +prompt("Digite a nova quantidade: ");
                product.quantity = newQuantity;

                const BODY = {
                  quantity: newQuantity,
                };

                const productDetail = await axios.get(
                  `${BASE_URL}/products/${product.product_id}`
                );

                if (BODY.quantity > productDetail.data.qty_stock) {
                  notification.warnUnavailableQuantity(
                    productDetail.data.qty_stock
                  );
                } else {
                  try {
                    await axios.patch(
                      `${BASE_URL}/items-list/${product.item_list_id}`,
                      BODY
                    );
                    notification.successProductEdited();

                    const newProductAdded = await axios.get(
                      `${BASE_URL}/items-list/${product.item_list_id}`
                    );

                    if (
                      !totalOrderAmount.some(
                        (productItem) =>
                          productItem.itemId === product.item_list_id
                      )
                    ) {
                      setTotalOrderAmount([
                        ...totalOrderAmount,
                        {
                          itemId: product.item_list_id,
                          total: newProductAdded.data.total,
                        },
                      ]);
                    } else {
                      const item = totalOrderAmount.find(
                        (item) => item.itemId === product.item_list_id
                      );
                      totalOrderAmount[totalOrderAmount.indexOf(item)] = {
                        itemId: item.itemId,
                        total: newProductAdded.data.total,
                      };
                      // Usado para atualizar o componente
                      setTotalOrderAmount([...totalOrderAmount]);
                    }
                  } catch (err) {
                    notification.errorProductCouldNotBeEdited();
                  }
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
                  await axios.delete(
                    `${BASE_URL}/items-list/${product.item_list_id}`
                  );

                  if (productsListId.includes(product.item_list_id)) {
                    const newListOrderProducts = listOfOrdersProducts.filter(
                      (productOrder) => {
                        return (
                          productOrder.item_list_id !== product.item_list_id
                        );
                      }
                    );
                    setListOfOrdersProducts(newListOrderProducts);

                    const newProductsListId = productsListId.filter((id) => {
                      return id !== product.item_list_id;
                    });
                    setProductsListId(newProductsListId);

                    const newTotalOrderAmount = totalOrderAmount.filter(
                      (item) => {
                        return item.itemId !== product.item_list_id;
                      }
                    );
                    setTotalOrderAmount(newTotalOrderAmount);
                  }
                  notification.successProductDeleted();
                } catch (err) {
                  notification.errorProductCouldNotBeDeleted();
                }
              }}
            >
              <Icon>
                <FontAwesomeIcon icon="fa-solid fa-x" />
              </Icon>
            </DeleteButton>
          </ButtonsContainer>
        </CardInputs>
      );
    });

  const onClickAddNewOrder = async () => {
    if (clientName === "") {
      notification.warnClientIsRequired();
      return;
    }

    if (deliveryDate === "") {
      notification.warnDeliveryDateIsRequired();
      return;
    }

    if (productsListId.length < 1) {
      notification.warnProductIsRequired();
      return;
    }

    const BODY = {
      delivery_date: new Date(deliveryDate).toISOString(),
      client_name: clientName,
      items_list_id: productsListId,
    };

    try {
      const newOrder = await axios.post(`${BASE_URL}/orders`, BODY);

      for (let i = 0; i < productsListId.length; i++) {
        const item = await axios.get(
          `${BASE_URL}/items-list/${productsListId[i]}`
        );
        await axios.patch(`${BASE_URL}/products/${item.data.product_id}`, {
          quantity: item.data.quantity,
        });
      }

      setClientName("");
      setDeliveryDate("");
      setProductId(" ");
      setQuantity(0);
      setListOfOrdersProducts(null);
      setTotalOrderAmount([]);

      notification.successOrderAdded();

      return newOrder;
    } catch (error) {
      notification.errorOrderCouldNotBeAdded();
    }
  };

  return (
    <ContainerPage>
      <Header />
      <ContainerContent>
        <CardTitle title="Cadastrar Novo Pedido" hasButton={false} />
        <ContainerCardForm>
          <CardForm>
            <CustomForm>
              <LabelForm>Cliente </LabelForm>
              <Input
                name="client_name"
                type="text"
                value={clientName}
                onChange={onChangeClientName}
              />
              <LabelForm>Data de Entrega </LabelForm>
              <Input
                name="delivery_date"
                type="date"
                value={deliveryDate}
                onChange={onChangeDeliveryDate}
              />
              <LabelForm>Adicionar Produtos </LabelForm>
              <ToastContainer
                position="top-right"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
              <ContainerFormProducts onSubmit={onSubmitAddProductToList}>
                <SelectFormProducts
                  name="product_id"
                  value={productId}
                  onChange={onChangeProductId}
                >
                  <option label=" -- Selecione uma opção -- "></option>
                  {listaProdutos}
                </SelectFormProducts>
                <InputFormProducts
                  name="quantity"
                  type="number"
                  placeholder="Quantidade"
                  value={quantity}
                  onChange={onChangeQuantity}
                />
                <AddButton title="Adicionar produto ao pedido">
                  <Icon>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                  </Icon>
                </AddButton>
              </ContainerFormProducts>
              <LabelForm>Produtos Adicionados </LabelForm>
              <ContainerAddedProducts>
                {listOfProductsAddedToOrder &&
                listOfProductsAddedToOrder.length > 0 ? (
                  listOfProductsAddedToOrder
                ) : (
                  <ContainerEmptyMessage>
                    <h3>Não há produtos adicionados</h3>
                  </ContainerEmptyMessage>
                )}
              </ContainerAddedProducts>
              <LabelForm>ValorTotal </LabelForm>
              <TotalTag>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(
                  totalOrderAmount.reduce((acc, item) => acc + item.total, 0)
                )}
              </TotalTag>
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
