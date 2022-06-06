import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import { DefaultService } from '../../services/default.service';
import { FileUtilDownload } from '../../utils/file.util';
import { useNavigate } from 'react-router';
import { useState } from 'react';

export function HomePage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const onChangeTab = (event: React.SyntheticEvent, value: number) => {
    setTab(value);
  };
  const onClickSignIn = async () => {
    await DefaultService.signIn({ Account: 'Account', Password: 'Password' })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.toString());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.signIn.finally`));
  };
  const onClickValidate = async () => {
    await DefaultService.validate()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.validate.finally`));
  };
  const onClickRefresh = async () => {
    if (localStorage.getItem('token')) {
      await DefaultService.refresh(parseInt(localStorage.getItem('token')!))
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => console.log(`DefaultService.refresh.finally`));
    }
  };
  const onClickSignOut = async () => {
    await DefaultService.signOut()
      .then((response) => {
        console.log(response);
        localStorage.removeItem('token');
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
      <h2>Home Page</h2>
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
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tab}
          onChange={onChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </Box>
      {tab === 0 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item One</Typography>
        </Box>
      )}
      {tab === 1 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item Two</Typography>
        </Box>
      )}
      {tab === 2 && (
        <Box sx={{ p: 1 }}>
          <Typography>Item Three</Typography>
        </Box>
      )}
    </>
  );
}
