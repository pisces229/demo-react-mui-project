import {
  Button,
  Grid,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { ROUTE_APP01 } from '../../../routes/app01/path';
import { useApp01P01ActionStore } from '../../../stores/page/app01/p01';
import { useApp01P02ActionStore } from '../../../stores/page/app01/p02';
import { App01P02Action } from '../../../stores/page/app01/p02/state';
import { PageContext } from './context';
import { GridModel } from './model';

export function PageGrid() {
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);
  const app01P01ActionStore = useApp01P01ActionStore();
  const app01P02ActionStore = useApp01P02ActionStore();
  const onClickShowGrid = async () => {
    console.log(pageContext.grid);
  };
  const onClickCreateGrid = async () => {
    let item: GridModel = {
      check: false,
      first: (pageContext.grid.length + 1).toString(),
      second: (pageContext.grid.length + 1).toString(),
    };
    pageContext.setGrid([...pageContext.grid, item]);
  };
  const onClickRemoveGrid = async () => {
    pageContext.setGrid([...pageContext.grid.filter((p) => !p.check)]);
  };
  const onClickGoModify = (index: number) => async () => {
    app01P01ActionStore.setQueryState({ ...pageContext.form });
    app01P02ActionStore.setAction(App01P02Action.Modify);
    app01P02ActionStore.setEditState({ ...pageContext.grid[index], row: index.toString() });
    navigate(ROUTE_APP01.P02);
  };
  const onClickModifyGrid = (index: number, item: {}) => {
    pageContext.grid[index] = { ...pageContext.grid[index], ...item };
    pageContext.setGrid([...pageContext.grid]);
  };
  const onChangePage = async (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    pageContext.setGridPage((state) => ({ ...state, PageNo: page }));
  };
  return (
    <>
      <Grid container direction="row" justifyContent="left" alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={onClickShowGrid}>
            Show Grid
          </Button>
          <Button variant="contained" onClick={onClickCreateGrid}>
            Create Grid
          </Button>
          <Button variant="contained" onClick={onClickRemoveGrid}>
            Remove Grid
          </Button>
        </Grid>
      </Grid>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell>Check</TableCell>
              <TableCell>First</TableCell>
              <TableCell>Second</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageContext.grid.map((gridItem, gridIndex) => (
              <TableRow key={gridIndex}>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={onClickGoModify(gridIndex)}
                  >{gridIndex}</Button>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={gridItem.check}
                    onChange={async (event) =>
                      onClickModifyGrid(gridIndex, { check: event.target.checked })
                    }/>
                </TableCell>
                <TableCell>
                  <TextField
                    value={gridItem.first}
                    onChange={async (event) =>
                      onClickModifyGrid(gridIndex, { first: event.target.value })
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={gridItem.second}
                    onChange={async (event) =>
                      onClickModifyGrid(gridIndex, { second: event.target.value })
                    }/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Pagination
            siblingCount={2}
            count={pageContext.gridPage.TotalCount}
            page={pageContext.gridPage.PageNo}
            onChange={onChangePage}
          />
        </Grid>
      </Grid>
    </>
  );
}
