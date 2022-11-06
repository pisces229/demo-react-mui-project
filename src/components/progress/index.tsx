import { Backdrop, CircularProgress } from '@mui/material';
import { useProgressComponentStore } from '../../stores/component/progress';

const Component = () => {
  const display = useProgressComponentStore((state) => (state.display));
  return (
    <>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme: { zIndex: { drawer: number } }) =>
            theme.zIndex.drawer + 1,
        }}
        open={display}
      >
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </>
  );
};
export { Component as ProgressComponent };
