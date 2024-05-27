import { Home } from './app/components/home/home-page';
import { Route, Routes } from 'react-router-dom';
import { PrivateRouter } from './app.routes';
import { AuthRootComponent } from './app/auth/auth-root-component';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='sign-in' element={<AuthRootComponent />} />
        <Route path='sign-up' element={<AuthRootComponent />} />
      </Routes>
    </div>
  );
}

export default App;
