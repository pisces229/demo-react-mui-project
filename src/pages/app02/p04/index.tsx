import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ROUTE } from "../../../routes/route";
import { useApp02P04ActionStore } from "../../../stores/page/app02/p04";
import { App02P04Action } from "../../../stores/page/app02/p04/state";
import { PageContext } from "./context";
import { PageForm } from "./form";

export const App02P04Page = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState<boolean>(false);
  const [back, setBack] = useState<string>('');
  const [action, setAction] = useState<App02P04Action>(App02P04Action.Empty);
  const actionState = useApp02P04ActionStore();
  useEffect(() => {
    switch (actionState.action) {
      case App02P04Action.Run: {
        setBack(actionState.back!);
        setAction(App02P04Action.Run);
        break;
      }
      default: {
        navigate(ROUTE.HOME);
      }
    }
    actionState.setBack();
    actionState.setAction();
    setDisplay(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <h3>Back</h3>
      {display &&
      <PageContext.Provider value={{
        back, setBack,
        action, setAction
      }}>
        <PageForm />
      </PageContext.Provider>}
    </>
  );
}
