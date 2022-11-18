const pageCount = (pageSize: number, totalCount?: number) => {
  if (totalCount) {
    return Math.ceil(totalCount / pageSize);
  } else {
    return 0;
  }
}

export const PaginationUtil = {
  pageCount,
};
