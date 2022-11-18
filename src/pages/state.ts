export interface CommonPageState {
  pageNo: number;
  pageSize: number;
}
export const initialCommonPageState: CommonPageState = {
  pageNo: 1,
  pageSize: 10,
}
export interface CommonModeState {
  disable?: boolean;
  hidden?: boolean;
}
export interface CommonOptionState {
  value: string;
  text: string;
  disable?: boolean;
}
