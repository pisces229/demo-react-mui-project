import { styled } from '@mui/material';

export const MeIcon = styled('i')({
  position: 'relative',
  top: '2px',
  cursor: 'pointer',
});

export const YearMonthWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
});
export const YearMonthSelect = styled('select')({
  fontSize: '0.875rem',
  borderRadius: '0.2rem',
});
export const YearMonthChange = styled('div')({
  fontSize: '0.875rem',
  width: '1.4rem',
  textAlign: 'center',
  cursor: 'pointer',
  opacity: '0.4',
  outline: 'none',
  '&:hover, &:focus': {
    opacity: '1.0',
  },
});

export const WeekWrapper = styled('div')({
  display: 'flex',
});
export const WeekItem = styled('div')({
  width: '1.4rem',
  fontSize: '0.875rem',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
});

export const DateWrapper = styled('div')({
  display: 'flex',
});

export const DateDefaultItem = styled('div')({
  width: '1.4rem',
  fontSize: '0.875rem',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
  cursor: 'pointer',
  '&:hover': {
    borderRadius: '50%',
    backgroundColor: 'LightGray',
  }
});
export const DateCurrentItem = styled(DateDefaultItem)(({ theme }) => ({
  borderRadius: '50%',
  backgroundColor: 'LightGray',
}));
export const DateOtherItem = styled(DateDefaultItem)(({ theme }) => ({
  opacity: '0.4',
}));
export const DateSpaceItem = styled('div')({
  width: '1.4rem',
  fontSize: '0.875rem',
  textAlign: 'center',
  margin: '0.1rem',
  paddingTop: '0.2rem',
  paddingBottom: '0.2rem',
  paddingLeft: '0.2rem',
  paddingRight: '0.2rem',
});

