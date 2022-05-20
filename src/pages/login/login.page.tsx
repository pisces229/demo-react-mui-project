import { useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const onClickSignIn = () => {
    navigate('/layout');
  };
  return (
    <>
      <h2>Login Page</h2>
      <button type="button" onClick={onClickSignIn}>
        Sign In
      </button>
    </>
  );
}
