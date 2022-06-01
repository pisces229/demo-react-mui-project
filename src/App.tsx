import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { RootRoute } from './routes/root.route';
import { store } from './stores/root.store';

export function App() {
  return (
    <>
      {/* <h1>Demo React MUI Project App</h1> */}
      {/* <Provider store={store}> */}
      <BrowserRouter>
        <RootRoute />
      </BrowserRouter>
      {/* </Provider> */}
    </>
  );
}
