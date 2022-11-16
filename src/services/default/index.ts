import axios from "axios";
import { AuthenticateAxios, DefaultAxios } from "../axios";
import { DefaultDto } from "./dto";

export const DefaultService = {
  // Test
  run: () => axios.get<string>(`https://localhost:9012/`),
  free: () => DefaultAxios.get<string>(`/free`, {
    headers: {
      'Cache-Control': 'max-age=9999'
    },
  }),
  auth: () => AuthenticateAxios.get<string>(`/auth`),
  router: () => DefaultAxios.get<boolean>(`/router`),
  // Auth
  signIn: (postData: { Account: string; Password: string }) =>
    DefaultAxios.post<number>(`/signIn`, postData),
  validate: () => AuthenticateAxios.get(`/validate`),
  refresh: (postData: string) => DefaultAxios.post<number>(`/refresh`, JSON.stringify(postData)),
  signOut: () => DefaultAxios.post(`/signOut`),
  // Value
  valueFromQuery: (value: string) =>
    DefaultAxios.get<string>(`/valueFromQuery`, { params: { model: value } }),
  valueFromBody: (value: string) =>
    DefaultAxios.post<string>(`/valueFromBody`, value),
  jsonFromQuery: (value: DefaultDto) =>
    DefaultAxios.get<DefaultDto>(`/jsonFromQuery`, {
      params: value,
    }),
  jsonFromBody: (value: DefaultDto) =>
    DefaultAxios.post<DefaultDto>(`/jsonFromBody`, value),
  download: () => DefaultAxios.get<Blob>(`/download`, { responseType: 'blob' }),
  upload: (value: FormData) => AuthenticateAxios.post<string>(`/upload`, value),
};
