import { Link } from 'react-router-dom';
import LogoOxxo from '../assets/logo_oxxo.png';

export default function Navbar() {
  return (
    <div className="bg-zinc-900 text-gray-100 flex">
      <div>
        <Link to="/">
          <img src={LogoOxxo} alt="Logo OXXO" className="h-15 m-4" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/" className="text-white hover:text-gray-300 m-4">
          Mapa
        </Link>
        <Link to="/location" className="text-white hover:text-gray-300 m-4">
          Ubicación
        </Link>
        <Link to="/ventas" className="text-white hover:text-gray-300 m-4">
          Ventas
        </Link>
        <Link to="/exploracion" className="text-white hover:text-gray-300 m-4">
          Exploración
        </Link>
      </div>
    </div>
  );
}
