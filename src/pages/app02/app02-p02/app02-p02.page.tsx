import { useNavigate } from 'react-router';

export function App02P02Page() {
  const navigate = useNavigate();
  const onClickPage = () => {
    // navigate(ROUTE_PATH.APP02_P01);
  };
  return (
    <>
      <h3>App02 P01 Page</h3>
      <button type="button" onClick={onClickPage}>
        P01
      </button>
    </>
  );
}
