export interface CommonOptionDto {
  value: string;
  text: string;
}
export interface CommonPageDto {
  pageNo: number;
  pageSize: number;
  totalCount?: number;
}
export interface CommonPagedQueryDto<T> {
  page: CommonPageDto;
  data: T;
}
export interface CommonOutputDto<T> {
  success: boolean;
  message: string;
  data: T;
}
