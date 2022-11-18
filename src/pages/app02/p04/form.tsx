import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { ROUTE_APP02 } from "../../../routes/app02/route";
import { ROUTE } from "../../../routes/route";
import { PageContext } from "./context";

export function PageForm() {
  const navigate = useNavigate();
  const pageContext = useContext(PageContext);
  const onClickBack = async () => {
    switch (pageContext.back) {
      case ROUTE_APP02.P01: {
        navigate(ROUTE_APP02.P01);
        break;
      }
      case ROUTE_APP02.P02: {
        navigate(ROUTE_APP02.P02);
        break;
      }
      default: {
        navigate(ROUTE.HOME);
        break;
      }
    }
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
            Back [{pageContext.back}]
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
