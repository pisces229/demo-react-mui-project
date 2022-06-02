import {
  Button,
  Checkbox,
  MenuItem,
  Radio,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { CommonState } from '../../common/common-state';
import { ROUTE_APP01 } from '../../routes/app01.route';
import { DefaultService } from '../../services/default.service';
import { App01P01EntryAction } from './app01-p01.page';
import { FileUtilListToArray } from '../../utils/file.util';

// Action
enum EntryAction {
  Empty,
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
  FileValue: File[];
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
  FileValue: [],
};
// Page
const Page = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState<FormModel>(formInitial);
  useEffect(() => {
    console.log('mounted');
    console.log('location.state', location.state);
    switch (location.state as number) {
      case EntryAction.Modify: {
        console.log('EntryAction.Modify');
        console.log(entryActionModifyState.get());
        // if (entryActionModifyState.get()) {
        //   setFormState((state) => ({ ...state, ...entryActionModifyState.get() }));
        // } else {
        //   navigate(ROUTE_APP01.P01);
        // }
        break;
      }
      default: {
        navigate(ROUTE_APP01.P01);
        break;
      }
    }
    return () => {
      console.log('unmounted');
    };
  }, [location.state, navigate]);
  const onClickToPage = async () => {
    navigate(ROUTE_APP01.P01, { state: App01P01EntryAction.Query });
  };
  const onClickShowForm = async () => {
    console.log(formState);
  };
  const onClickClearForm = async () => {
    setFormState({ ...formInitial });
  };
  return (
    <>
      <h3>App01P02Page.</h3>
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
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Component</TableCell>
            </TableRow>
          </TableHead>
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
            <TableRow>
              <TableCell>SelectSingleValue</TableCell>
              <TableCell>
                <Select
                  displayEmpty={true}
                  value={formState.SelectSingleValue}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      SelectSingleValue: event.target.value,
                    }))
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
              <TableCell>SelectMultipleValue</TableCell>
              <TableCell>
                <Select
                  multiple
                  value={formState.SelectMultipleValue}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      SelectMultipleValue: event.target.value as string[],
                    }))
                  }
                >
                  <MenuItem value="1">A</MenuItem>
                  <MenuItem value="2">B</MenuItem>
                  <MenuItem value="3">C</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>RadioValue</TableCell>
              <TableCell>
                <Radio
                  value="A"
                  checked={formState.RadioValue === 'A'}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      RadioValue: event.target.value,
                    }))
                  }
                />
                A
                <Radio
                  value="B"
                  checked={formState.RadioValue === 'B'}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      RadioValue: event.target.value,
                    }))
                  }
                />
                B
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>CheckboxValue</TableCell>
              <TableCell>
                <Checkbox
                  value="A"
                  checked={formState.CheckboxValue === 'A'}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      CheckboxValue: event.target.checked
                        ? event.target.value
                        : '',
                    }))
                  }
                />
                A
                <Checkbox
                  value="B"
                  checked={formState.CheckboxValue === 'B'}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      CheckboxValue: event.target.checked
                        ? event.target.value
                        : '',
                    }))
                  }
                />
                B
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>SwitchValue</TableCell>
              <TableCell>
                <Switch
                  checked={formState.SwitchValue}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      SwitchValue: event.target.checked,
                    }))
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TextareaValue</TableCell>
              <TableCell>
                <TextField
                  multiline
                  minRows={2}
                  maxRows={5}
                  value={formState.TextareaValue}
                  onChange={async (event) =>
                    setFormState((state) => ({
                      ...state,
                      TextareaValue: event.target.value,
                    }))
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>FileValue</TableCell>
              <TableCell>
                <label>
                  <input
                    type="file"
                    multiple
                    hidden
                    onChange={async (event) =>
                      setFormState((state) => ({
                        ...state,
                        FileValue: FileUtilListToArray(event.target.files),
                      }))
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
export {
  EntryAction as App01P02EntryAction,
  entryActionModifyState as App01P02EntryActionModifyState,
  Page as App01P02Page,
};
