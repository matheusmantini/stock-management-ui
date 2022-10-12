import React from "react";
import { CustomSelect, FilterContent, SearchInput } from "./styled";

const Filters = (props) => {
  return (
    <FilterContent>
      <SearchInput
        type="text"
        placeholder="Pesquisar"
        value={props.query}
        onChange={props.updateQuery}
      />

      <CustomSelect
        name="sort"
        value={props.sortingParameter}
        onChange={props.updateSortingParameter}
      >
        <option value="name">Nome</option>
        <option value="price">Preço</option>
        <option value="stock">Estoque</option>
      </CustomSelect>

      <CustomSelect
         name="order"
         value={props.order}
         onChange={props.updateOrder}
      >
         <option value={1}>Crescente</option>
         <option value={-1}>Decrescente</option>

      </CustomSelect>
    </FilterContent>
  );
};

export default Filters;
