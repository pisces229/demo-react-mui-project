import { Alert, Snackbar } from '@mui/material';
import { useMessageComponentStore } from '../../stores/component/message';

// severity : "success" | "error" | "info" | "warning"

const Component = () => {
  const store = useMessageComponentStore();
  return (
    <>
      <Snackbar
        open={store.display}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={store.close}
      >
        <Alert onClose={store.close} severity={store.severity}>
          {store.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export { Component as MessageComponent };
