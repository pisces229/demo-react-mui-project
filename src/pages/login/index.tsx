import { Button, Table, TableBody, TableCell, TableRow, TextField } from '@mui/material';
import produce from "immer";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../routes/route';
import { FormState, initialFormState } from './state';
import { ScopeTableCellStyle } from './style';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialFormState);
  const onClickSignIn = () => {
    navigate(ROUTE.HOME);
  };
  return (
    <>
      <Table sx={{ width: '50%', margin: 'auto' }}>
        <TableBody>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <h3>Login Page</h3>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" sx={{...ScopeTableCellStyle, width: '40%'}}>Account</TableCell>
            <TableCell sx={ScopeTableCellStyle}>
              <TextField
                type="text"
                inputProps={{ maxLength: 10 }}
                value={form.account}
                onChange={async (event) =>
                  setForm(produce((draft) => { draft.account = event.target.value; }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Second</TableCell>
            <TableCell>
              <TextField
                type="password"
                inputProps={{ maxLength: 10 }}
                value={form.password}
                onChange={async (event) =>
                  setForm(produce((draft) => { draft.password = event.target.value; }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" colSpan={2}>
              <Button variant="contained" onClick={onClickSignIn}>Sign In</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
