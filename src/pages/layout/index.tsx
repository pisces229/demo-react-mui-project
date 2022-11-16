import { Button } from '@mui/material';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { MeLayoutToolbar } from './style';
import { ErrorBoundaryComponent } from '../../components/error-boundary';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../routes/path';
import { ROUTE_APP01 } from '../../routes/app01/path';
import { ROUTE_APP02 } from '../../routes/app02/path';

interface Item {
  root: boolean;
  text: string;
  children?: Item[];
  path: string;
};

const itemChildren: Item[] = [
  {
    root: false,
    text: 'APP02P01',
    path: ROUTE_APP02.P01,
  },
  {
    root: false,
    text: 'APP02P02',
    path: ROUTE_APP02.P01,
  },
  {
    root: false,
    text: 'APP02P03',
    path: ROUTE_APP02.P01,
  },
];

const itemRoot: Item[] = [
  {
    root: true,
    text: 'APP01',
    path: ROUTE_APP01.P01,
  },
  {
    root: true,
    text: 'APP02P',
    path: '',
    children: itemChildren,

  },
  {
    root: true,
    text: 'APP02P01',
    path: ROUTE_APP02.P01,
  },
  {
    root: true,
    text: 'APP02P02',
    children: itemChildren,
    path: ROUTE_APP02.P02,
  },
  {
    root: true,
    text: 'APP02P03',
    path: ROUTE_APP02.P03,
  },
];

export function LayoutPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(false);
  const [datas, setDatas] = useState<Item[]>(itemRoot);
  const [display, setDisplay] = useState<boolean>(false);
  const onClickRoot = () => {
    setDatas(itemRoot);
    setDisplay(false);
  };
  const onClickRoute = (value: string) => {
    navigate(value);
    setState(false);
  };
  const onClickSwitch = (item: Item) => {
    if (item.children) {
      setDatas(item.children!);
      setDisplay(true);
    } else {
      navigate(item.path);
      setState(false);
    }
  };
  return (
    <>
      <h2>Default Layout</h2>
      <MeLayoutToolbar>
        <IconButton onClick={() => setState(true)}>
          <MenuIcon />
        </IconButton>
        <Button variant="contained" onClick={() => navigate(ROUTE_LOGIN)}>
          Quit
        </Button>
      </MeLayoutToolbar>
      <Drawer anchor={'left'} open={state} onClose={() => setState(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          // onClick={() => setState(false)}
          // onKeyDown={() => setState(false)}
        >
          <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => onClickRoute(ROUTE_HOME)}>
                  <ListItemText primary={'Home'} />
                </ListItemButton>
              </ListItem>
            </List>
          <Divider/>
          {display && <>
            <List>
              <ListItem disablePadding>
                <ListItemButton onClick={() => onClickRoot()}>
                  <ListItemText primary={'Root'} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider/>
          </>}
          <List>
            {datas.map((data, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onClickSwitch(data)}>
                  <ListItemText primary={data.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <ErrorBoundaryComponent>
        <Outlet/>
      </ErrorBoundaryComponent>
    </>
  );
}
