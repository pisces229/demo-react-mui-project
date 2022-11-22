import { Backdrop, CircularProgress } from '@mui/material';
import { useProgressComponentStore } from '../../stores/component/progress';
import { scopeStyle } from './style';

const Component = () => {
  const display = useProgressComponentStore((state) => (state.display));
  return (
    <>
      <Backdrop sx={scopeStyle} open={display}>
        <CircularProgress color="inherit" size={100} />
      </Backdrop>
    </>
  );
};
export { Component as ProgressComponent };
