import { authenticateAxios, defaultAxios } from "../axios";
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
  // success: () => defaultAxios.get<{ Success: boolean, Message: string, Data: string }>(`https://localhost:9100/success`),
  // fail: () => defaultAxios.get<{ Success: boolean, Message: string, Data: string }>(`https://localhost:9100/fail`),
  free: () => defaultAxios.get<string>(`/free`, {
    headers: {
      'Cache-Control': 'max-age=9999'
    },
  }),
  auth: () => authenticateAxios.get<string>(`/auth`),
  router: () => defaultAxios.get<boolean>(`/router`),
  // Auth
  signIn: (postData: { Account: string; Password: string }) =>
    defaultAxios.post<number>(`/signIn`, postData),
  validate: () => authenticateAxios.get(`/validate`),
  refresh: (postData: string) => defaultAxios.post<number>(`/refresh`, JSON.stringify(postData)),
  signOut: () => defaultAxios.post(`/signOut`),
  // Value
  valueFromQuery: (value: string) =>
    defaultAxios.get<string>(`/valueFromQuery`, { params: { model: value } }),
  valueFromBody: (value: string) =>
    defaultAxios.post<string>(`/valueFromBody`, value),
  jsonFromQuery: (value: DefaultDto) =>
    defaultAxios.get<DefaultDto>(`/jsonFromQuery`, {
      params: value,
    }),
  jsonFromBody: (value: DefaultDto) =>
    defaultAxios.post<DefaultDto>(`/jsonFromBody`, value),
  download: () => defaultAxios.get<Blob>(`/download`, { responseType: 'blob' }),
  upload: (value: FormData) => authenticateAxios.post<string>(`/upload`, value),
};
