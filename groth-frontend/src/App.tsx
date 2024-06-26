import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './app.routes';
import { ColorModeContext, useMode } from './assets/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { Watchlist } from './pages/watchlist/watchlist';
import { LayoutComponent } from './components/layout/layout';
import { NewsComponent } from './pages/news/news';
import { SettingsComponents } from './pages/settings/settings';
import { Home } from './pages/home/home-page';
import { AuthRootComponent } from './components/auth/auth-root-component';

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='app'>
          <Routes>
            <Route element={<LayoutComponent />}>
              <Route element={<PrivateRouter />}>
                <Route path='/' element={<Home />} />
                <Route path='/news' element={<NewsComponent />} />
                <Route path='/settings' element={<SettingsComponents />} />
                <Route path='/watchlist' element={<Watchlist />} />
              </Route>
              <Route path='sign-in' element={<AuthRootComponent />} />
              <Route path='sign-up' element={<AuthRootComponent />} />
            </Route>
          </Routes>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
