import {
  CommonOutputDto,
  CommonPagedQueryDto,
} from "../dto";
import {
  AppResponseDto,
  AppMockData,
  AppQueryInputDto,
} from "./dto";

const createRow = () => ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  (c) => {
    let r = Math.random() * 16 | 0;
    let v = (c === 'x' ? r : ((r & 0x3) | 0x8));
    return v.toString(16);
  }));

let mockDatas: AppMockData[] = [];
for (let i = 0; i < 25; ++i) {
  mockDatas.push({
    row: createRow(),
    first: 'first',
    second: 'second',
  });
}

export const AppService = {
  route: (request: string) =>
    new Promise<AppResponseDto<boolean>>((resolve, reject) => {
      console.log(request);
      let response: AppResponseDto<boolean> = {
        data: true,
      };
      setTimeout(resolve, 1000, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  queryGrid: (request: CommonPagedQueryDto<AppQueryInputDto>) =>
    new Promise<AppResponseDto<CommonOutputDto<CommonPagedQueryDto<AppMockData[]>>>>((resolve, reject) => {
      console.log(request);
      let data = mockDatas.slice(
        request.page.pageSize * (request.page.pageNo - 1),
        request.page.pageSize * request.page.pageNo);
      let response: AppResponseDto<CommonOutputDto<CommonPagedQueryDto<AppMockData[]>>> = {
        data: {
          success: true,
          message: '',
          data: {
            page: {
              pageNo: request.page.pageNo,
              pageSize: request.page.pageSize,
              totalCount: mockDatas.length,
            },
            data: data,
          },
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  query: (request: string) =>
    new Promise<AppResponseDto<CommonOutputDto<AppMockData>>>((resolve, reject) => {
      console.log(request);
      let data = mockDatas.find((p) => p.row === request);
      let response: AppResponseDto<CommonOutputDto<AppMockData>> = {
        data: {
          success: !!data,
          message: !!data ? 'Success' : 'Fail',
          data: data!,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  create: (request: AppMockData) =>
    new Promise<AppResponseDto<CommonOutputDto<AppMockData>>>((resolve, reject) => {
      console.log(request);
      let data: AppMockData = { ...request, row: createRow() };
      mockDatas.push(data);
      let response: AppResponseDto<CommonOutputDto<AppMockData>> = {
        data: {
          success: true,
          message: 'Success',
          data: data,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  modify: (request: AppMockData) =>
    new Promise<AppResponseDto<CommonOutputDto<AppMockData>>>((resolve, reject) => {
      console.log(request);
      let data = mockDatas.find((o) => o.row === request.row);
      if (data) {
        mockDatas.splice(mockDatas.indexOf(data), 1, request);
      }
      let response: AppResponseDto<CommonOutputDto<AppMockData>> = {
        data: {
          success: !!data,
          message: !!data ? 'Success' : 'Fail',
          data: data!,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  remove: (request: string[]) =>
    new Promise<AppResponseDto<CommonOutputDto<AppMockData>>>((resolve, reject) => {
      console.log(request);
      request.forEach((v) => {
        let data = mockDatas.find((o) => o.row === v);
        if (data) {
          mockDatas.splice(mockDatas.indexOf(data), 1);
        }
      });
      let response: AppResponseDto<CommonOutputDto<string>> = {
        data: {
          success: true,
          message: 'Success',
          data: '',
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  };
