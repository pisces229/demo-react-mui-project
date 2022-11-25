import { Button, styled, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const ScopeContainer = styled('div')({
  minHeight: '100vh',
  margin: '0',
});
export const ScopeTopButtonWrapper = styled('div')({
  marginTop: 'auto',
  marginBottom: 'auto',
});
export const ScopeTopButton = styled(Button)({
  height: '36px',
  width: '100px',
  fontSize: '1.125rem',
  // fontWeight: 'bold',
  color: '#000000',
  backgroundColor: '#E1E1E1',
  borderRadius: '0.5rem',
  '&:hover': {
    background: '#79858B',
  },
});

export const ScopeBarIconButton = styled(IconButton)({
  '&:hover': {
    // backgroundColor: '#F5EA47',
  },
});
export const ScopeBarMenuIcon = styled(MenuIcon)({
  color: '#FFFFFF',
});
