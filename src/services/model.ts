export interface CommonOptionOutputModel {
  value: string;
  text: string;
}
export interface CommonPageInputModel {
  pageNo: number;
  pageSize: number;
}
export interface CommonPagedQueryInputModel<T> {
  data: T;
  page: CommonPageInputModel;
}
export interface CommonPagedQueryOutputModel<T> {
  data: T[];
  totalCount: number;
}
export interface CommonOutputModel<T> {
  success: boolean;
  message: string;
  data: T;
}
