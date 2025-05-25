import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Mapa from './pages/Mapa/Index';
import Location from './pages/Location/Index';
import Ventas from './pages/Ventas/Index';
import Exploracion from './pages/Exploracion/Index';

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/location" element={<Location />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/exploracion" element={<Exploracion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
