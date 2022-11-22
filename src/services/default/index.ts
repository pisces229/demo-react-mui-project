import { authenticateAxios, defaultAxios } from "../axios";
import { CommonOutputModel, CommonPagedQueryInputModel, CommonPagedQueryOutputModel } from "../model";
import { DefaultJsonInputModel, DefaultJsonOutputModel, DefaultSignInInputModel } from "./model";

const controller = 'default';

export const DefaultService = {
  signIn: (postData: DefaultSignInInputModel) =>
    defaultAxios.post<CommonOutputModel<string>>(
    `/${controller}/signIn`,
    postData),
  validate: () =>
    authenticateAxios.get(
    `/${controller}/validate`),
  refresh: (postData: string) =>
    defaultAxios.post<CommonOutputModel<string>>(
    `/${controller}/refresh`,
    JSON.stringify(postData)),
  signOut: () =>
    defaultAxios.post(
    `/${controller}/signOut`),

  valueHttpGet: (value: string) =>
    authenticateAxios.get<string>(
    `/${controller}/valueHttpGet`,
    { params: { inputModel: value } }),
  valueHttpPost: (value: string) =>
    authenticateAxios.post<string>(
    `/${controller}/valueHttpPost`,
    value),
  jsonHttpGet: (value: DefaultJsonInputModel) =>
    authenticateAxios.get<CommonOutputModel<DefaultJsonOutputModel>>(
    `/${controller}/jsonHttpGet`,
    { params: value }),
  jsonHttpPost: (value: DefaultJsonInputModel) =>
    authenticateAxios.post<CommonOutputModel<DefaultJsonOutputModel>>(
    `/${controller}/jsonHttpPost`,
    value),
  commonPagedQuery: (value: CommonPagedQueryInputModel<DefaultJsonInputModel>) =>
    authenticateAxios.post<CommonPagedQueryOutputModel<DefaultJsonOutputModel>>(
    `/${controller}/commonPagedQuery`,
    value),
  download: () =>
    authenticateAxios.get<Blob>(
    `/${controller}/download`,
    { responseType: 'blob' }),
  upload: (value: FormData) =>
    authenticateAxios.post<string>(
    `/${controller}/upload`,
    value),
};
