import {
  Alert,
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
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { CommonPageModel } from '../../common/common-model';
import { CommonState } from '../../common/common-state';
import {
  commonProgressOpen,
  commonProgressClose,
} from '../../stores/common-progress.store';
import { RouteApp01 } from '../../routes/app01.route';
import {
  App01P02EntryAction,
  App01P02EntryActionModifyState,
} from './app01-p02.page';
import {
  App03D01InputModel,
  App03D01OutputModel,
  App03D01Page,
} from './../app03/app03-d01.page';

// Action
enum EntryAction {
  Empty,
  Query,
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
// Page
const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [app03d01Input, setApp03d01Input] = useState<App03D01InputModel>({
    display: false,
    value: '',
  });
  const [formState, setFormState] = useState<FormModel>(formInitial);
  const [pageState, setPageState] = useState<CommonPageModel>(pageInitial);
  const [gridState, setGridState] = useState<GridModel[]>([]);
  useEffect(() => {
    console.log('mounted');
    console.log('location.state', location.state);
    switch (location.state as number) {
      case EntryAction.Query: {
        console.log('EntryAction.Query');
        console.log(entryActionQueryState.get());
        if (entryActionQueryState.get()) {
          setFormState((state) => ({
            ...state,
            ...entryActionQueryState.get(),
          }));
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
    App01P02EntryActionModifyState.set({});
    navigate(RouteApp01.P02, { state: App01P02EntryAction.Create });
  };
  const onClickShowForm = async () => {
    dispatch(commonProgressOpen());
    console.log(formState);
    setTimeout(() => {
      dispatch(commonProgressClose());
    }, 3000);
  };
  const onClickClearForm = async () => {
    setFormState({ ...formInitial });
  };
  const onClickShowGrid = async () => {
    console.log(gridState);
  };
  const onClickCreateGrid = async () => {
    let item: GridModel = {
      SwitchValue: false,
      TextFieldValue: (gridState.length + 1).toString(),
    };
    setGridState([...gridState, item]);
  };
  const onClickRemoveGrid = async () => {
    setGridState([...gridState.filter((p) => !p.SwitchValue)]);
  };
  const onClickDetail = (index: number) => async () => {
    entryActionQueryState.set({ ...formState });
    App01P02EntryActionModifyState.set({
      TextFieldValue: gridState[index].TextFieldValue,
    });
    navigate(RouteApp01.P02, { state: App01P02EntryAction.Modify });
  };
  const onClickModifyGrid = (index: number, item: {}) => {
    gridState[index] = { ...gridState[index], ...item };
    setGridState([...gridState]);
  };
  const onChangePage = async (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setPageState((state) => ({ ...state, PageNo: page }));
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
      <h2>App01P01Page.</h2>
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
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right">TextFieldValue</TableCell>
              <TableCell>
                <TextField
                  value={formState.TextFieldValue}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      TextFieldValue: event.target.value,
                    }))
                  }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
// export App01P01
export { EntryAction as App01P01EntryAction, Page as App01P01Page };
