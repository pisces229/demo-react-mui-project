import { Alert, Snackbar } from '@mui/material';
import { useMessageComponentStore } from '../../stores/component/message';

const Component = () => {
  const messageState = useMessageComponentStore((state) => ({display: state.display, message: state.message}));
  const messageClose = useMessageComponentStore((state) => (state.close));
  return (
    <>
      <Snackbar
        open={messageState.display}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={messageClose}
      >
        <Alert onClose={messageClose} severity="success">
          {messageState.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export { Component as MessageComponent };
