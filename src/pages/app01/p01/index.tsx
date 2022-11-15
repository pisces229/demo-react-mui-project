import { useEffect, useState } from "react";
import { useApp01P01ActionStore } from "../../../stores/page/app01/p01";
import { App01P01Action } from "../../../stores/page/app01/p01/state";
import { PageContext } from "./context";
import { FormModel, initialFormModel, GridModel } from "./model";
import { PageForm } from "./form";
import { PageGrid } from "./grid";
import { CommonPageModel, initialCommonPageModel } from "../../model";

export function App01P01Page() {
  const [display, setDisplay] = useState<boolean>(false);
  const [action, setAction] = useState<App01P01Action>(App01P01Action.Empty);
  const [form, setForm] = useState<FormModel>(initialFormModel);
  const [gridPage, setGridPage] = useState<CommonPageModel>(initialCommonPageModel);
  const [grid, setGrid] = useState<GridModel[]>([]);
  const actionStore = useApp01P01ActionStore();
  useEffect(() => {
    console.log('App01P01Page.init.MOUNTED');
    switch (actionStore.action) {
      case App01P01Action.Query: {
        setAction(App01P01Action.Query);
        setForm({ ...actionStore.queryState! });
        setDisplay(true);
        break;
      }
      default: {
        setAction(App01P01Action.Empty);
        setDisplay(true);
        break;
      }
    }
    return () => {
      console.log('App01P01Page.init.UNMOUNTED');
      actionStore.setAction();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <h2>App01P01Page</h2>
      {display &&
      <PageContext.Provider value={{
        action, setAction,
        form, setForm,
        gridPage, setGridPage,
        grid, setGrid,
      }}>
        <PageForm/>
        {gridPage.TotalCount && <PageGrid/>}
      </PageContext.Provider>}
    </>
  );
}
