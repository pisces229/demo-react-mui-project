import { MeIcon } from "./style";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, ClickAwayListener, Popper, TextField } from "@mui/material";
import { TabLoopComponent } from "./tab-loop";
import { useState, useRef } from "react";
import { validateValue } from "./util";
import { Calendar } from "./calendar";

const Component = (props: {
  value: string,
  disabled?: boolean,
  hidden?: boolean,
  onChange: (value: string) => {},
}) => {
  const textFieldRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const onClickAway = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const onClickIcon = () => {
    if (!open) {
      inputRef.current?.focus();
      if (!anchorEl) {
        setAnchorEl(anchorEl ? null : textFieldRef.current);
        setOpen(true);
      }
    } else {
      setAnchorEl(null);
      setOpen(false);
    }
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^\d/.test(event.target.value)) {
      props.onChange(event.target.value);
    } else {
      props.onChange('');
    }
  };
  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (validateValue(event.target.value)) {
      props.onChange(event.target.value);
    } else {
      props.onChange('');
    }
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const eventKey = event.key;
    if (eventKey === 'Tab') {
      onClickAway();
    }
  };
  return (
    <>
      <ClickAwayListener onClickAway={onClickAway}>
        <Box sx={{
          position: 'relative',
          display: 'inline-block',
          width: 'auto',
        }}>
          <TextField
            ref={textFieldRef}
            inputRef={inputRef}
            inputProps={{ maxLength: 7, size: 17, }}
            value={props.value}
            disabled={props.disabled}
            hidden={props.hidden}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            InputProps={{
              endAdornment: (
                <MeIcon onClick={onClickIcon}>
                  <CalendarMonthIcon sx={{ opacity: 0.6 }} />
                </MeIcon>
              ),
            }}
            />
          <Popper open={open} anchorEl={anchorEl} sx={{ zIndex: 999 }}>
            <Box sx={{
              border: 1.5,
              borderRadius: 1,
              p: 1,
              borderColor: 'LightGray',
              bgcolor: 'background.paper',
            }}>
              <TabLoopComponent>
                <Calendar value={props.value} onChange={props.onChange} onClickAway={onClickAway}></Calendar>
              </TabLoopComponent>
            </Box>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
}

export { Component as RocDatePickerComponent };
