import styled from "styled-components";

export const FilterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  gap: 40px;
`;

export const SearchInput = styled.input`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  background-color: var(--color-light-grey);
  font-size: 16px;
`;

export const CustomSelect = styled.select`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  background-color: var(--color-light-grey);
  font-size: 16px;
`;