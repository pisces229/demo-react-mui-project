import { authenticateAxios, defaultAxios } from "../axios";
import { CommonOutputModel, CommonPagedQueryInputModel, CommonPagedQueryOutputModel } from "../model";
import { DefaultDownloadInputModel, DefaultJsonInputModel, DefaultJsonOutputModel, DefaultJsonPageInputModel, DefaultSignInInputModel } from "./model";

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
      postData),
  signOut: (postData: string) =>
    defaultAxios.post(
      `/${controller}/signOut`,
      postData),

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
  commonPagedQueryGet: (value: DefaultJsonPageInputModel) =>
    authenticateAxios.get<CommonPagedQueryOutputModel<DefaultJsonOutputModel>>(
      `/${controller}/commonPagedQueryGet`,
      { params: value }),
  commonPagedQueryPost: (value: CommonPagedQueryInputModel<DefaultJsonInputModel>) =>
    authenticateAxios.post<CommonPagedQueryOutputModel<DefaultJsonOutputModel>>(
      `/${controller}/commonPagedQueryPost`,
      value),
  download: (value: DefaultDownloadInputModel) =>
    authenticateAxios.post<Blob>(
      `/${controller}/download`,
      value,
      { responseType: 'blob' }),
  upload: (value: FormData) =>
    authenticateAxios.post<CommonOutputModel<string>>(
      `/${controller}/upload`,
      value),
};
