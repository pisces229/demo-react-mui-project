import { useRef } from "react";
import { MeTabLoopWrapper, MeTabLoopStart, MeTabLoopEnd } from "./style";

export const TabLoopComponent = (props: { children: JSX.Element }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const getChildren = () => Array.prototype.slice
    .call(wrapperRef!.current!.querySelectorAll("[tabindex]"),1,-1)
    .filter((node: { disabled: boolean, tabIndex: number }) => !node.disabled && node.tabIndex !== -1);
  const onFocusStart = (event: React.FocusEvent<HTMLDivElement>) => {
    const tabChildren = getChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[tabChildren.length - 1].focus();
  };
  const onFocusEnd = (event: React.FocusEvent<HTMLDivElement>) => {
    const tabChildren = getChildren();
    tabChildren && tabChildren.length > 1 && tabChildren[0].focus();
  };
  return (
    <>
      <MeTabLoopWrapper ref={wrapperRef}>
        <MeTabLoopStart tabIndex={0} onFocus={onFocusStart} />
          {props.children}
        <MeTabLoopEnd tabIndex={0} onFocus={onFocusEnd} />
      </MeTabLoopWrapper>
    </>
  );
}
