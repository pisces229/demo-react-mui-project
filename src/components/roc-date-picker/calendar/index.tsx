import {
  ScopeCalendarWrapper,
  ScopeCalendarTop,
  ScopeYearMonthChange,
  ScopeYearMonthSelect,
  ScopePickerWrapper,
  ScopeWeekWrapper,
  ScopeWeekItem,
  ScopeDateWrapper,
  ScopeDateDefaultItem,
  ScopeDateCurrentItem,
  ScopeDateOtherItem,
  ScopeDateSpaceItem,
 } from "./style";
 import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Fragment, useEffect, useState } from "react";
import { validateValue } from "../util";

const YearOption: { value: number, text: string }[] = [];
for (let i = 1911; i < 2100; i++) {
  let text = (i - 1911).toString();
  if (text.length === 1) {
    text = '00' + text;
  } else if (text.length === 2) {
    text = '0' + text;
  }
  YearOption.push({
    value: i,
    text: `${text}年`
  });
}

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

export function Calendar(props: {
  value: string,
  onChange: (value: string) => void,
  onClickAway: () => void,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pickerYear, setPickerYear] = useState(new Date().getFullYear());
  const [pickerMonth, setPickerMonth] = useState(new Date().getMonth());
  const [dateItems, setDateItems] = useState<Date[][]>([]);
  const [spaceItems, setSpaceItems] = useState<string[]>([]);
  useEffect(() => {
    if (props.value.length === 7) {
      let date = new Date(
        Number(props.value.substring(0, 3)) + 1911,
        Number(props.value.substring(3, 5)) - 1,
        Number(props.value.substring(5, 7)));
      if (validateValue(props.value)) {
        setCurrentDate(date);
        setPickerYear(date.getFullYear());
        setPickerMonth(date.getMonth());
      }
    }
  }, [props.value]);
  useEffect(() => {
    let theMonthBegin = new Date(pickerYear, pickerMonth, 0);
    let theMonthEnd = new Date(pickerYear, pickerMonth + 1, 0);
    let theMonthDays = Math.round(Math.abs((theMonthEnd.getTime() - theMonthBegin.getTime()) / (24 * 60 * 60 * 1000)));
    let theDateItems: Date[][] = [];
    theDateItems.push([]);
    let firstDay = new Date(pickerYear, pickerMonth, 1);
    for (let i = 0; i < firstDay.getDay(); i++) {
      theDateItems[0].push(new Date(pickerYear, pickerMonth, i - firstDay.getDay()));
    }
    for (let i = 1; i <= theMonthDays; i++) {
      if (theDateItems[theDateItems.length - 1].length === 7) {
        theDateItems.push([]);
      }
      theDateItems[theDateItems.length - 1].push(new Date(pickerYear, pickerMonth, i));
    }
    let lastDay = theDateItems[theDateItems.length - 1][theDateItems[theDateItems.length - 1].length - 1].getDay();
    for (let i = 1; i < 7 - lastDay; i++) {
      theDateItems[theDateItems.length - 1].push(new Date(pickerYear, pickerMonth, theMonthDays + i));
    }
    let theSpaceItems: string[] = [];
    for (let i = theDateItems.length; i < 6; i++) {
      theSpaceItems.push('');
    }
    setDateItems(theDateItems);
    setSpaceItems(theSpaceItems);
  }, [pickerYear, pickerMonth]);
  const renderDateItem = (value: Date) => {
    return (
      <>
        {
          value.toDateString() === currentDate.toDateString() &&
          <ScopeDateCurrentItem tabIndex={0} onClick={onClickDateItem(value)}>
            {value.getDate()}
          </ScopeDateCurrentItem>
        }
        {
          value.toDateString() !== currentDate.toDateString() &&
          (value.getFullYear() === pickerYear && value.getMonth() === pickerMonth) &&
          <ScopeDateDefaultItem onClick={onClickDateItem(value)}>
            {value.getDate()}
          </ScopeDateDefaultItem>
        }
        {
          value.toDateString() !== currentDate.toDateString() &&
          !(value.getFullYear() === pickerYear && value.getMonth() === pickerMonth) &&
          <ScopeDateOtherItem onClick={onClickDateItem(value)}>
            {value.getDate()}
          </ScopeDateOtherItem>
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
    props.onClickAway();
  };
  const onClickYearMonthChange = (value: number) => () => {
    if (pickerMonth + value < 0) {
      setPickerMonth(11);
      setPickerYear((state) => state - 1);
    } else if (pickerMonth + value > 11) {
      setPickerMonth(0);
      setPickerYear((state) => state + 1);
    } else {
      setPickerMonth((state) => state + value);
    }
  };
  const onKeyboardYearMonthChange = (value: number) => (event: React.KeyboardEvent<HTMLDivElement>) => {
    const eventKey = event.key;
    if (eventKey === 'Escape') {
      event.preventDefault();
      props.onClickAway();
    } else if (eventKey === 'Enter') {
      event.preventDefault();
      onClickYearMonthChange(value)();
    }
  };
  const onKeyboardYearMonthSelect = (event: React.KeyboardEvent<HTMLSelectElement>) => {
    const eventKey = event.key;
    if (eventKey === 'Escape') {
      event.preventDefault();
      props.onClickAway();
    }
  };
  return (
    <ScopeCalendarWrapper>
      <ScopeCalendarTop>
        <ScopeYearMonthChange tabIndex={0}
          onClick={onClickYearMonthChange(-1)}
          onKeyDown={onKeyboardYearMonthChange(-1)}
        >
          <NavigateBeforeIcon />
        </ScopeYearMonthChange>
        <ScopeYearMonthSelect tabIndex={0} value={pickerYear}
          onChange={(e) => setPickerYear(Number(e.target.value))}
          onKeyDown={onKeyboardYearMonthSelect}
        >
          {YearOption.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </ScopeYearMonthSelect>
        <ScopeYearMonthSelect tabIndex={0} value={pickerMonth}
          onChange={(e) => setPickerMonth(Number(e.target.value))}
          onKeyDown={onKeyboardYearMonthSelect}
        >
          {MonthOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.text}
            </option>
          ))}
        </ScopeYearMonthSelect>
        <ScopeYearMonthChange tabIndex={0}
          onClick={onClickYearMonthChange(1)}
          onKeyDown={onKeyboardYearMonthChange(1)}
        >
          <NavigateNextIcon />
        </ScopeYearMonthChange>
      </ScopeCalendarTop>
      <ScopePickerWrapper>
        <ScopeWeekWrapper>
          {WeekTitleItems.map((item, index) => (
            <ScopeWeekItem key={index}>{item}</ScopeWeekItem>
          ))}
        </ScopeWeekWrapper>
        {dateItems.map((items, index) => (
          <ScopeDateWrapper key={index}>
            {items.map((item, index) => (
              <Fragment key={index}>
                {renderDateItem(item)}
              </Fragment>
            ))}
          </ScopeDateWrapper>
        ))}
        {
          spaceItems.map((_, index) => (
            <ScopeDateWrapper key={index}>
              <ScopeDateSpaceItem>&nbsp;</ScopeDateSpaceItem>
            </ScopeDateWrapper>
          ))
        }
      </ScopePickerWrapper>
    </ScopeCalendarWrapper>
  );
}
