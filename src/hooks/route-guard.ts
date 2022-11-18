import { useEffect, useRef, useState } from "react";
import { AppService } from "../services/app";
import { useProgressComponentStore } from "../stores/component/progress";

export function useRouteGuard(value: string) {
  const [state, setSate] = useState<boolean>(false);
  const initialRef = useRef(false);
  useEffect(() => {
    if (!initialRef.current) {
      initialRef.current = true;
      useProgressComponentStore.getState().open();
      AppService.route(value)
      .then((response) => setSate(response.data))
      .finally(() => useProgressComponentStore.getState().close());
    }
  }, [value]);
  return state;
}
