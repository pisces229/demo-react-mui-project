export const CheckboxUtilAllChecked = (list: string[], values: string[]) => {
  return values.length > 0 && list.length === values.length && values.filter((f) => !list.includes(f)).length === 0;
}
export const CheckboxUtilAllChange = (values: string[], checked: boolean) => {
  return checked ? values : [];
}
export const CheckboxUtilChecked = (values: string[], value: string) => {
  return values.includes(value);
}
export const CheckboxUtilChange = (values: string[], checked: boolean, value: string) => {
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
