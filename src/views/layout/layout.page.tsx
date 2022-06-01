import { Outlet, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTE_LOGIN } from '../../routes/login.route';
import { DefaultService } from '../../services/default.service';

const Menu = styled.ul`
  padding: 0px;
`;

const MenuItem = styled.li`
  display: inline;
  padding: 5px;
`;

export function LayoutPage() {
  const navigate = useNavigate();
  const onClickSignIn = async () => {
    await DefaultService.signIn({ Account: 'Account', Password: 'Password' })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem('token', response.data.toString());
        }
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.signIn.finally`));
  };
  const onClickValidate = async () => {
    await DefaultService.validate()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.validate.finally`));
  };
  const onClickRefresh = async () => {
    if (localStorage.getItem('token')) {
      await DefaultService.refresh(parseInt(localStorage.getItem('token')!))
        .then((response) => console.log(response))
        .catch((error) => console.log(error))
        .finally(() => console.log(`DefaultService.refresh.finally`));
    }
  };
  const onClickSignOut = async () => {
    await DefaultService.signOut()
      .then((response) => {
        console.log(response);
        localStorage.removeItem('token');
      })
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.signOut.finally`));
  };
  const onClickFree = async () => {
    await DefaultService.free()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.free.finally`));
  };
  const onClickAuth = async () => {
    await DefaultService.auth()
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => console.log(`DefaultService.auth.finally`));
  };
  const onClickQuit = async () => {
    navigate(ROUTE_LOGIN);
  };
  return (
    <>
      <h2>Default Layout</h2>
      <nav>
        <Menu>
          <MenuItem>
            <Link to="">Home</Link>
          </MenuItem>
          <MenuItem>
            <Link to="app01">App01</Link>
          </MenuItem>
          <MenuItem>
            <Link to="app01/unknown">App01Unknown</Link>
          </MenuItem>
          <MenuItem>
            <Link to="app02">App02</Link>
          </MenuItem>
          <MenuItem>
            <Link to="app02/unknown">App02Unknown</Link>
          </MenuItem>
        </Menu>
      </nav>
      <button type="button" onClick={onClickSignIn}>
        SignIn
      </button>
      <button type="button" onClick={onClickValidate}>
        Validate
      </button>
      <button type="button" onClick={onClickRefresh}>
        Refresh
      </button>
      <button type="button" onClick={onClickSignOut}>
        SignOut
      </button>
      <button type="button" onClick={onClickFree}>
        Free
      </button>
      <button type="button" onClick={onClickAuth}>
        Auth
      </button>
      <button type="button" onClick={onClickQuit}>
        Quit
      </button>
      <Outlet />
    </>
  );
}
