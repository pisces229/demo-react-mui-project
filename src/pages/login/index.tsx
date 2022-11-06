import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTE_HOME } from '../../routes/path';

export function LoginPage() {
  const navigate = useNavigate();
  const onClickEntry = () => {
    navigate(ROUTE_HOME);
  };
  return (
    <>
      <h2>Login Page</h2>
      <Button variant="contained" onClick={onClickEntry}>
        Entry
      </Button>
    </>
  );
}
