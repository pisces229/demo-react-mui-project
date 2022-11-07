export function CheckboxUtilAllChecked (list: string[], values: string[]) {
  return values.length > 0 && list.length === values.length && values.filter((f) => !list.includes(f)).length === 0;
}
export function CheckboxUtilAllChange (values: string[], checked: boolean) {
  return checked ? values : [];
}
export function CheckboxUtilChecked (values: string[], value: string) {
  return values.includes(value);
}
export function CheckboxUtilChange (values: string[], checked: boolean, value: string) {
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
