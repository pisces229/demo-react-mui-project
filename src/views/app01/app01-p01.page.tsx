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
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CommonState } from '../../common/common-state';
import { ROUTE_APP01 } from '../../routes/app01.route';
import { DefaultService } from '../../services/default.service';
import {
  App01P02EntryAction,
  App01P02EntryActionModifyState,
} from './app01-p02.page';

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
// Page
const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormModel>(formInitial);
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
    navigate(ROUTE_APP01.P02, { state: App01P02EntryAction.Modify });
  };
  const onClickShowForm = async () => {
    console.log(formState);
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
  const onClickModifyGrid = (index: number, item: {}) => {
    gridState[index] = { ...gridState[index], ...item };
    setGridState([...gridState]);
  };
  return (
    <>
      <h3>App01P01Page.</h3>
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
    </>
  );
};
// export App01P01
export { EntryAction as App01P01EntryAction, Page as App01P01Page };
