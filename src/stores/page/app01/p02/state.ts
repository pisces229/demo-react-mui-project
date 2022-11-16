export enum App01P02Action {
  Empty,
  Create,
  Modify,
}
export interface App01P02ActionEditState {
  row: string;
}
export const initApp01P02ActionEditState: App01P02ActionEditState = {
  row: '',
};
