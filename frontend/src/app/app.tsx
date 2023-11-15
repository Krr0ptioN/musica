import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
