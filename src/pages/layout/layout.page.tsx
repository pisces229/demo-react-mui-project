import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { ROUTE_LOGIN } from '../../routes/login.route';

export function LayoutPage() {
  const navigate = useNavigate();
  const onClickSignOut = () => {
    navigate(ROUTE_LOGIN);
  };
  return (
    <>
      <h2>Default Layout</h2>
      <nav>
        <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="app01/p01">App01P01</Link>
          </li>
          <li>
            <Link to="app01/p02">App01P02</Link>
          </li>
          <li>
            <Link to="app01/unknown">Unknown</Link>
          </li>
        </ul>
      </nav>
      <button type="button" onClick={onClickSignOut}>
        Sign Out
      </button>
      <Outlet />
    </>
  );
}
