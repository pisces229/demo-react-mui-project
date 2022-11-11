import { styled } from '@mui/material';

export const CalendarWrapper = styled('div')({
  margin: 'auto',
  width: '12.75rem',
});

export const CalendarTop = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});
export const YearMonthSelect = styled('select')({
  fontSize: '0.875rem',
  borderRadius: '0.2rem',
  cursor: 'pointer',
});
export const YearMonthChange = styled('div')({
  fontSize: '0.875rem',
  textAlign: 'center',
  cursor: 'pointer',
  opacity: '0.4',
  outline: 'none',
  '&:hover, &:focus': {
    opacity: '1.0',
  },
});

export const PickerWrapper = styled('div')({
  margin: 'auto',
  height: '12.125rem',
});
export const WeekWrapper = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});
export const WeekItem = styled('div')({
  width: '1rem',
  height: '1.125rem',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.3rem',
  paddingRight: '0.3rem',
  cursor: 'default',
});

export const DateWrapper = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});

export const DateDefaultItem = styled('div')({
  width: '1rem',
  height: '1.125rem',
  fontSize: '0.875rem',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.3rem',
  paddingRight: '0.3rem',
  cursor: 'pointer',
  '&:hover': {
    borderRadius: '50%',
    backgroundColor: 'LightGray',
    opacity: '1',
  }
});
export const DateCurrentItem = styled(DateDefaultItem)(({ theme }) => ({
  borderRadius: '50%',
  color: 'White',
  backgroundColor: 'DodgerBlue',
  '&:hover': {
    backgroundColor: 'DodgerBlue',
  }
}));
export const DateOtherItem = styled(DateDefaultItem)(({ theme }) => ({
  opacity: '0.4',
}));
export const DateSpaceItem = styled('div')({
  width: '1rem',
  height: '1.125rem',
  fontSize: '0.875rem',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.3rem',
  paddingRight: '0.3rem',
});
