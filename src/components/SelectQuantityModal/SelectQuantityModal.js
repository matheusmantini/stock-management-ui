import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "react-pure-modal/dist/react-pure-modal.min.css";

const SelectQuantityModal = (props) => {
  const [modal, setModal] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  }
  setModal(props.open);
  return (
    <PureModal
      header="Your header"
      footer={
        <div>
          <button>Cancel</button>
          <button>Save</button>
        </div>
      }
      isOpen={modal}
      closeButton="close"
      closeButtonPosition="bottom"
      onClose={() => {
        setModal(false);
        return true;
      }}
    >
      <label>Quantidade</label>
      <input type="number" value={quantity} onChange={onChangeQuantity}/>
    </PureModal>
  );
};

export default SelectQuantityModal;
