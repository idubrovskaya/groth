import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './app.routes';
import { ColorModeContext, useMode } from './assets/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { WatchListPage } from './pages/watchlist/watchlist';
import { LayoutComponent } from './components/layout/layout';
import { NewsPage } from './pages/news/news';
import { SettingsPage } from './pages/settings/settings';
import { Home } from './pages/home/home-page';
import { AuthRootComponent } from './components/auth/auth-root-component';
import { SingleAssetPage } from './pages/single-asset/single-asset';

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
                <Route path='/news' element={<NewsPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/watchlist' element={<WatchListPage />} />
                <Route path='/single/:id' element={<SingleAssetPage />} />
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
