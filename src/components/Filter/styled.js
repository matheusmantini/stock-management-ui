import styled from "styled-components";

export const FilterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  gap: 20px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 20px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 20px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
  }
  @media screen and (max-width: 365px) {
    font-size: 14px;
  }
`;

export const SearchInput = styled.input`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  background-color: var(--color-light-grey);
  font-size: 16px;

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

export const CustomSelect = styled.select`
  border: 1px solid var(--color-dark-green);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  background-color: var(--color-light-grey);
  font-size: 16px;
  
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;