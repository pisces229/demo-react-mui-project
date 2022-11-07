import { Fragment } from "react";
import { Wrapper, ItemWrapper, ItemName, ItemSize } from "./style";

const Component = (prop: { files: File[] }) => {
  const calculate = (size: number) => (size / 1024).toFixed(3);
  return (
    <Wrapper>
      {prop.files.map((item, index) => (
        <Fragment key={index}>
          <ItemWrapper>
            <ItemName>{item.name}</ItemName>
            <ItemSize>{calculate(item.size)}{' KB'}</ItemSize>
          </ItemWrapper>
        </Fragment>
      ))}
    </Wrapper>
  )
}

export { Component as UploadPreviewComponent };
