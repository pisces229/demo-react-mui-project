import { styled } from '@mui/material';

export const ScopeWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  padding: '0.5rem',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
});
export const ScopeItemWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});
export const ScopeItemName = styled('div')({
  width: '75%',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: '400',
  fontSize: '0.875rem',
  wordBreak: 'break-all',
  padding: '0.5rem',
  margin: 'auto',
});
export const ScopeItemSize = styled('div')({
  width: '25%',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontweight: '400',
  fontSize: '0.875rem',
  padding: '0.5rem',
  margin: 'auto',
  textAlign: 'center',
});
