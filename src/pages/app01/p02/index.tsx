import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE_APP01 } from "../../../routes/app01/path";
import { useApp01P02ActionStore } from "../../../stores/page/app01/p02";
import { App01P02Action } from "../../../stores/page/app01/p02/state";
import { PageContext } from "./context";
import { PageForm } from "./form";
import { FormModel, initialFormModel } from "./model";

export function App01P02Page() {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [action, setAction] = useState<App01P02Action>(App01P02Action.Empty);
  const [form, setForm] = useState<FormModel>(initialFormModel);
  const actionState = useApp01P02ActionStore();
  useEffect(() => {
    switch (actionState.action) {
      case App01P02Action.Create: {
        setAction(App01P02Action.Create);
        setForm({ ...actionState.editState! });
        // do something
        break;
      }
      case App01P02Action.Modify: {
        setAction(App01P02Action.Modify);
        setForm({ ...actionState.editState! });
        // do something
        break;
      }
      default: {
        navigate(ROUTE_APP01.P01);
        break;
      }
    }
    actionState.setAction();
    setDisplay(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2>APP01 Page</h2>
      {display &&
      <PageContext.Provider value={{
        action, setAction,
        form, setForm
      }}>
        <PageForm />
      </PageContext.Provider>}
    </>
  );
}
