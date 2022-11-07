import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  padding: 0.5rem;
  border: 1px solid #dee2e6;
  border-radius: 6px;
`;
export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const ItemName = styled.div`
  width: 75%;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  word-break: break-all;
  padding: 0.5rem;
  margin:auto;
`;
export const ItemSize = styled.div`
  width: 25%;
  font-family: "Roboto","Helvetica","Arial",sans-serif;
  font-weight: 400;
  font-size: 0.875rem;
  padding: 0.5rem;
  margin:auto;
  text-align: center;
`;
