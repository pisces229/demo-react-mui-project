import { Button, Grid, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTE_APP01 } from "../../../routes/app01/path";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { PageContext } from "./context";
import { initialFormModel } from "./model";

export function PageForm() {
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);
  const progressState = useProgressComponentStore();
  const app01P01ActionStore = useApp01P01ActionStore();
  useEffect(() => {
    console.log('p02.PageForm.useEffect');
    switch (pageContext.action) {
      case App01P02Action.Create: {
        // nothing
        break;
      }
      case App01P02Action.Modify: {
        progressState.open();
        setTimeout(() => {
          console.log(pageContext.form);
          progressState.close();
        }, 1000);
        break;
      }
      default: {
        navigate(ROUTE_APP01.P01);
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickBack = async () => {
    app01P01ActionStore.setAction(App01P01Action.Query);
    navigate(ROUTE_APP01.P01);
  };
  const onClickShowForm = async () => {
    progressState.open();
    console.log(pageContext.form);
    setTimeout(() => {
      progressState.close();
    }, 1000);
  };
  const onClickClearForm = async () => {
    pageContext.setForm(initialFormModel);
  };

  return (
    <>
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
      <Table>
        <TableBody>
        <TableRow>
            <TableCell align="right">First</TableCell>
            <TableCell>
              <TextField
                inputProps={{ maxLength: 10 }}
                value={pageContext.form.first!}
                onChange={async (event) =>
                  pageContext.setForm((state) => ({ ...state, first: event.target.value }))
                }/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Second</TableCell>
            <TableCell>
              <TextField
                inputProps={{ maxLength: 10 }}
                value={pageContext.form.second!}
                onChange={async (event) =>
                  pageContext.setForm((state) => ({ ...state, second: event.target.value }))
                }/>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
