import { styled, Toolbar } from '@mui/material';


// const LayoutToolbarTheme = createTheme({
//   components: {
//     MuiToolbar: {
//       defaultProps: {
//         // disabled: true,
//       },
//       styleOverrides: {
//         root: {
//           padding: '0px',
//         },
//       },
//       variants: [],
//     },
//   },
// });
// styled
export const MeLayoutToolbar = styled(Toolbar)({
  '&.MuiToolbar-root': {
    padding: '0px',
  },
});
