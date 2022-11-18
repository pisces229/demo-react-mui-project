import { CommonPageModel } from "../pages/model";

const pageCount = (page: CommonPageModel) => {
  if (page.totalCount) {
    return Math.ceil(page.totalCount / page.pageSize);
  } else {
    return 0;
  }
}

export const PaginationUtil = {
  pageCount,
};
