import { authenticateAxios, defaultAxios } from "../axios";
import { DefaultJsonInputModel } from "./model";

export const DefaultService = {
  valueFromQuery: (value: string) =>
    defaultAxios.get<string>(`/valueFromQuery`, { params: { model: value } }),
  valueFromBody: (value: string) =>
    defaultAxios.post<string>(`/valueFromBody`, value),
  jsonFromQuery: (value: DefaultJsonInputModel) =>
    defaultAxios.get<DefaultJsonInputModel>(`/jsonFromQuery`, {
      params: value,
    }),
  jsonFromBody: (value: DefaultJsonInputModel) =>
    defaultAxios.post<DefaultJsonInputModel>(`/jsonFromBody`, value),
  download: () => defaultAxios.get<Blob>(`/download`, { responseType: 'blob' }),
  upload: (value: FormData) => authenticateAxios.post<string>(`/upload`, value),

  signIn: (postData: { Account: string; Password: string }) =>
    defaultAxios.post<number>(`/signIn`, postData),
  validate: () => authenticateAxios.get(`/validate`),
  refresh: (postData: string) => defaultAxios.post<number>(`/refresh`, JSON.stringify(postData)),
  signOut: () => defaultAxios.post(`/signOut`),

  auth: () => authenticateAxios.get<string>(`/auth`),
  router: () => defaultAxios.get<boolean>(`/router`),

  free: () => defaultAxios.get<string>(`/free`, {
    headers: {
      'Cache-Control': 'max-age=9999'
    },
  }),
};
