import {
  Button,
  Grid,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { CommonPageModel } from '../../common/common-model';
import { CommonState } from '../../common/common-state';
import {
  commonProgressOpen,
  commonProgressClose,
} from '../../stores/common-progress.store';
import { RouteApp02 } from '../../routes/app02.route';
import {
  App02P02EntryAction,
  App02P02EntryActionModifyState,
} from './app02-p02.page';
import {
  App03D01InputModel,
  App03D01OutputModel,
  App03D01Page,
} from './../app03/app03-d01.page';
import { CommonClickAwayComponent } from '../../components/common-click-away.component';

// Action
enum EntryAction {
  Empty,
  Query,
}
enum GridReducerAction {
  Create,
  Modify,
  Remove,
}
// Model
interface FormModel {
  TextFieldValue: string;
}
interface GridModel {
  SwitchValue: boolean;
  TextFieldValue: string;
}
// State
const entryActionQueryState = new CommonState<FormModel>();
// Initial
const formInitial: FormModel = {
  TextFieldValue: '',
};
const pageInitial: CommonPageModel = {
  PageNo: 3,
  PageSize: 10,
  TotalCount: 20,
};
// Reducer
const formReducer = (state: FormModel, payload: {}) => {
  return {
    ...state,
    ...payload,
  };
};
const pageReducer = (state: CommonPageModel, payload: {}) => {
  return {
    ...state,
    ...payload,
  };
};
const gridReducer = (
  state: GridModel[],
  payload: { action: GridReducerAction; index?: number; item?: GridModel },
) => {
  switch (payload.action) {
    case GridReducerAction.Create: {
      return [...state, payload.item!];
    }
    case GridReducerAction.Modify: {
      state[payload.index!] = { ...payload.item! };
      return [...state];
    }
    case GridReducerAction.Remove: {
      return [...state.filter((p) => !p.SwitchValue)];
    }
    default: {
      return [...state];
    }
  }
};
// Page
const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [app03d01Input, setApp03d01Input] = useState<App03D01InputModel>({
    display: false,
    value: '',
  });
  const [formState, formDispatch] = useReducer(formReducer, formInitial);
  const [pageState, pageDispatch] = useReducer(pageReducer, pageInitial);
  const [gridState, gridDispatch] = useReducer(gridReducer, []);
  useEffect(() => {
    console.log('mounted');
    console.log('location.state', location.state);
    switch (location.state as number) {
      case EntryAction.Query: {
        console.log('EntryAction.Query');
        console.log(entryActionQueryState.get());
        if (entryActionQueryState.get()) {
          formDispatch({ ...entryActionQueryState.get() });
        }
        break;
      }
      default: {
        // do something
        break;
      }
    }
    return () => {
      console.log('unmounted');
    };
  }, [location.state]);
  const onClickToPage = async () => {
    entryActionQueryState.set({ ...formState });
    App02P02EntryActionModifyState.set({});
    navigate(RouteApp02.P02, { state: App02P02EntryAction.Create });
  };
  const onClickShowForm = async () => {
    dispatch(commonProgressOpen());
    console.log(formState);
    setTimeout(() => {
      dispatch(commonProgressClose());
    }, 3000);
  };
  const onClickClearForm = async () => {
    formDispatch({ ...formInitial });
  };
  const onClickShowGrid = async () => {
    console.log(gridState);
  };
  const onClickCreateGrid = async () => {
    let item: GridModel = {
      SwitchValue: false,
      TextFieldValue: (gridState.length + 1).toString(),
    };
    gridDispatch({ action: GridReducerAction.Create, item });
  };
  const onClickRemoveGrid = async () => {
    gridDispatch({ action: GridReducerAction.Remove });
  };
  const onClickDetail = (index: number) => async () => {
    entryActionQueryState.set({ ...formState });
    App02P02EntryActionModifyState.set({
      TextFieldValue: gridState[index].TextFieldValue,
    });
    navigate(RouteApp02.P02, { state: App02P02EntryAction.Modify });
  };
  const onClickModifyGrid = (index: number, item: GridModel) => {
    gridDispatch({ action: GridReducerAction.Modify, index, item });
  };
  const onChangePage = async (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    pageDispatch({ PageNo: page });
  };
  const onInputApp03D01 = async () => {
    setApp03d01Input((state) => ({ display: true, value: 'Input' }));
  };
  const onOutputApp03D01 = async (value: App03D01OutputModel) => {
    console.log(value);
    setApp03d01Input((state) => ({ display: false }));
  };
  return (
    <>
      <h2>App02P01Page.</h2>
      <App03D01Page input={app03d01Input} output={onOutputApp03D01} />
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={onClickToPage}>
            Page
          </Button>
          <Button variant="contained" onClick={onClickShowForm}>
            Show Form
          </Button>
          <Button variant="contained" onClick={onClickClearForm}>
            Clear Form
          </Button>
          <Button variant="contained" onClick={onInputApp03D01}>
            Open
          </Button>
        </Grid>
      </Grid>
      {/* <TableContainer> */}
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">TextFieldValue</TableCell>
              <TableCell>
                <TextField
                  value={formState.TextFieldValue}
                  onChange={async (event) =>
                    formDispatch({ TextFieldValue: event.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">CommonClickAwayComponent</TableCell>
              <TableCell>
                <CommonClickAwayComponent></CommonClickAwayComponent>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      {/* </TableContainer> */}
      <Grid container direction="row" justifyContent="left" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={onClickShowGrid}>
            Show Grid
          </Button>
          <Button variant="contained" onClick={onClickCreateGrid}>
            Create Grid
          </Button>
          <Button variant="contained" onClick={onClickRemoveGrid}>
            Remove Grid
          </Button>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>SwitchValue</TableCell>
              <TableCell>TextFieldValue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gridState.map((gridItem, gridIndex) => (
              <TableRow key={gridIndex}>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={onClickDetail(gridIndex)}
                  >
                    {gridIndex}
                  </Button>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={gridItem.SwitchValue}
                    onChange={async (event) =>
                      onClickModifyGrid(gridIndex, {
                        ...gridItem,
                        SwitchValue: event.target.checked,
                      })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={gridItem.TextFieldValue}
                    onChange={async (event) =>
                      onClickModifyGrid(gridIndex, {
                        ...gridItem,
                        TextFieldValue: event.target.value,
                      })
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Pagination
            siblingCount={2}
            count={pageState.TotalCount}
            page={pageState.PageNo}
            onChange={onChangePage}
          />
        </Grid>
      </Grid>
    </>
  );
};
// export App02P01
export { EntryAction as App02P01EntryAction, Page as App02P01Page };
