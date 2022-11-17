import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useState } from 'react';
import { MeLayoutToolbar } from './style';
import { ErrorBoundaryComponent } from '../../components/error-boundary';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../routes/path';
import { ROUTE_APP01 } from '../../routes/app01/path';
import { ROUTE_APP02 } from '../../routes/app02/path';
import { MenuItemModel } from './model';
import { flushSync } from 'react-dom';

const DefaultMenuItems: MenuItemModel[] = [
  // first
  {
    Id: '1',
    ParentId: '',
    Text: 'APP01',
    Path: ROUTE_APP01.P01,
  },
  {
    Id: '#',
    ParentId: '',
    Text: 'APP01P01',
    Path: ROUTE_APP01.P01,
  },
  {
    Id: '#',
    ParentId: '',
    Text: 'APP01P02',
    Path: ROUTE_APP01.P02,
  },
  {
    Id: '2',
    ParentId: '',
    Text: 'APP02',
    Path: '',
  },
  // second
  {
    Id: '20',
    ParentId: '2',
    Text: 'APP02',
    Path: '',
  },
  {
    Id: '21',
    ParentId: '2',
    Text: 'APP02P01',
    Path: ROUTE_APP02.P01,
  },
  {
    Id: '22',
    ParentId: '2',
    Text: 'APP02P02',
    Path: ROUTE_APP02.P02,
  },
  {
    Id: '23',
    ParentId: '2',
    Text: 'APP02P03',
    Path: ROUTE_APP02.P03,
  },
  {
    Id: '24',
    ParentId: '2',
    Text: 'APP02P04',
    Path: ROUTE_APP02.P04,
  },
  // second
  {
    Id: '201',
    ParentId: '20',
    Text: 'APP02P01',
    Path: ROUTE_APP02.P01,
  },
  {
    Id: '202',
    ParentId: '20',
    Text: 'APP02P02',
    Path: ROUTE_APP02.P02,
  },
  {
    Id: '203',
    ParentId: '20',
    Text: 'APP02P03',
    Path: ROUTE_APP02.P03,
  },
  {
    Id: '204',
    ParentId: '20',
    Text: 'APP02P04',
    Path: ROUTE_APP02.P04,
  },
];

export function LayoutPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<MenuItemModel[]>(DefaultMenuItems.filter((p) => p.ParentId === ''));
  const [currentMenuItem, setCurrentMenuItem] = useState<MenuItemModel>();
  const onClickMenuBack = () => {
    if (currentMenuItem && currentMenuItem.ParentId) {
      let item = DefaultMenuItems.find((p) => p.Id === currentMenuItem.ParentId);
      if (item) {
        console.log({ ...item });
        console.log([ ...DefaultMenuItems.filter((p) => p.ParentId === item?.Id) ]);
        setCurrentMenuItem({ ...item });
        setMenuItems([ ...DefaultMenuItems.filter((p) => p.ParentId === item?.Id) ]);
      } else {
        setCurrentMenuItem(undefined);
        setMenuItems([ ...DefaultMenuItems.filter((p) => p.ParentId === '') ]);
      }
    } else {
      setCurrentMenuItem(undefined);
      setMenuItems([ ...DefaultMenuItems.filter((p) => p.ParentId === '') ]);
    }
  };
  const onClickMenuClick = (item: MenuItemModel) => {
    if (item.Path) {
      console.log(item);
      navigate(item.Path);
      setState(false);
    } else {
      flushSync(() => {
        setMenuItems([]);
      });
      console.log({ ...item });
      console.log([ ...DefaultMenuItems.filter((p) => p.ParentId === item.Id) ]);
      setCurrentMenuItem({ ...item });
      setMenuItems([ ...DefaultMenuItems.filter((p) => p.ParentId === item.Id) ]);
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
          sx={{ minWidth: 250 }}
          role="presentation"
          // onClick={() => setState(false)}
          // onKeyDown={() => setState(false)}
        >
          <List>
            <ListItem disablePadding>
              <HomeOutlinedIcon></HomeOutlinedIcon>
              <ListItemButton onClick={() => {
                  navigate(ROUTE_HOME);
                  setState(false);
                }}>
                <ListItemText primary={'Home'} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider/>
          {currentMenuItem && <>
            <List>
              <ListItem disablePadding>
                <ArrowBackOutlinedIcon></ArrowBackOutlinedIcon>
                <ListItemButton onClick={() => onClickMenuBack()}>
                  <ListItemText primary={'Back'} />
                </ListItemButton>
              </ListItem>
            </List>
            <Divider/>
          </>}
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                {!item.Path && <FolderOutlinedIcon></FolderOutlinedIcon>}
                {item.Path && <DescriptionOutlinedIcon></DescriptionOutlinedIcon>}
                <ListItemButton divider={false} onClick={() => onClickMenuClick(item)}>
                  <ListItemText primary={item.Text} />
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
