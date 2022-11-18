export interface AppDto {
}

export interface AppResponseDto<T> {
  data: T;
}

export interface AppMockData {
  row: string;
  first: string;
  second: string;
}

export interface AppQueryInputDto {
  first: string;
  second: string;
}
