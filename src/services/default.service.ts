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
  free: () => CommonAxios.get<string>(`/Free`),
  auth: () => CommonAuthAxios.get<string>(`/Auth`),
  // Auth
  signIn: (postData: { Account: string; Password: string }) =>
    CommonAxios.post<number>(`/SignIn`, postData),
  validate: () => CommonAuthAxios.get(`/Validate`),
  refresh: (postData: number) => CommonAxios.post<number>(`/Refresh`, postData),
  signOut: () => CommonAxios.post(`/SignOut`),
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
};
