import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { StoreState } from '../stores/root.store';

const Component = () => {
  const state = useSelector((state: StoreState) => state.commonProgressReducer);
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={state.display}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </>
  );
};
export { Component as CommonProgressComponent };
