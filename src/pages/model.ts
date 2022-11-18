export interface CommonPageModel {
  pageNo: number;
  pageSize: number;
  totalCount?: number;
}
export const initialCommonPageModel: CommonPageModel = {
  pageNo: 1,
  pageSize: 10,
}
export interface CommonModeModel {
  disable?: boolean;
  hidden?: boolean;
}
export interface CommonOptionModel {
  value: string;
  text: string;
  disable?: boolean;
}
