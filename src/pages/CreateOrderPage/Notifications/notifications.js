import { toast } from "react-toastify";

const toastSettings = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

/* WARN */

export const warnChooseAProduct = () => {
  toast.warn("Escolha um produto.", toastSettings);
};

export const warnQuantityMustBeHigherThanZero = () => {
  toast.warn("A quantidade precisa ser maior que 0.", toastSettings);
};

export const warnUnavailableStock = () => {
  toast.warn(`Este produto está com estoque indisponível.`, toastSettings);
};

export const warnUnavailableQuantity = (totalAvailable) => {
  toast.warn(
    `Quantidade indisponível. Escolha um valor menor ou igual a ${totalAvailable}`,
    toastSettings
  );
};

export const warnProductAlreadyAdded = () => {
  toast.warn(
    "O produto selecionado já foi adicionado ao pedido!",
    toastSettings
  );
};

export const warnClientIsRequired = () => {
  toast.warn("Informe o nome do cliente", toastSettings);
};

export const warnDeliveryDateIsRequired = () => {
  toast.warn("Informe a data de entrega", toastSettings);
};

export const warnProductIsRequired = () => {
  toast.warn("Selecione ao menos um produto.", toastSettings);
};

/* SUCCESS */

export const successProductAdded = () => {
  toast.success("Produto adicionado com sucesso!", toastSettings);
};

export const successProductEdited = () => {
  toast.success("Produto editado com sucesso!", toastSettings);
};

export const successProductDeleted = () => {
  toast.success("Produto deletado com sucesso!", toastSettings);
};

export const successOrderAdded = () => {
  toast.success("Pedido cadastrado com sucesso!", toastSettings);
};

/* ERROR */

export const errorProductCouldNotBeAdded = () => {
  toast.error(
    "Houve um erro e o produto não pôde ser cadastrado com sucesso",
    toastSettings
  );
};

export const errorProductCouldNotBeEdited = () => {
  toast.error("Houve um erro e o produto não pôde ser editado.", toastSettings);
};

export const errorProductCouldNotBeDeleted = () => {
  toast.error(
    "Houve um erro e o produto não pôde ser deletado.",
    toastSettings
  );
};

export const errorOrderCouldNotBeAdded = () => {
  toast.error(
    "Houve um erro e o pedido não pôde ser cadastrado com sucesso!",
    toastSettings
  );
};
