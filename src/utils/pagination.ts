import { CommonPageModel } from "../pages/model";

export const PaginationUtilPageCount = (page: CommonPageModel) => {
  if (page.TotalCount) {
    return Math.ceil(page.TotalCount / page.PageSize);
  } else {
    return 0;
  }
}
