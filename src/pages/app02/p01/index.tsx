import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTE_APP02 } from "../../../routes/app02/path";
import { DefaultService } from "../../../services/default";
import { useAuthStore } from "../../../stores/auth";
import { useApp02P04ActionStore } from "../../../stores/page/app02/p04";
import { App02P04Action } from "../../../stores/page/app02/p04/state";
import { FileUtilDownload } from "../../../utils/file";

export function App02P01Page() {
  const navigate = useNavigate();
  const app02P04ActionStore = useApp02P04ActionStore();
  const authStore = useAuthStore();
  const onClickGoToP04 = async () => {
    app02P04ActionStore.setBack(ROUTE_APP02.P01);
    app02P04ActionStore.setAction(App02P04Action.Run);
    navigate(ROUTE_APP02.P04);
  };
  const onClickSignIn = async () => {
    await DefaultService.signIn({ Account: 'Account', Password: 'Password' })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          authStore.setToken(response.data.toString());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.signIn.finally`));
  };
  const onClickValidate = async () => {
    await DefaultService.validate()
      .then((response) => {
        console.log(response);
        if (response.status !== 200) {
          authStore.setToken('');
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.validate.finally`));
  };
  const onClickRefresh = async () => {
    if (authStore.token) {
      await DefaultService.refresh(authStore.token)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            authStore.setToken(response.data.toString());
          } else {
            authStore.setToken('');
          }
        })
        .catch((error) => console.log(error))
        .finally(() => console.log(`DefaultService.refresh.finally`));
    }
  };
  const onClickSignOut = async () => {
    await DefaultService.signOut()
      .then((response) => {
        console.log(response);
        authStore.setToken('');
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.signOut.finally`));
  };
  const onClickFree = async () => {
    await DefaultService.free()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.free.finally`));
  };
  const onClickAuth = async () => {
    await DefaultService.auth()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.auth.finally`));
  };
  const onClickMultipleAuth = () => {
    DefaultService.auth()
      .then((response) => console.log('1.then', response))
      .catch((error) => console.log('1.catch', error))
      .finally(() => console.log(`1.finally`));
    DefaultService.auth()
      .then((response) => console.log('2.then', response))
      .catch((error) => console.log('2.catch', error))
      .finally(() => console.log(`2.finally`));
    DefaultService.auth()
      .then((response) => console.log('3.then', response))
      .catch((error) => console.log('3.catch', error))
      .finally(() => console.log(`3.finally`));
  };
  const onClickDownload = async () => {
    DefaultService.download()
      .then((response) => FileUtilDownload(response))
      .then((message) => console.log(message))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.download.finally`));
  };
  const onClickUpload = async () => {
    let formData = new FormData();
    let file = new File(['a', 'b', 'c'], 'upload');
    formData.append('file', file);
    DefaultService.upload(formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.download.finally`));
  };
  return (
    <>
      <h2>Components</h2>
      <Grid
        container
        direction="row"
        justifyContent="right"
        alignItems="center"
      >
        <Grid item>
          <Button variant="contained" onClick={onClickGoToP04}>
            Go to P04
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
        columns={1}
      >
        <Grid item xs={1}>
          <Button variant="contained" onClick={onClickSignIn}>
            SignIn
          </Button>
          <Button variant="contained" onClick={onClickValidate}>
            Validate
          </Button>
          <Button variant="contained" onClick={onClickRefresh}>
            Refresh
          </Button>
          <Button variant="contained" onClick={onClickSignOut}>
            SignOut
          </Button>
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={onClickFree}>
            Free
          </Button>
          <Button variant="contained" onClick={onClickAuth}>
            Auth
          </Button>
          <Button variant="contained" onClick={onClickMultipleAuth}>
            MultipleAuth
          </Button>
          <Button variant="contained" onClick={onClickDownload}>
            Download
          </Button>
          <Button variant="contained" onClick={onClickUpload}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
