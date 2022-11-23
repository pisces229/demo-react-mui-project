import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router";
import { ROUTE_APP02 } from "../../../routes/app02/route";
import { DefaultService } from "../../../services/default";
import { CommonOutputModel } from "../../../services/model";
import { useAuthStore } from "../../../stores/auth";
import { useApp02P04ActionStore } from "../../../stores/page/app02/p04";
import { App02P04Action } from "../../../stores/page/app02/p04/state";
import { FileUtil } from "../../../utils/file";

export const App02P01Page = () => {
  const navigate = useNavigate();
  const app02P04ActionStore = useApp02P04ActionStore();
  const authStore = useAuthStore();
  const onClickGoToP04 = async () => {
    app02P04ActionStore.setBack(ROUTE_APP02.P01);
    app02P04ActionStore.setAction(App02P04Action.Run);
    navigate(ROUTE_APP02.P04);
  };

  const onClickSignIn = async () => {
    await DefaultService.signIn({ account: 'Account', password: 'Password' })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          authStore.setToken(response.data.data);
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

  const onClickValueHttpGet = () => {
    DefaultService.valueHttpGet('[Test]')
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.valueHttpGet.finally`));
  };
  const onClickValueHttpPost = () => {
    DefaultService.valueHttpPost('[Test]')
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.valueHttpPost.finally`));
  };
  const onClickJsonHttpGet = () => {
    DefaultService.jsonHttpGet({ text: '[Test]', value: 9, date: new Date() })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.valueHttpGet.finally`));
  };
  const onClickJsonHttpPost = () => {
    DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() })
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.ValueHttpPost.finally`));
  };

  const onClickDownload = async () => {
    DefaultService.download({ filename: 'test' })
      .then((response) => FileUtil.download(response))
      .then((value: CommonOutputModel<string>) => {
        console.log(value);
        if (!value.success) {
          console.log(value.message);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.download.finally`));
  };
  const onClickUpload = async () => {
    let formData = new FormData();
    let file = new File(['a', 'b', 'c'], 'upload');
    formData.append('file', file);
    formData.append('name', 'upload');
    DefaultService.upload(formData)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.download.finally`));
  };

  const onClickCommonPagedQuery = () => {
    DefaultService.commonPagedQuery({
      page: { pageNo: 1, pageSize: 10 },
      data: { text: '[Test]', value: 9, date: new Date() }
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
    .finally(() => console.log(`DefaultService.commonPagedQuery.finally`));
  };
  const onClickMultiple = () => {
    DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() })
      .then((response) => console.log('1.then', response))
      .catch((error) => console.log('1.catch', error))
      .finally(() => console.log(`1.finally`));
    DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() })
      .then((response) => console.log('2.then', response))
      .catch((error) => console.log('2.catch', error))
      .finally(() => console.log(`2.finally`));
    DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() })
      .then((response) => console.log('3.then', response))
      .catch((error) => console.log('3.catch', error))
      .finally(() => console.log(`3.finally`));
  };
  const onClickMultipleAll = () => {
    Promise.all([
      DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() }),
      DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() }),
      DefaultService.jsonHttpPost({ text: '[Test]', value: 9, date: new Date() }),
    ])
    .then((response) => console.log('then', response))
    .catch((error) => console.log('catch', error))
    .finally(() => console.log(`finally`));
  };
  return (
    <>
      <h3>Axios</h3>
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
          <Button variant="contained" onClick={onClickSignIn}>Sign In</Button>&nbsp;
          <Button variant="contained" onClick={onClickValidate}>Validate</Button>&nbsp;
          <Button variant="contained" onClick={onClickRefresh}>Refresh</Button>&nbsp;
          <Button variant="contained" onClick={onClickSignOut}>Sign Out</Button>&nbsp;
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={onClickValueHttpGet}>Value Get</Button>&nbsp;
          <Button variant="contained" onClick={onClickValueHttpPost}>Value Post</Button>&nbsp;
          <Button variant="contained" onClick={onClickJsonHttpGet}>Json Get</Button>&nbsp;
          <Button variant="contained" onClick={onClickJsonHttpPost}>Json Post</Button>&nbsp;
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={onClickDownload}>Download</Button>&nbsp;
          <Button variant="contained" onClick={onClickUpload}>Upload</Button>&nbsp;
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" onClick={onClickCommonPagedQuery}>Paged Query</Button>&nbsp;
          <Button variant="contained" onClick={onClickMultiple}>Multiple</Button>&nbsp;
          <Button variant="contained" onClick={onClickMultipleAll}>Multiple All</Button>&nbsp;
        </Grid>
      </Grid>
    </>
  );
}
