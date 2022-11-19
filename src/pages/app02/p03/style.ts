import { TextField } from '@mui/material';
import { createTheme, styled } from '@mui/material';

export const ScopeH2 = styled('h2')({
  color: 'Green',
});

export const scopeTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
      },
      variants: [],
    },
  }
});

export const ScopeTextField = styled(TextField)({
  '.MuiOutlinedInput-root': {
    '.MuiOutlinedInput-input': {
      background: 'green',
    },
  }
});
