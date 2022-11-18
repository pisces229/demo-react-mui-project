import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
import { ROUTE } from '../../routes/route';

export function LoginPage() {
  const navigate = useNavigate();
  const onClickEntry = () => {
    navigate(ROUTE.HOME);
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
