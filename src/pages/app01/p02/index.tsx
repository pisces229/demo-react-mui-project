import { Button, Grid, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import produce from "immer";
import { AppService } from "../../../services/app";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { FormModel, initialFormModel } from "./model";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { ROUTE_APP01 } from "../../../routes/app01/path";
import { useMessageComponentStore } from "../../../stores/component/message";

export function App01P02Page() {
  const navigate = useNavigate();
  const initialRef = useRef(false);
  const [action] = useState<App01P02Action>(useApp01P02ActionStore.getState().action);
  const [form, setForm] = useState<FormModel>(() => {
    switch (useApp01P02ActionStore.getState().action) {
      case App01P02Action.Empty: {
        return initialFormModel;
      }
      case App01P02Action.Create: {
        return initialFormModel;
      }
      case App01P02Action.Modify: {
        return { ...initialFormModel, ...useApp01P02ActionStore.getState().editState };
      }
      default: {
        return initialFormModel;
      }
    }
  });

  const callbackQuery = useCallback(() => {
    useProgressComponentStore.getState().open();
    console.log(form);
    AppService.query(form.row)
    .then((response) => {
      if (response.data.success) {
        setForm(produce(() => response.data.data));
      } else {
        useMessageComponentStore.getState().warning(response.data.message);
      }
    })
    .finally(() => useProgressComponentStore.getState().close());
  }, [form]);

  useEffect(() => {
    console.log('App01P02Page.initial');
    if (!initialRef.current) {
      initialRef.current = true;
      switch (action) {
        case App01P02Action.Empty: {
          console.log('App01P02Action.Empty');
          navigate(ROUTE_APP01.P01);
          break;
        }
        case App01P02Action.Create: {
          console.log('App01P02Action.Create');
          break;
        }
        case App01P02Action.Modify: {
          console.log('App01P02Action.Modify');
          callbackQuery();
          break;
        }
      }
      useApp01P02ActionStore.getState().setAction();
    }
  }, [action, callbackQuery, form, navigate]);

  const onClickBack = async () => {
    useApp01P01ActionStore.getState().setAction(App01P01Action.Query);
    navigate(ROUTE_APP01.P01);
  };
  const onClickSave = async () => {
    switch (action) {
      case App01P02Action.Create: {
        useProgressComponentStore.getState().open();
        await AppService.create(form)
        .then((response) => {
          if (response.data.success) {
            useMessageComponentStore.getState().success(response.data.message);
            setForm(produce((draft) => { draft.row = response.data.data.row; }));
          } else {
            useMessageComponentStore.getState().warning(response.data.message);
          }
        })
        .finally(() => useProgressComponentStore.getState().close());
        break;
      }
      case App01P02Action.Modify: {
        useProgressComponentStore.getState().open();
        await AppService.modify(form)
        .then((response) => {
          if (response.data.success) {
            useMessageComponentStore.getState().success(response.data.message);
            callbackQuery();
          } else {
            useMessageComponentStore.getState().warning(response.data.message);
          }
        })
        .finally(() => useProgressComponentStore.getState().close());
        break;
      }
    }
  };
  const onClickClear = async () => setForm(initialFormModel);
  return (
    <>
      <h2>App01P02Page</h2>
      <Grid container direction="row" justifyContent="right" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={onClickBack}>Back</Button>
          <Button variant="contained" onClick={onClickSave}>Save</Button>
          <Button variant="contained" onClick={onClickClear}>Clear</Button>
        </Grid>
      </Grid>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell align="right">Row</TableCell>
            <TableCell>{form.row}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">First</TableCell>
            <TableCell>
              <TextField
                inputProps={{ maxLength: 10 }}
                value={form.first}
                onChange={async (event) =>
                  setForm(produce((draft) => { draft.first = event.target.value; }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Second</TableCell>
            <TableCell>
              <TextField
                inputProps={{ maxLength: 10 }}
                value={form.second}
                onChange={async (event) =>
                  setForm(produce((draft) => { draft.second = event.target.value; }))
                }/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
