export interface CommonOptionDto {
  Value: string;
  Text: string;
}
export interface CommonPageDto {
  PageNo: number;
  PageSize: number;
  TotalCount?: number;
}
export interface CommonPagedQueryDto<T> {
  Data: T;
  Page: CommonPageDto;
}
export interface CommonOutputDto<T> {
  Success: boolean;
  Message: string;
  Data: T;
}
