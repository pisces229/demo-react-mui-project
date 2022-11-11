export const validateValue = (value: string) => {
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
