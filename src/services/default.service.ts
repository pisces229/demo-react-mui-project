import { CommonAuthAxios } from '../common/common-auth-axios';
import { CommonAxios } from '../common/common-axios';
// AjaxModel
export interface DefaultAjaxModel {}
export interface DefaultAjaxJsonFromModel {
  Text: string;
  Value: number;
  Date: Date;
}
// Service
export const DefaultService = {
  // Test
  free: () => CommonAxios.get<string>(`/free`),
  auth: () => CommonAuthAxios.get<string>(`/auth`),
  // Auth
  signIn: (postData: { Account: string; Password: string }) =>
    CommonAxios.post<number>(`/signIn`, postData),
  validate: () => CommonAuthAxios.get(`/validate`),
  refresh: (postData: number) => CommonAxios.post<number>(`/refresh`, postData),
  signOut: () => CommonAxios.post(`/signOut`),
  // Value
  valueFromQuery: (value: string) =>
    CommonAxios.get<string>(`/valueFromQuery`, { params: { model: value } }),
  valueFromBody: (value: string) =>
    CommonAxios.post<string>(`/valueFromBody`, value),
  jsonFromQuery: (value: DefaultAjaxJsonFromModel) =>
    CommonAxios.get<DefaultAjaxJsonFromModel>(`/jsonFromQuery`, {
      params: value,
    }),
  jsonFromBody: (value: DefaultAjaxJsonFromModel) =>
    CommonAxios.post<DefaultAjaxJsonFromModel>(`/jsonFromBody`, value),
  download: () => CommonAxios.get<Blob>(`/download`),
  upload: (value: FormData) => CommonAuthAxios.post<string>(`/upload`, value),
};
