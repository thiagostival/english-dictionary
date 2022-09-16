import { Routes, Route } from 'react-router-dom';

// COMPONENTS
import { Home } from './pages/Home';

export function Router() {
  return (
    <Routes>
      <Route path="/">
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
