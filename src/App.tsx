import './App.scss';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import globalTheme from './theme';
import { BrowserRouter } from 'react-router-dom';
import { MessageComponent } from './components/message';
import { ProgressComponent } from './components/progress';
import { RootRoute } from './routes';

export function App() {
  return (
    <React.StrictMode>
      <ThemeProvider theme={globalTheme}>
        <MessageComponent></MessageComponent>
        <ProgressComponent></ProgressComponent>
        <BrowserRouter>
          <RootRoute />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
}
