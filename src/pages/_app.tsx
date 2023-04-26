import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { darkTheme, lightTheme } from './theme';
import { UIProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  const theme = false ? lightTheme : darkTheme;
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
  );
}
