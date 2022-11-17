import { Button, Grid, Pagination, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import produce from "immer";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { DefaultService } from "../../../services/default";
import { CommonPageModel, initialCommonPageModel } from "../../model";
import { FormModel, initialFormModel, GridModel } from "./model";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { ROUTE_APP01 } from "../../../routes/app01/path";
import { PaginationUtilPageCount } from "../../../utils/pagination";

// Mock...
let GridData: GridModel[] = [];
for (let i = 0; i < 25; ++i) {
  GridData.push({
    check: false,
    row: i.toString(),
    first: i.toString(),
    second: ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
      (c) => {
        let r = Math.random() * 16 | 0;
        let v = (c === 'x' ? r : ((r & 0x3) | 0x8));
        return v.toString(16);
      })),
  })
}
const QueryGridData = (page: CommonPageModel) =>
  GridData.slice(page.PageSize * (page.PageNo - 1), page.PageSize * page.PageNo);
// ...Mock

export function App01P01Page() {
  const navigate = useNavigate();
  const initialRef = useRef(false);
  const [action] = useState<App01P01Action>(useApp01P01ActionStore.getState().action);
  const [form, setForm] = useState<FormModel>(() => {
    switch (action) {
      case App01P01Action.Empty: {
        return initialFormModel;
      }
      case App01P01Action.Query: {
        return { ...useApp01P01ActionStore.getState().queryState };
      }
      default: {
        return initialFormModel;
      }
    }
  });
  const [gridPage, setGridPage] = useState<CommonPageModel>(initialCommonPageModel);
  const [grid, setGrid] = useState<GridModel[]>([]);

  const callbackQuery = useCallback((page: CommonPageModel = gridPage) => {
    useProgressComponentStore.getState().open();
    console.log(form);
    console.log(page);
    DefaultService.success()
    .then((response) => {
      let datas = QueryGridData(page);
      setGridPage({ ...page, TotalCount: GridData.length });
      setGrid(datas);
    })
    .finally(() => useProgressComponentStore.getState().close());
  }, [form, gridPage, setGridPage]);

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
          callbackQuery();
          break;
        }
      }
      useApp01P01ActionStore.getState().setAction();
    }
  }, [action, callbackQuery, form, grid.length]);

  const onClickCreate = async () => {
    useApp01P01ActionStore.getState().setQueryState({ ...form });
    useApp01P02ActionStore.getState().setAction(App01P02Action.Create);
    navigate(ROUTE_APP01.P02);
  };
  const onClickQuery = () => callbackQuery();
  const onClickClear = async () => setForm(initialFormModel);
  const onClickGridCreate = async () => {
    useProgressComponentStore.getState().open();
    let response = await DefaultService.success();
    setGrid(produce((draft) => {
      draft.push({
        check: false,
        row: (grid.length + 1).toString(),
        first: (grid.length + 1).toString(),
        second: response.data.Data,
      });
    }));
    useProgressComponentStore.getState().close();
  };
  const onClickGridRemove = async () => {
    let filterRows = grid.filter((p) => p.check).map((o) => o.row);
    GridData = GridData.filter((p) => !filterRows.includes(p.row));
    let datas = QueryGridData(gridPage);
    setGridPage({ ...gridPage, TotalCount: GridData.length });
    setGrid([ ...datas ]);
  };
  const onClickGridEdit = (index: number) => async () => {
    useApp01P01ActionStore.getState().setQueryState({ ...form });
    useApp01P02ActionStore.getState().setAction(App01P02Action.Modify);
    useApp01P02ActionStore.getState().setEditState({ row: grid[index].row });
    navigate(ROUTE_APP01.P02);
  };
  return (
    <>
      <h2>App01P01Page</h2>
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
      {gridPage.TotalCount &&
      <>
        <Grid container direction="row" justifyContent="left" alignItems="center">
          <Grid item>
            <Button variant="contained" onClick={onClickGridCreate}>Create</Button>
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
              count={PaginationUtilPageCount(gridPage)}
              page={gridPage.PageNo}
              onChange={async (event, page) => callbackQuery({ ...gridPage, PageNo: page })}
            />
          </Grid>
        </Grid>
      </>}
    </>
  );
}
