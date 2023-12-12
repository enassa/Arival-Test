import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import Landing from './pages/landing/Landing';
import { FallBack } from './components/fallback/FallBack';

// Lazy-loaded components
const TestForm = lazy(() => import('./pages/test-form/TestForm'));
const Success = lazy(() => import('./pages/success/Success'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={ROUTES.base.route}
          element={
              <Landing />
          }
        />
        <Route
          path={ROUTES.form.route}
          element={
            <Suspense fallback={<FallBack/>}>
              <TestForm />
            </Suspense>
          }
        />
        <Route
          path={ROUTES.success.route}
          element={
            <Suspense fallback={<FallBack/>}>
              <Success />
            </Suspense>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
