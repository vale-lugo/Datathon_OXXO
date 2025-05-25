import { useState } from 'react';
import VariableVisualizer from './VariableVisualizer';
import useDimTienda from '../../hooks/useDimTienda';

const variables = [
  { key: 'plaza_cve', label: 'Plaza', type: 'categorical' },
  { key: 'nivelsocioeconomico_des', label: 'Nivel Socioeconómico', type: 'categorical' },
  { key: 'entorno_des', label: 'Entorno', type: 'categorical' },
  { key: 'mts2ventas_num', label: 'Área de Ventas', type: 'numeric' },
  { key: 'puertasrefrig_num', label: 'Refrigeradores', type: 'numeric' },
  { key: 'cajonesestacionamiento_num', label: 'Estacionamiento', type: 'numeric' },
  { key: 'segmento_maestro_desc', label: 'Segmento', type: 'categorical' },
  { key: 'lid_ubicacion_tienda', label: 'Ubicación', type: 'categorical' },
  { key: 'competidores_num', label: 'Competidores', type: 'numeric' },
  { key: 'escuelas_num', label: 'Escuelas', type: 'numeric' },
  { key: 'hospitales_num', label: 'Hospitales', type: 'numeric' },
  { key: 'poblacion', label: 'Población', type: 'numeric' },
  { key: 'venta_total', label: 'Venta Total', type: 'numeric' },
  { key: 'meta_venta', label: 'Meta de Venta', type: 'numeric' },
];

export default function Exploracion() {
  const { data } = useDimTienda();
  const [selected, setSelected] = useState(variables[0]);

  return (
    <div className="text-white p-6 bg-zinc-800 h-screen">
      <h2 className="text-2xl font-bold mb-4">Exploración de Variables</h2>

      <select
        className="mb-6 p-2 bg-zinc-700 rounded text-white"
        value={selected.key}
        onChange={e => setSelected(variables.find(v => v.key === e.target.value))}
      >
        {variables.map(v => (
          <option key={v.key} value={v.key}>{v.label}</option>
        ))}
      </select>

      <VariableVisualizer data={data} variable={selected.key} type={selected.type} />
    </div>
  );
}
