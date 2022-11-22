import './style.ts';
import { First } from "./first";
import { Second } from "./second";
import { ScopeH2, ScopeTextField, scopeTheme } from './style';
import { TextField, ThemeProvider } from '@mui/material';

export function App02P03Page() {
  return (
    <>
      <h3>Style</h3>
      <ScopeH2>Index</ScopeH2>
      <First/>
      <Second/>
      <h3>globalTheme TextField</h3>
      <TextField></TextField>
      <h3>scopeTheme TextField</h3>
      <ThemeProvider theme={scopeTheme}>
        <TextField></TextField>
      </ThemeProvider>
      <h3>ScopeTextField</h3>
      <ScopeTextField></ScopeTextField>
    </>
  );
}
