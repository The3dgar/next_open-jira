import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { darkTheme, lightTheme } from './theme';
import { UIProvider } from '@/context/ui';

export default function App({ Component, pageProps }: AppProps) {
  const theme = false ? lightTheme : darkTheme;
  return (
    <UIProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </UIProvider>
  );
}
