export interface CommonOptionModel {
  Value: string;
  Text: string;
}
export interface CommonModeModel {
  Enable?: boolean;
  Hidden?: boolean;
}
export interface CommonPageModel {
  PageNo: number;
  PageSize: number;
  TotalCount?: number;
}
export interface CommonAjaxOutputModel<T> {
  Success: boolean;
  Message: string;
  Data: T;
}
export interface CommonAjaxPageModel<T> {
  Data: T;
  Page: CommonPageModel;
}
