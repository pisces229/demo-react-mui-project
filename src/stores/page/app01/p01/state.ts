export enum App01P01Action {
  Empty,
  Query,
}
export interface App01P01ActionQueryState {
  first: string;
  second: string;
}
export const initApp01P01ActionQueryState: App01P01ActionQueryState = {
  first: '',
  second: '',
}
