import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { CommonMessageComponent } from './components/common-message.component';
import { CommonProgressComponent } from './components/common-progress.component';
import { RootRoute } from './routes/root.route';
import { store } from './stores/root.store';

export function App() {
  return (
    <>
      {/* <h1>Demo React MUI Project App</h1> */}
      <Provider store={store}>
        <CommonMessageComponent></CommonMessageComponent>
        <CommonProgressComponent></CommonProgressComponent>
        <BrowserRouter>
          <RootRoute />
        </BrowserRouter>
      </Provider>
    </>
  );
}
