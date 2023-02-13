import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import PokeDetails from './pages/PokeDetails';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:name" element={<PokeDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
