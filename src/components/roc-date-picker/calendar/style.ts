import { styled } from '@mui/material';

export const ScopeCalendarWrapper = styled('div')({
  margin: 'auto',
  width: '12.75rem',
});

export const ScopeCalendarTop = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});
export const ScopeYearMonthSelect = styled('select')({
  fontSize: '0.875rem',
  borderRadius: '0.2rem',
  cursor: 'pointer',
});
export const ScopeYearMonthChange = styled('div')({
  fontSize: '0.875rem',
  textAlign: 'center',
  cursor: 'pointer',
  opacity: '0.4',
  outline: 'none',
  '&:hover, &:focus': {
    opacity: '1.0',
  },
});

export const ScopePickerWrapper = styled('div')({
  margin: 'auto',
  height: '12.125rem',
});
export const ScopeWeekWrapper = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});
export const ScopeWeekItem = styled('div')({
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

export const ScopeDateWrapper = styled('div')({
  margin: 'auto',
  display: 'flex',
  justifyContent: 'space-between',
});

export const ScopeDateDefaultItem = styled('div')({
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
export const ScopeDateCurrentItem = styled(ScopeDateDefaultItem)(({ theme }) => ({
  borderRadius: '50%',
  color: 'White',
  backgroundColor: 'DodgerBlue',
  '&:hover': {
    backgroundColor: 'DodgerBlue',
  }
}));
export const ScopeDateOtherItem = styled(ScopeDateDefaultItem)(({ theme }) => ({
  opacity: '0.4',
}));
export const ScopeDateSpaceItem = styled('div')({
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
