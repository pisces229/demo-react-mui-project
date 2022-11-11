import { createContext, Dispatch, SetStateAction } from "react";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { FormModel, initialFormModel } from "./model";

interface ContextModel {
  action?: App01P02Action;
  setAction: Dispatch<SetStateAction<App01P02Action>>;
  form: FormModel;
  setForm: Dispatch<SetStateAction<FormModel>>;
}
export const PageContext = createContext<ContextModel>({
  setAction: () => {},
  form: initialFormModel,
  setForm: () => {},
});
