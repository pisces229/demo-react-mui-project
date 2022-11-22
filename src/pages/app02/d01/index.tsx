import { Button } from "@mui/material";


export const App02D01Page = (props: {
  onClose: () => void
}) => {

  return (
    <>
      <h3>App02D01Page</h3>
      <Button variant="contained" onClick={() => props.onClose()}>
        Close Modal
      </Button>
    </>
  );
}
