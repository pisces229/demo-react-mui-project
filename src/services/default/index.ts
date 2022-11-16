import { AuthenticateAxios, DefaultAxios } from "../axios";
import { DefaultDto } from "./dto";

const uuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
    (c) => {
      let r = Math.random() * 16 | 0;
      let v = (c === 'x' ? r : ((r & 0x3) | 0x8));
      return v.toString(16);
    });

export const DefaultService = {
  // Test
  success: () => new Promise<{ data: { Success: boolean, Message: string, Data: string } }>((resolve, reject) => {
    setTimeout(resolve, 1000, ({ data: { Success: true, Message: '', Data: uuid() } }));
    // setTimeout(reject, 1000, 'Promise');
  }),
  fail: () => new Promise<{ data: { Success: boolean, Message: string, Data: string } }>((resolve, reject) => {
    // setTimeout(resolve, 1000, { data: { Success: true, Message: '', Data: uuid() } });
    setTimeout(reject, 1000, 'Promise Fail');
  }),
  // success: () => DefaultAxios.get<{ Success: boolean, Message: string, Data: string }>(`https://localhost:9100/success`),
  // fail: () => DefaultAxios.get<{ Success: boolean, Message: string, Data: string }>(`https://localhost:9100/fail`),
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
