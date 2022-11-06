import { createContext, Dispatch, SetStateAction } from "react";
import { App02P04Action } from "../../../stores/page/app02/p04/state";

interface PageContextModel {
  back?: string;
  setBack: Dispatch<SetStateAction<string>>;
  action?: App02P04Action;
  setAction: Dispatch<SetStateAction<App02P04Action>>;
}
export const PageContext = createContext<PageContextModel>({
  setBack: () => {},
  setAction: () => {},
});
