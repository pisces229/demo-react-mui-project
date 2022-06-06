import {
  Alert,
  Button,
  Checkbox,
  Grid,
  MenuItem,
  Radio,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { CommonState } from '../../common/common-state';
import { RouteApp02 } from '../../routes/app02.route';
import { DefaultService } from '../../services/default.service';
import { FileUtilListToArray } from '../../utils/file.util';
import { App02P01EntryAction } from './app02-p01.page';
import { CommonConfirmComponent } from '../../components/common-confirm.component';
import {
  commonProgressOpen,
  commonProgressClose,
} from '../../stores/common-progress.store';
import { commonMessageOpen } from '../../stores/common-message.store';

// Action
enum EntryAction {
  Empty,
  Create,
  Modify,
}
// Model
interface EntryActionModifyModel {
  TextFieldValue?: string;
}
interface FormModel {
  TextFieldValue: string;
  SelectSingleValue: string;
  SelectMultipleValue: string[];
  RadioValue: string;
  CheckboxValue: string;
  SwitchValue: boolean;
  TextareaValue: string;
}
// State
const entryActionModifyState = new CommonState<EntryActionModifyModel>();
// Initial
const formInitial: FormModel = {
  TextFieldValue: '',
  SelectSingleValue: '',
  SelectMultipleValue: [],
  RadioValue: '',
  CheckboxValue: '',
  SwitchValue: false,
  TextareaValue: '',
};
// Reducer
const formReducer = (state: FormModel, payload: {}) => {
  return {
    ...state,
    ...payload,
  };
};
// Page
const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [commonConfirmState, setCommonConfirmState] = useState({
    display: false,
    title: 'CommonConfirmTitle',
    message: 'CommonConfirmMessage',
  });
  const [alertState, setAlertState] = useState<{
    display: boolean;
    message: string;
  }>({
    display: true,
    message: 'Alert Message',
  });
  const [formState, formDispatch] = useReducer(formReducer, formInitial);
  useEffect(() => {
    console.log('mounted');
    console.log('location.state', location.state);
    switch (location.state as number) {
      case EntryAction.Create: {
        break;
      }
      case EntryAction.Modify: {
        console.log('EntryAction.Modify');
        console.log(entryActionModifyState.get());
        if (entryActionModifyState.get()) {
          formDispatch({ ...entryActionModifyState.get() });
        } else {
          navigate(RouteApp02.P01);
        }
        break;
      }
      default: {
        navigate(RouteApp02.P01);
        break;
      }
    }
    return () => {
      console.log('unmounted');
    };
  }, [location.state, navigate]);
  const onClickBack = async () => {
    navigate(RouteApp02.P01, { state: App02P01EntryAction.Query });
  };
  const onClickShowForm = async () => {
    dispatch(commonProgressOpen());
    setTimeout(() => {
      console.log(formState);
      dispatch(commonProgressClose());
      dispatch(commonMessageOpen('ShowForm'));
    }, 3000);
  };
  const onClickClearForm = async () => {
    formDispatch({ ...formInitial });
    setCommonConfirmState((state) => ({ ...state, display: true }));
  };
  const onCommonConfirmAgree = async () => {
    setCommonConfirmState((state) => ({ ...state, display: false }));
  };
  const onCommonConfirmDisagree = async () => {
    setCommonConfirmState((state) => ({ ...state, display: false }));
  };
  return (
    <>
      <h2>App02 P02 Page.</h2>
      <CommonConfirmComponent
        {...commonConfirmState}
        onAgree={onCommonConfirmAgree}
        onDisagree={onCommonConfirmDisagree}
      ></CommonConfirmComponent>
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={onClickBack}>
            Back
          </Button>
          <Button variant="contained" onClick={onClickShowForm}>
            Show Form
          </Button>
          <Button variant="contained" onClick={onClickClearForm}>
            Clear Form
          </Button>
        </Grid>
      </Grid>
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>
                {alertState.display && (
                  <Alert
                    severity="error"
                    onClose={() => {
                      setAlertState((state) => ({ ...state, display: false }));
                    }}
                  >
                    {alertState.message}
                  </Alert>
                )}
              </TableCell>
            </TableRow>
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
              <TableCell align="right">SelectSingleValue</TableCell>
              <TableCell>
                <Select
                  displayEmpty={true}
                  value={formState.SelectSingleValue}
                  onChange={async (event) =>
                    formDispatch({ SelectSingleValue: event.target.value })
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="1">A</MenuItem>
                  <MenuItem value="2">B</MenuItem>
                  <MenuItem value="3">C</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">SelectMultipleValue</TableCell>
              <TableCell>
                <Select
                  multiple
                  value={formState.SelectMultipleValue}
                  onChange={async (event) =>
                    formDispatch({
                      SelectMultipleValue: event.target.value as string[],
                    })
                  }
                >
                  <MenuItem value="1">A</MenuItem>
                  <MenuItem value="2">B</MenuItem>
                  <MenuItem value="3">C</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">RadioValue</TableCell>
              <TableCell>
                <Radio
                  value="A"
                  checked={formState.RadioValue === 'A'}
                  onChange={async (event) =>
                    formDispatch({ RadioValue: event.target.value })
                  }
                />
                A
                <Radio
                  value="B"
                  checked={formState.RadioValue === 'B'}
                  onChange={async (event) =>
                    formDispatch({ RadioValue: event.target.value })
                  }
                />
                B
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">CheckboxValue</TableCell>
              <TableCell>
                <Checkbox
                  value="A"
                  checked={formState.CheckboxValue === 'A'}
                  onChange={async (event) =>
                    formDispatch({
                      CheckboxValue: event.target.checked
                        ? event.target.value
                        : '',
                    })
                  }
                />
                A
                <Checkbox
                  value="B"
                  checked={formState.CheckboxValue === 'B'}
                  onChange={async (event) =>
                    formDispatch({
                      CheckboxValue: event.target.checked
                        ? event.target.value
                        : '',
                    })
                  }
                />
                B
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">SwitchValue</TableCell>
              <TableCell>
                <Switch
                  checked={formState.SwitchValue}
                  onChange={async (event) =>
                    formDispatch({ SwitchValue: event.target.checked })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">TextareaValue</TableCell>
              <TableCell>
                <TextField
                  multiline
                  minRows={2}
                  maxRows={5}
                  value={formState.TextareaValue}
                  onChange={async (event) =>
                    formDispatch({ TextareaValue: event.target.value })
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right">FileValue</TableCell>
              <TableCell>
                <label>
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={async (event) =>
                      formDispatch({
                        FileValue: FileUtilListToArray(event.target.files),
                      })
                    }
                  />
                  <Button
                    variant="contained"
                    component="span"
                    endIcon={<UploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
// export App01P02
export type { EntryActionModifyModel as App02P02EntryActionModifyModel };
export {
  EntryAction as App02P02EntryAction,
  entryActionModifyState as App02P02EntryActionModifyState,
  Page as App02P02Page,
};
