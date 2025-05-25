import { useState } from 'react';
import Mapa from './Mapa';
import Filtros from './Filtros';

export default function Index() {
  const [filters, setFilters] = useState({
    plaza: '',
    nivel: '',
    entorno: '',
    segmento: '',
    ubicacion: '',
  });

  return (
    <div className="flex bg-zinc-800 h-full">
        <Filtros filters={filters} setFilters={setFilters} />
        <Mapa filters={filters} />
    </div>
  );
}
