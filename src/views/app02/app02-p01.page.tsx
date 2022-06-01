import {
  Button,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CommonState } from '../../common/common-state';
import { ROUTE_APP02 } from '../../routes/app02.route';
import { DefaultService } from '../../services/default.service';
import {
  App02P02EntryAction,
  App02P02EntryActionModifyState,
} from './app02-p02.page';

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
// Reducer
const formReducer = (state: FormModel, payload: {}) => {
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
  const [formState, formDispatch] = useReducer(formReducer, formInitial);
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
    navigate(ROUTE_APP02.P02, { state: App02P02EntryAction.Modify });
  };
  const onClickShowForm = async () => {
    console.log(formState);
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
  const onClickModifyGrid = (index: number, item: GridModel) => {
    gridDispatch({ action: GridReducerAction.Modify, index, item });
  };
  return (
    <>
      <h3>App02P01Page.</h3>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickToPage}>
                  Page
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickShowForm}>
                  Show Form
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickClearForm}>
                  Clear Form
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>TextFieldValue</TableCell>
              <TableCell>
                <TextField
                  value={formState.TextFieldValue}
                  onChange={async (event) =>
                    formDispatch({ TextFieldValue: event.target.value })
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickShowGrid}>
                  Show Grid
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickCreateGrid}>
                  Create Grid
                </Button>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={onClickRemoveGrid}>
                  Remove Grid
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
                <TableCell>{gridIndex}</TableCell>
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
    </>
  );
};
// export App02P01
export { EntryAction as App02P01EntryAction, Page as App02P01Page };
