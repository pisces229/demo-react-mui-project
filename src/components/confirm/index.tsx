import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';

const Component = (props: {
  display: boolean;
  title: string;
  message: string;
  agree: string;
  disagree: string;
  onAgree: () => void;
  onDisagree: () => void;
}) => {
  return (
    <>
      <Dialog
        open={props.display} 
        disableEscapeKeyDown={false}
      >
        {props.title && <DialogTitle sx={{ minWidth: '300px' }}>{props.title}</DialogTitle>}
        <DialogContent sx={{ minWidth: '300px' }}>
          <DialogContentText sx={{ fontSize: '1rem', fontWeight: 'bold' }}>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onAgree}>{props.agree}</Button>
          <Button onClick={props.onDisagree}>{props.disagree}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export { Component as ConfirmComponent };
