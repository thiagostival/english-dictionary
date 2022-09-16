import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';

// COMPONENTS
import { Router } from './Router';

// STYLES
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';

// CONTEXT
import { GlobalProvider } from './contexts/GlobalContext';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <GlobalProvider>
            <Router />
          </GlobalProvider>
        </BrowserRouter>

        <GlobalStyle />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
