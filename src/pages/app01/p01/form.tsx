import { Button, Grid, Table, TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { DatepickerComponent } from "../../../components/datepicker";
import { ROUTE_APP01 } from "../../../routes/app01/path";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { PageContext } from "./context";
import { initialFormModel } from "./model";

export function PageForm() {
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);
  const progressState = useProgressComponentStore();
  const app01P01ActionStore = useApp01P01ActionStore();
  const app01P02ActionStore = useApp01P02ActionStore();
  useEffect(() => {
    switch (pageContext.action) {
      case App01P01Action.Query: {
        onClickQueryForm();
        break;
      }
      default: {
        // do something
        break;
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onClickGoCreate = async () => {
    app01P01ActionStore.setQueryState({ ...pageContext.form });
    app01P02ActionStore.setAction(App01P02Action.Create);
    app01P02ActionStore.setEditState({ ...pageContext.form });
    navigate(ROUTE_APP01.P02);
  };
  const onClickQueryForm = async () => {
    progressState.open();
    console.log(pageContext.form);
    setTimeout(() => {
      pageContext.setGridPage({ PageNo: 1, PageSize: 10, TotalCount: 100 });
      pageContext.setGrid([{ check: false, first: '1', second: '1' }]);
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
          <Button variant="contained" onClick={onClickGoCreate}>
            Create
          </Button>
          <Button variant="contained" onClick={onClickQueryForm}>
            Query
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
              <DatepickerComponent
                  value={pageContext.form.second!}
                  disabled={false}
                  hidden={false}
                  onChange={async (value: string) =>
                    pageContext.setForm((state) => ({ ...state, second: value }))
                  }></DatepickerComponent>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
}
