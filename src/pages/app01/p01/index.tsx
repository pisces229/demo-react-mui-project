import { Button, Grid, Pagination, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import produce from "immer";
import { PaginationUtil } from "../../../utils/pagination";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { AppService } from "../../../services/app";
import { CommonPageState, initialCommonPageState } from "../../state";
import { FormState, initialFormState, GridState } from "./state";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { ROUTE_APP01 } from "../../../routes/app01/route";
import { useMessageComponentStore } from "../../../stores/component/message";

export const App01P01Page = () => {
  const navigate = useNavigate();
  const initialRef = useRef(false);
  const [action] = useState<App01P01Action>(useApp01P01ActionStore.getState().action);
  const [form, setForm] = useState<FormState>(() => {
    switch (action) {
      case App01P01Action.Empty: {
        return initialFormState;
      }
      case App01P01Action.Query: {
        return { ...useApp01P01ActionStore.getState().queryState };
      }
      default: {
        return initialFormState;
      }
    }
  });
  const [gridPage, setGridPage] = useState<CommonPageState>(initialCommonPageState);
  const [gridTotalCount, setGridTotalCount] = useState<number>();
  const [grid, setGrid] = useState<GridState[]>([]);

  const callbackQuery = useCallback((form: FormState, page: CommonPageState) => {
    useProgressComponentStore.getState().open();
    AppService.queryGrid({ data: form, page: page })
    .then((response) => {
      if (response.data.success) {
        setGridPage(page);
        setGridTotalCount(response.data.data.totalCount);
        setGrid(response.data.data.data.map((data) => ({ ...data, check: false })));
      }
    })
    .finally(() => useProgressComponentStore.getState().close());
  }, []);

  useEffect(() => {
    console.log('App01P01Page.initial');
    if (!initialRef.current) {
      initialRef.current = true;
      switch (action) {
        case App01P01Action.Empty: {
          console.log('App01P01Action.Empty');
          break;
        }
        case App01P01Action.Query: {
          console.log('App01P01Action.Query');
          callbackQuery(form, gridPage);
          break;
        }
      }
      useApp01P01ActionStore.getState().setAction();
    }
  }, [action, callbackQuery, form, gridPage]);

  const onClickCreate = async () => {
    useApp01P01ActionStore.getState().setQueryState({ ...form });
    useApp01P02ActionStore.getState().setAction(App01P02Action.Create);
    navigate(ROUTE_APP01.P02);
  };
  const onClickQuery = () => callbackQuery(form, gridPage);
  const onClickClear = async () => setForm(initialFormState);
  const onClickGridRemove = async () => {
    useProgressComponentStore.getState().open();
    AppService.remove(grid.filter((o) => o.check).map((o) => o.row))
    .then((response) => {
      useMessageComponentStore.getState().success(response.data.message);
      callbackQuery(form, gridPage);
    })
    .finally(() => useProgressComponentStore.getState().close());
  };
  const onClickGridEdit = (index: number) => async () => {
    useApp01P01ActionStore.getState().setQueryState({ ...form });
    useApp01P02ActionStore.getState().setAction(App01P02Action.Modify);
    useApp01P02ActionStore.getState().setEditState({ row: grid[index].row });
    navigate(ROUTE_APP01.P02);
  };
  return (
    <>
      <h3>App01P01Page</h3>
      <Grid container direction="row" justifyContent="right" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={onClickCreate}>Create</Button>
          <Button variant="contained" onClick={onClickQuery}>Query</Button>
          <Button variant="contained" onClick={onClickClear}>Clear</Button>
        </Grid>
      </Grid>
      <Table>
        <TableBody>
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

      {gridTotalCount === 0 && <h3>No Data</h3>}
      {!!gridTotalCount &&
      <>
        <Grid container direction="row" justifyContent="left" alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={onClickGridRemove}>Remove</Button>
          </Grid>
        </Grid>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Index</TableCell>
                <TableCell>Check</TableCell>
                <TableCell>Row</TableCell>
                <TableCell>First</TableCell>
                <TableCell>Second</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grid.map((gridItem, gridIndex) => (
                <TableRow key={gridIndex}>
                  <TableCell>
                    <Button variant="contained" onClick={onClickGridEdit(gridIndex)}>{gridIndex}</Button>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={gridItem.check}
                      onChange={async (event) =>
                        setGrid(produce((draft) => { draft[gridIndex].check = event.target.checked; }))
                      }/>
                  </TableCell>
                  <TableCell>{gridItem.row}</TableCell>
                  <TableCell>
                    <TextField
                      value={gridItem.first}
                      onChange={async (event) =>
                        setGrid(produce((draft) => { draft[gridIndex].first = event.target.value; }))
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={gridItem.second}
                      onChange={async (event) =>
                        setGrid(produce((draft) => { draft[gridIndex].second = event.target.value; }))
                      }/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container direction="row" justifyContent="center" alignItems="center">
          <Grid item>
            <Pagination siblingCount={2}
              count={PaginationUtil.pageCount(gridPage.pageSize, gridTotalCount)}
              page={gridPage.pageNo}
              onChange={async (event, page) => callbackQuery(form, { ...gridPage, pageNo: page })}
            />
          </Grid>
        </Grid>
      </>}
    </>
  );
}
