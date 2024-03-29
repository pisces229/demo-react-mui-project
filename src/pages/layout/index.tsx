import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useState } from 'react';
import {
  ScopeContainer,
  ScopeTopButtonWrapper,
  ScopeTopButton,
  ScopeBarIconButton,
  ScopeBarMenuIcon,
} from './style';
import { ErrorBoundaryComponent } from '../../components/error-boundary';
import { ROUTE } from '../../routes/route';
import { ROUTE_APP01 } from '../../routes/app01/route';
import { ROUTE_APP02 } from '../../routes/app02/route';
import { LayoutMenuItemOutputState } from './state';
import { flushSync } from 'react-dom';

const DefaultMenuItems: LayoutMenuItemOutputState[] = [
  // first
  {
    id: '1',
    parentId: '',
    text: 'APP01',
    path: ROUTE_APP01.P01,
  },
  {
    id: '#',
    parentId: '',
    text: 'APP01P01',
    path: ROUTE_APP01.P01,
  },
  {
    id: '#',
    parentId: '',
    text: 'APP01P02',
    path: ROUTE_APP01.P02,
  },
  {
    id: '2',
    parentId: '',
    text: 'APP02',
    path: '',
  },
  // second
  {
    id: '20',
    parentId: '2',
    text: 'APP02',
    path: '',
  },
  {
    id: '21',
    parentId: '2',
    text: 'APP02P01',
    path: ROUTE_APP02.P01,
  },
  {
    id: '22',
    parentId: '2',
    text: 'APP02P02',
    path: ROUTE_APP02.P02,
  },
  {
    id: '23',
    parentId: '2',
    text: 'APP02P03',
    path: ROUTE_APP02.P03,
  },
  {
    id: '24',
    parentId: '2',
    text: 'APP02P04',
    path: ROUTE_APP02.P04,
  },
  // third
  {
    id: '201',
    parentId: '20',
    text: 'APP02P01',
    path: ROUTE_APP02.P01,
  },
  {
    id: '202',
    parentId: '20',
    text: 'APP02P02',
    path: ROUTE_APP02.P02,
  },
  {
    id: '203',
    parentId: '20',
    text: 'APP02P03',
    path: ROUTE_APP02.P03,
  },
  {
    id: '204',
    parentId: '20',
    text: 'APP02P04',
    path: ROUTE_APP02.P04,
  },
];

export const LayoutPage = () =>  {
  const navigate = useNavigate();
  const [state, setState] = useState<boolean>(false);
  const [menuItems, setMenuItems] = useState<LayoutMenuItemOutputState[]>(DefaultMenuItems.filter((p) => p.parentId === ''));
  const [currentMenuItem, setCurrentMenuItem] = useState<LayoutMenuItemOutputState>();
  const onClickMenuBack = () => {
    if (currentMenuItem && currentMenuItem.parentId) {
      let item = DefaultMenuItems.find((p) => p.id === currentMenuItem.parentId);
      if (item) {
        // console.log({ ...item });
        // console.log([ ...DefaultMenuItems.filter((p) => p.parentId === item?.id) ]);
        setCurrentMenuItem({ ...item });
        setMenuItems([ ...DefaultMenuItems.filter((p) => p.parentId === item?.id) ]);
      } else {
        setCurrentMenuItem(undefined);
        setMenuItems([ ...DefaultMenuItems.filter((p) => p.parentId === '') ]);
      }
    } else {
      setCurrentMenuItem(undefined);
      setMenuItems([ ...DefaultMenuItems.filter((p) => p.parentId === '') ]);
    }
  };
  const onClickMenuClick = (item: LayoutMenuItemOutputState) => {
    if (item.path) {
      // console.log(item);
      navigate(item.path);
      setState(false);
    } else {
      flushSync(() => {
        setMenuItems([]);
      });
      // console.log({ ...item });
      // console.log([ ...DefaultMenuItems.filter((p) => p.parentId === item.id) ]);
      setCurrentMenuItem({ ...item });
      setMenuItems([ ...DefaultMenuItems.filter((p) => p.parentId === item.id) ]);
    }
  };
  return (
    <>
      <ScopeContainer>
        <Stack>
          <Stack
            sx={{ backgroundColor: "#79858B", padding: '0.5rem' }}
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
          >
            <ScopeBarIconButton onClick={() => setState(true)}>
              <ScopeBarMenuIcon></ScopeBarMenuIcon>
            </ScopeBarIconButton>
            <ScopeTopButtonWrapper>
              <ScopeTopButton onClick={() => navigate(ROUTE.LOGIN)}>Sign Out</ScopeTopButton>
            </ScopeTopButtonWrapper>
          </Stack>
          {/* <label style={{ wordBreak: 'break-all' }}>{authStore.token}</label> */}
          <Stack
            sx={{ padding: '1rem 2rem 1rem 2rem' }}
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <ErrorBoundaryComponent>
              <Outlet/>
            </ErrorBoundaryComponent>
          </Stack>
        </Stack>
      </ScopeContainer>

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
                  navigate(ROUTE.HOME);
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
                {!item.path && <FolderOutlinedIcon></FolderOutlinedIcon>}
                {item.path && <DescriptionOutlinedIcon></DescriptionOutlinedIcon>}
                <ListItemButton divider={false} onClick={() => onClickMenuClick(item)}>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
