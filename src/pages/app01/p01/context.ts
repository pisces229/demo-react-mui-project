import { createContext, Dispatch, SetStateAction } from "react";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { CommonPageModel, initialCommonPageModel } from "../../model";
import { FormModel, GridModel, initialFormModel } from "./model";

interface PageContextModel {
  action?: App01P01Action;
  setAction: Dispatch<SetStateAction<App01P01Action>>;
  form: FormModel;
  setForm: Dispatch<SetStateAction<FormModel>>;
  gridPage: CommonPageModel;
  setGridPage: Dispatch<SetStateAction<CommonPageModel>>;
  grid: GridModel[];
  setGrid: Dispatch<SetStateAction<GridModel[]>>;
}
export const PageContext = createContext<PageContextModel>({
  setAction: () => {},
  form: initialFormModel,
  setForm: () => {},
  gridPage: initialCommonPageModel,
  setGridPage: () => {},
  grid: [],
  setGrid: () => {},
});
