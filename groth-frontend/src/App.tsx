import { Home } from './app/components/home/home-page';
import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './app.routes';
import { AuthRootComponent } from './app/auth/auth-root-component';
import { ColorModeContext, useMode } from './assets/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { LayoutComponent } from './app/components/layout/layout';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LayoutComponent>
          <div className='app'>
            <Routes>
              <Route element={<PrivateRouter />}>
                <Route path='/' element={<Home />} />
              </Route>
              <Route path='sign-in' element={<AuthRootComponent />} />
              <Route path='sign-up' element={<AuthRootComponent />} />
            </Routes>
          </div>
        </LayoutComponent>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
