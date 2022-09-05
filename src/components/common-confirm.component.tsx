import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const Component = (prop: {
  display: boolean;
  title: string;
  message: string;
  onAgree: () => {};
  onDisagree: () => {};
}) => {
  return (
    <>
      <Dialog open={prop.display} disableEscapeKeyDown={false}>
        <DialogTitle>{prop.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{prop.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={prop.onAgree}>Agree</Button>
          <Button onClick={prop.onDisagree}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export { Component as CommonConfirmComponent };
