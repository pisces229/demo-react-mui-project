import { Button, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import produce from "immer";
import {
  CommonPageTitle,
  CommonFormContainer,
  CommonFormHeader,
  CommonFormHeaderText,
  commonFormTextStyle,
  CommonGridTopContainer,
  commonGridContainerStyle,
  commonGridHeadCellStyle,
  commonGridBodyStyle,
  commonGridBodyCellStyle,
  CommonLinkStyle,
} from "../../../styles";
import { PaginationComponent } from "../../../components/pagination";
import { useProgressComponentStore } from "../../../stores/component/progress";
import { useMessageComponentStore } from "../../../stores/component/message";
import { ConfirmComponent } from "../../../components/confirm";
import { CompoentConfirmProp, initialCompoentConfirmProp } from "../../../components/confirm/prop";
import { CommonPageState, initialCommonPageState } from "../../state";
import { AppService } from "../../../services/app";
import { AppQueryInputModel } from "../../../services/app/model";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { ROUTE_APP01 } from "../../../routes/app01/route";
import { FormState, initialFormState, GridState } from "./state";
import { CommonPagedQueryInputModel } from "../../../services/model";

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
  const [gridCheckbox, setGridCheckbox]= useState<boolean>(false);
  const [gridPage, setGridPage] = useState<CommonPageState>(initialCommonPageState);
  const [gridTotalCount, setGridTotalCount] = useState<number>();
  const [grid, setGrid] = useState<GridState[]>([]);

  const [compoentConfirmProp, setCompoentConfirmProp] =
    useState<CompoentConfirmProp>(initialCompoentConfirmProp);

  const callbackQuery = useCallback((requestData: CommonPagedQueryInputModel<AppQueryInputModel>) => {
    useProgressComponentStore.getState().open();
    AppService.queryGrid(requestData)
    .then((response) => {
      if (response.data.success) {
        setGridPage(requestData.page);
        setGridTotalCount(response.data.data.totalCount);
        setGrid(response.data.data.data.map((data) => ({ ...data, checkbox: false })));
        if (response.data.data.totalCount === 0) {
          useMessageComponentStore.getState().info(response.data.message);
        }
      } else {
        useMessageComponentStore.getState().warning(response.data.message);
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
          callbackQuery({ data: form, page: gridPage });
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
  const onClickGridRemoveConfirm = async () => {
    if (grid.filter((o) => o.checkbox).length === 0) {
      useMessageComponentStore.getState().warning('Please Choice Data');
    } else {
      setCompoentConfirmProp(produce((draft) => {
        draft.display = true;
        draft.message = 'Remove?';
      }));
    }
  };
  const onClickGridRemove = async () => {
    setCompoentConfirmProp(produce((draft) => { draft.display = false; }));
    useProgressComponentStore.getState().open();
    AppService.remove(grid.filter((o) => o.checkbox).map((o) => o.row))
    .then((response) => {
      if (response.data.success) {
        useMessageComponentStore.getState().success(response.data.message);
        callbackQuery({ data: form, page: gridPage });
      } else {
        useMessageComponentStore.getState().warning(response.data.message);
      }
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
      <CommonPageTitle>APP01</CommonPageTitle>
      <CommonFormContainer>
        <CommonFormHeader
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          spacing={1}
        >
          <CommonFormHeaderText>【Query】</CommonFormHeaderText>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={1}
          >
            <Button variant="contained" onClick={onClickCreate}>Create</Button>
            <Button variant="contained" onClick={() => callbackQuery({ data: form, page: gridPage })}>Query</Button>
            <Button variant="contained" onClick={() => setForm(initialFormState)}>Clear</Button>
          </Stack>
        </CommonFormHeader>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell align="right" sx={commonFormTextStyle}>First：</TableCell>
              <TableCell align="left" sx={commonFormTextStyle}>
                <TextField
                  inputProps={{ maxLength: 10 }}
                  value={form.first}
                  onChange={async (event) =>
                    setForm(produce((draft) => { draft.first = event.target.value; }))
                  }/>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="right" sx={commonFormTextStyle}>Second：</TableCell>
              <TableCell align="left" sx={commonFormTextStyle}>
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
      </CommonFormContainer>

      {gridTotalCount &&
      <>
        <CommonGridTopContainer
          direction="row"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
          >
            <Button variant="contained" onClick={onClickGridRemoveConfirm}>Remove</Button>
          </Stack>
          <PaginationComponent page={gridPage} totalCount={gridTotalCount}
            onChange={(page) => { callbackQuery({ data: form, page: page }); }}
          ></PaginationComponent>
        </CommonGridTopContainer>
        {/* <TableContainer sx={{ ..., maxHeight: '400px' }}> */}
        <TableContainer sx={commonGridContainerStyle}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ ...commonGridHeadCellStyle, width: '1rem' }}>
                  <Switch
                    checked={gridCheckbox}
                    onChange={async (event) => {
                      setGridCheckbox(event.target.checked);
                      setGrid(produce((draft) => draft.forEach(f => f.checkbox = event.target.checked)));
                    }}></Switch>
                </TableCell>
                <TableCell align="center" sx={{ ...commonGridHeadCellStyle, width: '2rem' }}>Edit</TableCell>
                <TableCell align="center" sx={commonGridHeadCellStyle}>Row</TableCell>
                <TableCell align="center" sx={commonGridHeadCellStyle}>First</TableCell>
                <TableCell align="center" sx={commonGridHeadCellStyle}>Second</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grid.map((gridItem, gridIndex) => (
                <TableRow sx={commonGridBodyStyle} key={gridIndex}>
                  <TableCell align="center" sx={commonGridBodyCellStyle}>
                    <Switch
                      checked={gridItem.checkbox}
                      onChange={async (event) =>
                        setGrid(produce((draft) => { draft[gridIndex].checkbox = event.target.checked; }))
                      }
                    ></Switch>
                  </TableCell>
                  <TableCell align="center" sx={commonGridBodyCellStyle}>
                    <CommonLinkStyle onClick={onClickGridEdit(gridIndex)}>Edit</CommonLinkStyle>
                  </TableCell>
                  <TableCell align="left" sx={commonGridBodyCellStyle}>{gridItem.row}</TableCell>
                  <TableCell align="center" sx={commonGridBodyCellStyle}>{gridItem.first}</TableCell>
                  <TableCell align="center" sx={commonGridBodyCellStyle}>{gridItem.second}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>}

      <ConfirmComponent
        {...compoentConfirmProp}
        onAgree={onClickGridRemove}
        onDisagree={() => setCompoentConfirmProp(produce((draft) => { draft.display = false; }))}
      ></ConfirmComponent>
    </>
  );
}
