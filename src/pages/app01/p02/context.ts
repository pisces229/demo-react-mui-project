import { createContext, Dispatch, SetStateAction } from "react";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { FormModel, initialFormModel } from "./model";

interface PageContextModel {
  action?: App01P02Action;
  setAction: Dispatch<SetStateAction<App01P02Action>>;
  form: FormModel;
  setForm: Dispatch<SetStateAction<FormModel>>;
}
export const PageContext = createContext<PageContextModel>({
  setAction: () => {},
  form: initialFormModel,
  setForm: () => {},
});
