import { styled } from '@mui/material';

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  background: '#ffffff',
  padding: '0.5rem',
  border: '1px solid #dee2e6',
  borderRadius: '6px',
});
export const ItemWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
});
export const ItemName = styled('div')({
  width: '75%',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: '400',
  fontSize: '0.875rem',
  wordBreak: 'break-all',
  padding: '0.5rem',
  margin: 'auto',
});
export const ItemSize = styled('div')({
  width: '25%',
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontweight: '400',
  fontSize: '0.875rem',
  padding: '0.5rem',
  margin: 'auto',
  textAlign: 'center',
});
