export const FileListToFileArray = (fileList: FileList | null) => {
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
