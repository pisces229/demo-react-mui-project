import { Alert, Snackbar } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { commonMessageClose } from '../stores/common-message.store';
import { StoreState } from '../stores/root.store';

const Component = () => {
  const state = useSelector((state: StoreState) => state.commonMessageReducer);
  const dispatch = useDispatch();
  const onClickClose = async () => {
    dispatch(commonMessageClose());
  };
  return (
    <>
      <Snackbar
        open={state.display}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={2000}
        onClose={onClickClose}
      >
        <Alert onClose={onClickClose} severity="success">
          {state.message}
        </Alert>
      </Snackbar>
    </>
  );
};
export { Component as CommonMessageComponent };
