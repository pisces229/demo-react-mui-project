import { Fragment } from "react";
import { ScopeWrapper, ScopeItemWrapper, ScopeItemName, ScopeItemSize } from "./style";

const Component = (prop: { files: File[] }) => {
  const calculate = (size: number) => (size / 1024).toFixed(3);
  return (
    <>
      {prop.files && !!prop.files.length &&
      <ScopeWrapper>
        {prop.files.map((item, index) => (
          <Fragment key={index}>
            <ScopeItemWrapper>
              <ScopeItemName>{item.name}</ScopeItemName>
              <ScopeItemSize>{calculate(item.size)}{' KB'}</ScopeItemSize>
            </ScopeItemWrapper>
          </Fragment>
        ))}
      </ScopeWrapper>}
    </>

  )
}

export { Component as UploadPreviewComponent };
