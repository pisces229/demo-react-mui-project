export interface CommonPageModel {
  PageNo: number;
  PageSize: number;
  TotalCount?: number;
}
export const initialCommonPageModel: CommonPageModel = {
  PageNo: 1,
  PageSize: 10,
}
export interface CommonModeModel {
  Disable?: boolean;
  Hidden?: boolean;
}
export interface CommonOptionModel {
  Value: string;
  Text: string;
  Disable?: boolean;
}
