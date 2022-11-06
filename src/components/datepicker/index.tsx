import { Box, ClickAwayListener, Popper, TextField } from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const YearMonthWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const YearMonthSelect = styled.select`
  font-size: 1.125rem;
  line-height: 1.5rem;
  border-radius: 0.2rem;
`;

const YearMonthChange = styled.div`
  font-size: 1.125rem;
  line-height: 1.5rem;
  width: 1.4rem;
  text-align: center;
  cursor: pointer;
  opacity: 0.4;
  outline: none;
  &:hover, &:focus {
    opacity: 1.0;
  }
`;

const WeekWrapper = styled.div`
  display: flex;
`;

const WeekItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const DateWrapper = styled.div`
  display: flex;
`;

const DateDefaultItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  cursor: pointer;
  &:hover {
    border-radius: 50%;
    background-color: LightGray;
  }
`;

const DateCurrentItem = styled(DateDefaultItem)`
  border-radius: 50%;
  background-color: LightGray;
`;

const DateOtherItem = styled(DateDefaultItem)`
  opacity: 0.4;
`;

const DateSpaceItem = styled.div`
  width: 1.4rem;
  font-size: 1.125rem;
  text-align: center;
  margin: 0.1rem;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
`;

const WeekTitleItems: string[] = ['日','一','二','三','四','五','六'];

const MonthOptions: { value: number, text: string }[] = [];
for (let i = 0; i < 12; i++) {
  let text = (i + 1).toString();
  if (text.length !== 2) {
    text = '0' + text;
  }
  MonthOptions.push({
    value: i,
    text: `${text}月`
  });
}

const Component = (props: {
  value: string,
  disabled?: boolean,
  hidden?: boolean,
  onChange: Function,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  useEffect(() => {
    if (open) {
      let defaultDate = new Date();
      if (props.value && open) {
        if (props.value.length === 7) {
          let date = new Date(
            Number(props.value.substring(0, 3)) + 1911,
            Number(props.value.substring(3, 5)) - 1,
            Number(props.value.substring(5, 7)));
          if (validateValue(props.value)) {
            setYearValue(date.getFullYear());
            setMonthValue(date.getMonth());
            setDateValue(date.getDate());
          } else {
            setYearValue(defaultDate.getFullYear());
            setMonthValue(defaultDate.getMonth());
            setDateValue(defaultDate.getDate());
          }
        } else {
          setYearValue(defaultDate.getFullYear());
          setMonthValue(defaultDate.getMonth());
          setDateValue(defaultDate.getDate());
        }
      } else {
        setYearValue(defaultDate.getFullYear());
        setMonthValue(defaultDate.getMonth());
        setDateValue(defaultDate.getDate());
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])
  const onFocusInput = (event: React.FocusEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setOpen(true);
  };
  const onClickAway = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  const [yearValue, setYearValue] = useState(1911);
  const [monthValue, setMonthValue] = useState(0);
  const [dateValue, setDateValue] = useState(0);
  const renderInput = () => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(event.target.value);
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
      <TextField
        inputProps={{ maxLength: 7 }}
        value={props.value}
        disabled={props.disabled}
        hidden={props.hidden}
        onChange={onChange}
        onFocus={onFocusInput}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
    );
  };
  const renderCalendar = () => {
    let yearsVelue = yearValue - 20;
    let yeareVelue = yearValue + 20;
    const YearOption: { value: number, text: string }[] = [];
    for (let i = yearsVelue; i < yeareVelue; i++) {
      let text = (i - 1911).toString();
      if (text.length !== 3) {
        text = '0' + text;
      }
      YearOption.push({
        value: i,
        text: `${text}年`
      });
    }
    let theMonthBegin = new Date(yearValue, monthValue, 0);
    let theMonthEnd = new Date(yearValue, monthValue + 1, 0);
    let theMonthDays = Math.round(Math.abs((theMonthEnd.getTime() - theMonthBegin.getTime()) / (24 * 60 * 60 * 1000)));
    let weekItems: Date[][] = [];
    weekItems.push([]);
    let firstDay = new Date(yearValue, monthValue, 1);
    for (let i = 0; i < firstDay.getDay(); i++) {
      weekItems[0].push(new Date(yearValue, monthValue, i - firstDay.getDay()));
    }
    for (let i = 1; i <= theMonthDays; i++) {
      if (weekItems[weekItems.length - 1].length === 7) {
        weekItems.push([]);
      }
      weekItems[weekItems.length - 1].push(new Date(yearValue, monthValue, i));
    }
    let lastDay = weekItems[weekItems.length - 1][weekItems[weekItems.length - 1].length - 1].getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      weekItems[weekItems.length - 1].push(new Date(yearValue, monthValue, theMonthDays + i));
    }
    let spaceItems: string[] = [];
    for (let i = weekItems.length; i < 6; i++) {
      spaceItems.push('');
    }
    const renderDateItem = (value: Date) => {
      return (
        <>
          {
            value.getFullYear() === yearValue &&
            value.getMonth() === monthValue &&
            value.getDate() !== dateValue &&
            <DateDefaultItem onClick={onClickDateItem(value)}>
              {value.getDate()}
            </DateDefaultItem>
          }
          {
            value.getFullYear() === yearValue &&
            value.getMonth() === monthValue &&
            value.getDate() === dateValue &&
            <DateCurrentItem tabIndex={0} onClick={onClickDateItem(value)}>
              {value.getDate()}
            </DateCurrentItem>
          }
          {
            (value.getFullYear() !== yearValue || value.getMonth() !== monthValue) &&
            <DateOtherItem onClick={onClickDateItem(value)}>
              {value.getDate()}
            </DateOtherItem>
          }
        </>
      );
    };
    const onClickDateItem = (value: Date) => () =>  {
      let year = '00' + (value.getFullYear() - 1911).toString();
      let month = '0' + (value.getMonth() + 1).toString();
      let date = '0' + value.getDate().toString();
      let changeValue = year.substring(year.length - 3, year.length)
        + month.substring(month.length - 2, month.length)
        + date.substring(date.length - 2, date.length);
      props.onChange(changeValue);
      onClickAway();
    };
    const onClickYearMonthChange = (value: number) => () => {
      if (monthValue + value < 0) {
        setMonthValue(11);
        setYearValue((state) => state - 1);
      } else if (monthValue + value > 11) {
        setMonthValue(0);
        setYearValue((state) => state + 1);
      } else {
        setMonthValue((state) => state + value);
      }
    };
    const onKeyboardYearMonthChange = (value: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      const eventKey = event.key;
      if (eventKey === 'Escape') {
        event.preventDefault();
        onClickAway();
      } else if (eventKey === 'Enter') {
        event.preventDefault();
        onClickYearMonthChange(value)();
      }
    };
    const onKeyboardYearMonthSelect = (event: React.KeyboardEvent<HTMLSelectElement>) => {
      const eventKey = event.key;
      if (eventKey === 'Escape') {
        event.preventDefault();
        onClickAway();
      }
    };
    return (
      <>
        <YearMonthWrapper>
          <YearMonthChange tabIndex={0}
            onClick={onClickYearMonthChange(-1)}
            onKeyDown={onKeyboardYearMonthChange(-1)}
          >◀</YearMonthChange>
          <YearMonthSelect tabIndex={0} value={yearValue}
            onChange={(e) => setYearValue(Number(e.target.value))}
            onKeyDown={onKeyboardYearMonthSelect}
          >
            {YearOption.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </YearMonthSelect>
          <YearMonthSelect tabIndex={0} value={monthValue}
            onChange={(e) => setMonthValue(Number(e.target.value))}
            onKeyDown={onKeyboardYearMonthSelect}
          >
            {MonthOptions.map((item, index) => (
              <option key={index} value={item.value}>
                {item.text}
              </option>
            ))}
          </YearMonthSelect>
          <YearMonthChange tabIndex={0}
            onClick={onClickYearMonthChange(1)}
            onKeyDown={onKeyboardYearMonthChange(1)}
          >▶</YearMonthChange>
        </YearMonthWrapper>
        <WeekWrapper>
          {WeekTitleItems.map((item, index) => (
            <WeekItem key={index}>{item}</WeekItem>
          ))}
        </WeekWrapper>
        {weekItems.map((items, index) => (
          <DateWrapper key={index}>
            {items.map((item, index) => (
              <Fragment key={index}>
                {renderDateItem(item)}
              </Fragment>
            ))}
          </DateWrapper>
        ))}
        {
          spaceItems.map((_, index) => (
            <DateWrapper key={index}><DateSpaceItem>&nbsp;</DateSpaceItem></DateWrapper>
          ))
        }
      </>
    );
  };
  const validateValue = (value: string) => {
    if (value.length === 7) {
      let date = new Date(
        Number(value.substring(0, 3)) + 1911,
        Number(value.substring(3, 5)) - 1,
        Number(value.substring(5, 7)));
      return date.toString() !== 'Invalid Date';
    } else {
      return false;
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
          {renderInput()}
          <Popper open={open} anchorEl={anchorEl} sx={{ zIndex: 999 }}>
            <Box sx={{
              border: 1,
              borderRadius: 1,
              p: 1,
              bgcolor: 'background.paper'
            }}>
              <TabLoopComponent>
                {renderCalendar()}
              </TabLoopComponent>
            </Box>
          </Popper>
        </Box>
      </ClickAwayListener>
    </>
  );
};

const TabLoopWrapper = styled.div`
  display: block;
`;
const TabLoopStart = styled.div`
  display: block;
`;
const TabLoopEnd = styled.div`
  display: block;
`;

const TabLoopComponent = (props: { children: JSX.Element }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getChildren = () => Array.prototype.slice
    .call(wrapperRef!.current!.querySelectorAll("[tabindex]"),1,-1)
    .filter((node: { disabled: boolean, tabIndex: number }) => !node.disabled && node.tabIndex !== -1);
  const onFocusStart = (event: React.FocusEvent<HTMLDivElement>) => {
    const tabChildren = getChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
  };
  const onFocusEnd = (event: React.FocusEvent<HTMLDivElement>) => {
    const tabChildren = getChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
  };
  return (
    <>
      <TabLoopWrapper ref={wrapperRef}>
        <TabLoopStart tabIndex={0} onFocus={onFocusStart} />
          {props.children}
        <TabLoopEnd tabIndex={0} onFocus={onFocusEnd} />
      </TabLoopWrapper>
    </>
  );
}

export { Component as DatepickerComponent };
