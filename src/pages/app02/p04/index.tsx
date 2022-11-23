import { Button, Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE } from "../../../routes/route";
import { useApp02P04ActionStore } from "../../../stores/page/app02/p04";
import { App02P04Action } from "../../../stores/page/app02/p04/state";

export const App02P04Page = () => {
  const navigate = useNavigate();
  const initialRef = useRef(false);
  const [back] = useState<string>(useApp02P04ActionStore.getState().back);
  const [action] = useState<App02P04Action>(useApp02P04ActionStore.getState().action);
  useEffect(() => {
    if (!initialRef.current) {
      switch (action) {
        case App02P04Action.Empty: {
          navigate(ROUTE.HOME);
          break;
        }
        case App02P04Action.Run: {
          break;
        }
        default: {
          navigate(ROUTE.HOME);
        }
      }
      initialRef.current = true;
    }
    useApp02P04ActionStore.getState().setAction();
  }, [action, navigate])
  return (
    <>
      <h3>Back</h3>
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={() => navigate(back)}>
            Back [{back}]
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
