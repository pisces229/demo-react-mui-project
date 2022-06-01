import { useNavigate } from 'react-router';

export function LoginPage() {
  const navigate = useNavigate();
  const onClickEntry = () => {
    navigate('/layout');
  };
  return (
    <>
      <h2>Login Page</h2>
      <button type="button" onClick={onClickEntry}>
        Entry
      </button>
    </>
  );
}
