import { Box, ClickAwayListener, SxProps } from '@mui/material';
import React from 'react';

const Component = () => {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };
  const styles: SxProps = {
    position: 'absolute',
    top: 28,
    right: 0,
    left: 0,
    zIndex: 10,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  };
  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Box sx={{ position: 'relative' }}>
          <input type="text" size={10} />
          <button type="button" onClick={handleClick}>@</button>
          {open ? (
            <Box sx={styles}>
              Click me, I will stay visible until you click outside.
            </Box>
          ) : null}
        </Box>
      </ClickAwayListener>
    </>
  );
};
export { Component as CommonClickAwayComponent };
