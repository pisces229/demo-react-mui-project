import { AxiosResponse } from "axios";

export const FileUtilListToArray = (fileList: FileList | null) => {
  let result: File[] = [];
  if (fileList) {
    for (let i = 0; i < fileList!.length; ++i) {
      if (fileList.item(i)) {
        result.push(fileList.item(i)!);
      }
    }
  }
  return result;
};
export const FileUtilDownload = async (response: AxiosResponse<Blob, any>) => {
  console.log(response);
  if (response.headers['content-type'] !== 'text/plain; charset=utf-8') {
    const contentDispositionValues =
      response.headers['content-disposition']?.split(';');
    let filename = 'download';
    contentDispositionValues?.forEach((f) => {
      if (f.indexOf('filename') > -1) {
        let texts = f.split('=');
        if (texts.length > 1) {
          filename = decodeURIComponent(texts[1]);
        }
      }
    });
    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([response.data]));
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return Promise.resolve('');
  } else {
    console.log(response);
    return Promise.resolve(response.data);
  }
};
