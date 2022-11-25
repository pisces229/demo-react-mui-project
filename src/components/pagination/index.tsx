import { Pagination } from "@mui/material";
import { CommonPageState } from "../../pages/state";

const pageCount = (pageSize: number, totalCount?: number) => {
  if (totalCount) {
    return Math.ceil(totalCount / pageSize);
  } else {
    return 0;
  }
}

const Component = (props: {
	page: CommonPageState,
	totalCount: number,
	onChange: (page: CommonPageState) => void,
}) => {
	return (
		<>
			<Pagination variant="outlined" shape="rounded"
				// count={100}
				count={pageCount(props.page.pageSize, props.totalCount)}
				page={props.page.pageNo}
				onChange={async (event, page) => props.onChange({ ...props.page, pageNo: page })}
			></Pagination>
		</>
	);
}
export { Component as PaginationComponent };