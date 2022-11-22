import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Box, Button, Checkbox, Grid, MenuItem, Modal, Radio, Select, Switch, Tab, Table, TableBody, TableCell, TableRow, Tabs, TextField, TextFieldProps, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Fragment, useEffect, useState } from 'react';
import { FileUtil } from '../../../utils/file';
import { CheckboxUtil } from '../../../utils/checkbox';
import { FormState, initialFormState } from './state';
import { CommonOptionState } from '../../state';
import { useNavigate } from 'react-router';
import { useApp02P04ActionStore } from '../../../stores/page/app02/p04';
import { ROUTE_APP02 } from '../../../routes/app02/route';
import { App02P04Action } from '../../../stores/page/app02/p04/state';
import { RocDatePickerComponent } from '../../../components/roc-date-picker';
import { UploadPreviewComponent } from '../../../components/upload-preview';
import { commonOpenPageStyle } from '../../../styles';
import { App02D01Page } from '../d01';

const options: CommonOptionState[] = [
  { value: '1', text: 'A', disable: false },
  { value: '2', text: 'B', disable: false },
  { value: '3', text: 'C', disable: false },
];

export const App02P02Page = () => {
  const navigate = useNavigate();
  const app02P04ActionStore = useApp02P04ActionStore();
  const [form, setForm] = useState<FormState>(initialFormState);
  const [tab, setTab] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    console.log(form);
  }, [form]);
  const onClickGoToP04 = async () => {
    app02P04ActionStore.setBack(ROUTE_APP02.P02);
    app02P04ActionStore.setAction(App02P04Action.Run);
    navigate(ROUTE_APP02.P04);
  };
  const onChangeTab = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };
  return (
    <>
      <h3>Components</h3>
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={() => setOpen(true)}>
            Open Modal
          </Button>
          <Button variant="contained" onClick={onClickGoToP04}>
            Go to P04
          </Button>
        </Grid>
      </Grid>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right">TextField</TableCell>
            <TableCell>
              <TextField
                value={form.textFieldValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, textFieldValue: event.target.value }))
                }/>
                             <TextField
                value={form.textFieldValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, textFieldValue: event.target.value }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">RocDate</TableCell>
            <TableCell>
              <RocDatePickerComponent
                value={form.rocDateValue!}
                disabled={false}
                hidden={false}
                onChange={async (value: string) =>
                  setForm((state) => ({ ...state, rocDateValue: value }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">SelectSingle</TableCell>
            <TableCell>
              <Select
                displayEmpty={true}
                value={form.selectSingleValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, selectSingleValue: event.target.value }))
                }>
                <MenuItem value="">None</MenuItem>
                {options.map((item, index) => (<MenuItem key={index} value={item.value}>{item.text}</MenuItem>))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">SelectMultiple</TableCell>
            <TableCell>
              <Select
                multiple
                value={form.selectMultipleValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, selectMultipleValue: event.target.value as string[] }))
                }>
                {options.map((item, index) => (<MenuItem key={index} value={item.value}>{item.text}</MenuItem>))}
              </Select>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Autocomplete</TableCell>
            <TableCell>
              <Autocomplete
                sx={{ width: 300 }}
                disablePortal
                options={options}
                getOptionLabel={(option) => option.text}
                getOptionDisabled={(option) => option.disable!}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={form.autocompleteValue}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                onChange={async (
                  event: React.SyntheticEvent<Element, Event>,
                  value: CommonOptionState | null,
                  reason: AutocompleteChangeReason,
                  details?: AutocompleteChangeDetails<CommonOptionState> | undefined
                ) => {
                  setForm((state) => ({ ...state, autocompleteValue: value }))
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Radio</TableCell>
            <TableCell>
              {options.map((item, index) => (
                <Fragment key={index}>
                  <Radio
                    value={item.value}
                    checked={item.value === form.radioValue}
                    onChange={async (event) =>
                      setForm((state) => ({ ...state, radioValue: event.target.value }))
                    }/>{item.text}
                </Fragment>))
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Checkbox</TableCell>
            <TableCell>
              <Checkbox
                checked={CheckboxUtil.allChecked(options.map(item => item.value), form.checkboxValue)}
                onChange={async (event) =>
                  setForm((state) => ({
                    ...state,
                    checkboxValue: CheckboxUtil.allChange(options.map(item => item.value), event.target.checked)
                  }))
                }/>ALL
              {options.map((item, index) => (
                <Fragment key={index}>
                  <Checkbox
                    value={item.value}
                    checked={CheckboxUtil.checked(form.checkboxValue, item.value)}
                    onChange={async (event) =>
                      setForm((state) => ({
                        ...state,
                        checkboxValue: CheckboxUtil.change(form.checkboxValue, event.target.checked, event.target.value)
                      }))
                    }/>{item.text}
                </Fragment>))
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Switch</TableCell>
            <TableCell>
              <Switch
                checked={form.switchValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, switchValue: event.target.checked }))
                }
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Textarea</TableCell>
            <TableCell>
              <TextField
                multiline
                minRows={2}
                maxRows={5}
                value={form.textareaValue}
                onChange={async (event) =>
                  setForm((state) => ({ ...state, textareaValue: event.target.value }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">File</TableCell>
            <TableCell>
              <label>
                <input type="file" multiple hidden
                  onChange={async (event) =>
                    setForm((state) => ({ ...state, fileValue: FileUtil.listToArray(event.target.files) }))
                  }/>
                <Button fullWidth={true} variant="contained" component="span" endIcon={<UploadIcon />}>Upload</Button>
              </label>
              <UploadPreviewComponent files={form.fileValue}></UploadPreviewComponent>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={onChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item One</Typography>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item Two</Typography>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item Three</Typography>
        </Box>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={commonOpenPageStyle}>
          <App02D01Page onClose={() => setOpen(false)}></App02D01Page>
        </Box>
      </Modal>
    </>
  );
}
