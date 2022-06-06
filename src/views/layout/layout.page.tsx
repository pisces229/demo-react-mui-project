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
import { RouteLogin } from '../../routes/login.route';
import { RouteHome } from '../../routes/home.route';
import { RouteApp01 } from '../../routes/app01.route';
import { RouteApp02 } from '../../routes/app02.route';
import { useState } from 'react';

const items = [
  // { text: 'Home', path: RouteHome },
  { text: 'App01P01', path: RouteApp01.P01 },
  { text: 'App01P02', path: RouteApp01.P02 },
  { text: 'App01NoMatch', path: RouteApp01.NoMatch },
  { text: 'App02P01', path: RouteApp02.P01 },
  { text: 'App02P02', path: RouteApp02.P02 },
  { text: 'App02NoMatch', path: RouteApp02.NoMatch },
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
        <Button variant="contained" onClick={() => navigate(RouteLogin)}>
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
              <ListItemButton onClick={() => navigate(RouteHome)}>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
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
      <Outlet />
    </>
  );
}
