import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { MessageComponent } from './components/message';
import { ProgressComponent } from './components/progress';
import { RootRoute } from './routes';
import React from 'react';

export function App() {
  return (
    <React.StrictMode>
      {/* <h1>Demo React MUI Project App</h1> */}
      <MessageComponent></MessageComponent>
      <ProgressComponent></ProgressComponent>
      <BrowserRouter>
        <RootRoute />
      </BrowserRouter>
    </React.StrictMode>
  );
}
