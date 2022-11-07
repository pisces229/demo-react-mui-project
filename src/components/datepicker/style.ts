import styled from "styled-components";

export const YearMonthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const YearMonthSelect = styled.select`
  font-size: 1.125rem;
  line-height: 1.5rem;
  border-radius: 0.2rem;
`;

export const YearMonthChange = styled.div`
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 1.4rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.4;
  outline: none;
  &:hover, &:focus {
    opacity: 1.0;
  }
`;

export const WeekWrapper = styled.div`
  display: flex;
`;

export const WeekItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

export const DateWrapper = styled.div`
  display: flex;
`;

export const DateDefaultItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  cursor: pointer;
  &:hover {
    border-radius: 50%;
    background-color: LightGray;
  }
`;

export const DateCurrentItem = styled(DateDefaultItem)`
  border-radius: 50%;
  background-color: LightGray;
`;

export const DateOtherItem = styled(DateDefaultItem)`
  opacity: 0.4;
`;

export const DateSpaceItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;
