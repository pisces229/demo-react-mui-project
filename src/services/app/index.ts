import {
  CommonOutputModel,
  CommonPagedQueryInputModel,
  CommonPagedQueryOutputModel,
} from "../model";
import {
  AppModel,
  AppResponseModel,
  AppQueryInputModel,
  AppQueryOutputModel,
} from "./model";

const createRow = () => ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
  (c) => {
    let r = Math.random() * 16 | 0;
    let v = (c === 'x' ? r : ((r & 0x3) | 0x8));
    return v.toString(16);
  }));

let mockDatas: AppModel[] = [];
for (let i = 0; i < 25; ++i) {
  mockDatas.push({
    row: createRow(),
    first: 'first',
    second: 'second',
  });
}

export const AppService = {
  route: (requestData: string) =>
    new Promise<AppResponseModel<boolean>>((resolve, reject) => {
      console.log(requestData);
      let response: AppResponseModel<boolean> = {
        data: true,
      };
      setTimeout(resolve, 1000, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  queryGrid: (requestData: CommonPagedQueryInputModel<AppQueryInputModel>) =>
    new Promise<AppResponseModel<CommonOutputModel<CommonPagedQueryOutputModel<AppQueryOutputModel>>>>((resolve, reject) => {
      console.log(requestData);
      let data = mockDatas.slice(
        requestData.page.pageSize * (requestData.page.pageNo - 1),
        requestData.page.pageSize * requestData.page.pageNo);
      let response: AppResponseModel<CommonOutputModel<CommonPagedQueryOutputModel<AppQueryOutputModel>>> = {
        data: {
          success: true,
          message: '',
          data: {
            data: data,
            totalCount: mockDatas.length,
          },
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  query: (requestData: string) =>
    new Promise<AppResponseModel<CommonOutputModel<AppQueryOutputModel>>>((resolve, reject) => {
      console.log(requestData);
      let data = mockDatas.find((p) => p.row === requestData);
      let response: AppResponseModel<CommonOutputModel<AppQueryOutputModel>> = {
        data: {
          success: !!data,
          message: !!data ? 'Success' : 'Fail',
          data: data!,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  create: (requestData: AppModel) =>
    new Promise<AppResponseModel<CommonOutputModel<AppQueryOutputModel>>>((resolve, reject) => {
      console.log(requestData);
      let data: AppModel = { ...requestData, row: createRow() };
      mockDatas.push(data);
      let response: AppResponseModel<CommonOutputModel<AppQueryOutputModel>> = {
        data: {
          success: true,
          message: 'Success',
          data: data,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  modify: (requestData: AppModel) =>
    new Promise<AppResponseModel<CommonOutputModel<AppQueryOutputModel>>>((resolve, reject) => {
      console.log(requestData);
      let data = mockDatas.find((o) => o.row === requestData.row);
      if (data) {
        mockDatas.splice(mockDatas.indexOf(data), 1, requestData);
      }
      let response: AppResponseModel<CommonOutputModel<AppQueryOutputModel>> = {
        data: {
          success: !!data,
          message: !!data ? 'Success' : 'Fail',
          data: data!,
        }
      };
      setTimeout(resolve, 500, response);
      // setTimeout(reject, 500, 'Promise Fail');
    }),
  remove: (requestData: string[]) =>
    new Promise<AppResponseModel<CommonOutputModel<string>>>((resolve, reject) => {
      console.log(requestData);
      requestData.forEach((v) => {
        let data = mockDatas.find((o) => o.row === v);
        if (data) {
          mockDatas.splice(mockDatas.indexOf(data), 1);
        }
      });
      let response: AppResponseModel<CommonOutputModel<string>> = {
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
