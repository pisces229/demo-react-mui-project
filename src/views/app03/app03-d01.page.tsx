import {
  Box,
  Button,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { commonModalBoxStyle } from '../../styles/common.style';

// Action
// enum EntryAction {
//   Empty,
// }
// Model
interface InputModel {
  display: boolean;
  value?: string;
}
interface OutputModel {
  value?: string;
}
interface FormModel {
  value: string;
}
// State
// const entryActionQueryState = new CommonState<FormModel>();
// Initial
const formInitial: FormModel = {
  value: '',
};
// Page
const Page = (prop: {
  input: InputModel;
  output: (value: OutputModel) => {};
}) => {
  const [formState, setFormState] = useState<FormModel>(formInitial);
  useEffect(() => {
    console.log('mounted');
    console.log('prop.input', prop.input);
    return () => {
      console.log('unmounted');
    };
  }, [prop.input]);
  const onClickClose = async () => {
    prop.output({ ...formInitial });
  };
  return (
    <Modal
      open={prop.input.display}
      // onClose={onClickClose}
    >
      <Box sx={{ ...commonModalBoxStyle }}>
        <h2>App03D01Page.</h2>
        <Grid
          container
          direction="row"
          justifyContent="right"
          alignItems="center"
        >
          <Grid item>
            <Button variant="contained" onClick={onClickClose}>
              Close
            </Button>
          </Grid>
        </Grid>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell align="right">Value</TableCell>
                <TableCell>
                  <TextField
                    value={formState.value}
                    onChange={async (event) =>
                      setFormState((state) => ({
                        ...state,
                        value: event.target.value,
                      }))
                    }
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};
// export App03D01
export type {
  InputModel as App03D01InputModel,
  OutputModel as App03D01OutputModel,
};
export { Page as App03D01Page };
