import { Stack, styled } from '@mui/material';

export const indexStyle = {
  fontSize: '1rem',
};
// Page
export const CommonPageTitle = styled('div')({
  width: 'calc(100% + 0.4rem)',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#79858B',
  textAlign: 'left',
  borderBottom: '0.2rem solid #79858B',
  marginLeft: '-0.2rem',
  marginRight: '-0.2rem',
  position: 'relative',
  top: '0.5rem',
});
// Form
export const CommonFormContainer = styled(Stack)({
  width: '100%',
  border: '0.2rem solid #E9E9E9',
  backgroundColor: '#F1F1F1',
});
export const CommonFormHeader = styled(Stack)({
  margin: '0.25rem',
});
export const CommonFormHeaderText = styled('div')({
  fontSize: '1.125rem',
  fontWeight: 'bold',
  textAlign: 'left',
});
export const commonFormTextStyle = {
  padding: '0.25rem',
  border: 'none',
};
// Grid
export const CommonGridTopContainer = styled(Stack)({
  width: '100%',
});
export const CommonGridContainer = styled(Stack)({
  width: '100%',
  border: '0.2rem solid #E9E9E9',
  backgroundColor: '#FFFFFF',
});
export const commonGridContainerStyle = {
  border: '0.2rem solid #E9E9E9',
};
export const commonGridHeadCellStyle = {
  fontSize: '0.85rem',
  fontWeight: 'bold',
  padding: '0.25rem',
  border: '0.05rem solid #FFFFFF',
  backgroundColor: '#E9E9E9',
};
export const commonGridBodyStyle = {
  padding: '0.25rem',
  border: '0.05rem solid #FFFFFF',
  '&:nth-of-type(odd)': {
    backgroundColor: '#F5F5F5',
  },
  '&:nth-of-type(even)': {
    backgroundColor: '#E9E9E9',
  },
  '&:hover': {
    backgroundColor: '#F5F5D5',
  },
};
export const commonGridBodyCellStyle = {
  fontSize: '0.85rem',
  padding: '0.25rem',
  border: '0.05rem solid #FFFFFF',
};
export const CommonTextStyle = styled('label')({
  fontSize: '0.85rem',
});
export const CommonLinkStyle = styled('label')({
  fontSize: '0.85rem',
  color: '#FF0000',
  textDecoration: 'underline',
  cursor: 'pointer',
});

export const commonOpenPageStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  padding: 2,
  borderRadius: 1,
};
export const commonOpenPageContainerStyle = {
  padding: '0.5rem'
};
