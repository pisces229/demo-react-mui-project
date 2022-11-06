import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { MessageComponent } from './components/message';
import { ProgressComponent } from './components/progress';
import { RootRoute } from './routes';

export function App() {
  return (
    <>
      {/* <h1>Demo React MUI Project App</h1> */}
      <MessageComponent></MessageComponent>
      <ProgressComponent></ProgressComponent>
      <BrowserRouter>
        <RootRoute />
      </BrowserRouter>
    </>
  );
}
