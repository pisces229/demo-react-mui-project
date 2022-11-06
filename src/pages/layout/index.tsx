import { Button, createTheme, styled } from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../routes/path';
import { ROUTE_APP01 } from '../../routes/app01/path';
import { ROUTE_APP02 } from '../../routes/app02/path';

const items = [
  { text: 'APP01', path: ROUTE_APP01.P01 },
  { text: 'APP02P01', path: ROUTE_APP02.P01 },
  { text: 'APP02P02', path: ROUTE_APP02.P02 },
  { text: 'APP02P03', path: ROUTE_APP02.P03 },
];

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
const LayoutToolbar = styled(Toolbar)({
  '&.MuiToolbar-root': {
    padding: '0px',
  },
});

export function LayoutPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(false);
  return (
    <>
      <h2>Default Layout</h2>
      <LayoutToolbar>
        <IconButton onClick={() => setState(true)}>
          <MenuIcon />
        </IconButton>
        <Button variant="contained" onClick={() => navigate(ROUTE_LOGIN)}>
          Quit
        </Button>
      </LayoutToolbar>
      <Drawer anchor={'left'} open={state} onClose={() => setState(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setState(false)}
          onKeyDown={() => setState(false)}
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate(ROUTE_HOME)}>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider/>
          <List>
            {items.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Outlet/>
    </>
  );
}
