const allChecked = (list: string[], values: string[]) => {
  return values.length > 0 && list.length === values.length && values.filter((f) => !list.includes(f)).length === 0;
}

const allChange = (values: string[], checked: boolean) => {
  return checked ? values : [];
}

const checked = (values: string[], value: string) => {
  return values.includes(value);
}

const change = (values: string[], checked: boolean, value: string) => {
  if (checked) {
    if (values.includes(value)) {
      return values;
    } else {
      return values.concat(value);
    }
  } else {
    if (!values.includes(value)) {
      return values;
    } else {
      return values.filter((f) => f !== value);
    }
  }
}

export const CheckboxUtil = {
  allChecked,
  allChange,
  checked,
  change,
};
