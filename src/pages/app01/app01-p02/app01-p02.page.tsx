import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useCommonConstructor } from '../../../hooks/common.hook';
import { ROUTE_APP01 } from '../../../routes/app01.route';
import {
  actionCommand,
  actionForm,
} from '../../../stores/app01/app01-p02/app01-p02.store';
import { StoreState } from '../../../stores/root.store';

export function App01P02Page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storeCommand = useSelector(
    (state: StoreState) => state.app01p02.command,
  );
  const [form, setForm] = useState({
    ...useSelector((state: StoreState) => state.app01p02.form),
  });
  useCommonConstructor(() => {
    console.log('App01P02Page.useCommonConstructor');
    // dispatch(action(''));
    // dispatch(setForm({ ...form }));
    console.log(`action:[${storeCommand}]`);
    if (!storeCommand) {
      setForm({
        name: '',
        count: 0,
      });
    } else {
      setTimeout(() => {
        setForm({
          name: 'App01P02Page',
          count: new Date().getTime(),
        });
      }, 3000);
    }
  });
  useEffect(() => {
    console.log('App01P02Page.mounted');
    // dispatch(actionCommand(''));
    return () => {
      console.log('App01P02Page.unmounted');
    };
  }, []);
  const onClickPage = () => {
    dispatch(actionCommand(ROUTE_APP01.P02));
    dispatch(actionForm({ ...form }));
    navigate(ROUTE_APP01.P01);
  };
  return (
    <>
      <h3>App01 P02 Page</h3>
      <button type="button" onClick={onClickPage}>
        P01
      </button>
      <br />
      <input
        type="text"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
      />
      <br />
      <input
        type="text"
        value={form.count}
        onChange={(event) =>
          setForm({ ...form, count: parseInt(event.target.value) })
        }
      />
    </>
  );
}
