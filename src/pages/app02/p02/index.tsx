import { Autocomplete, AutocompleteChangeDetails, AutocompleteChangeReason, Box, Button, Checkbox, Grid, MenuItem, Radio, Select, Switch, Tab, Table, TableBody, TableCell, TableRow, Tabs, TextField, TextFieldProps, Typography } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Fragment, useEffect, useState } from 'react';
import { FileUtilListToArray } from '../../../utils/file';
import { FormModel, initialFormModel } from './model';
import { CommonOptionModel } from '../../model';
import { useNavigate } from 'react-router';
import { useApp02P04ActionStore } from '../../../stores/page/app02/p04';
import { ROUTE_APP02 } from '../../../routes/app02/path';
import { App02P04Action } from '../../../stores/page/app02/p04/state';

const options: CommonOptionModel[] = [
  { Value: '1', Text: 'A', Disable: false },
  { Value: '2', Text: 'B', Disable: false },
  { Value: '3', Text: 'C', Disable: false },
];

export function App02P02Page() {
  const navigate = useNavigate();
  const app02P04ActionStore = useApp02P04ActionStore();
  const [form, setForm] = useState<FormModel>(initialFormModel);
  const [tab, setTab] = useState(0);
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
      <h2>Axios</h2>
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
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
                {options.map((item, index) => (<MenuItem key={index} value={item.Value}>{item.Text}</MenuItem>))}
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
                {options.map((item, index) => (<MenuItem key={index} value={item.Value}>{item.Text}</MenuItem>))}
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
                getOptionLabel={(option) => option.Text}
                getOptionDisabled={(option) => option.Disable!}
                isOptionEqualToValue={(option, value) => option.Value === value.Value}
                value={form.autocompleteValue}
                renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                onChange={async (
                  event: React.SyntheticEvent,
                  value: CommonOptionModel | null,
                  reason: AutocompleteChangeReason,
                  details?: AutocompleteChangeDetails<CommonOptionModel> | undefined
                ) => {
                  // console.log(event);
                  // console.log(value);
                  // console.log(reason);
                  // console.log(details);
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
                    value={item.Value}
                    checked={item.Value === form.radioValue}
                    onChange={async (event) =>
                      setForm((state) => ({ ...state, radioValue: event.target.value }))
                    }/>{item.Text}
                </Fragment>))
              }
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Checkbox</TableCell>
            <TableCell>
              {options.map((item, index) => (
                <Fragment key={index}>
                  <Checkbox
                    value={item.Value}
                    checked={item.Value === form.checkboxValue}
                    onChange={async (event) =>
                      setForm((state) => ({ ...state, checkboxValue: event.target.checked ? event.target.value : '' }))
                    }/>{item.Text}
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
                    setForm((state) => ({ ...state, fileValue: FileUtilListToArray(event.target.files) }))
                  }/>
                <Button variant="contained" component="span" endIcon={<UploadIcon />}>Upload</Button>
              </label>
              {form.fileValue.map((item, index) => (<div key={index}>[{item.name}][{item.size}]</div>))}
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
    </>
  );
}
