import { createTheme } from "@mui/material";

export default createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
          fontWeight: 'bold',
          color: '#6D6D6D',
          backgroundColor: '#E1E1E1',
          // border: '0.05rem solid #E1E1E1',
          textTransform: 'none',
          // boxShadow: 'none',
          '&:hover': {
            color: '#FFFFFF',
            backgroundColor: '#79858B',
          },
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiTextField: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
          backgroundColor: '#FFFFFF',
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiSelect: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
          backgroundColor: '#FFFFFF',
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiAutocomplete: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiSwitch: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiCheckbox: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiRadio: {
      defaultProps: {
        size: 'small',
        sx: {
          fontSize: '0.85rem',
        },
      },
      styleOverrides: {
      },
    },
    MuiTableBody: {
      defaultProps: {
        sx: {
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
    MuiTableCell: {
      defaultProps: {
        sx: {
          border: 0,
          padding: 1,
        },
      },
      styleOverrides: {
      },
      variants: [],
    },
  },
});
