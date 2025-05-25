export default function Filtros({ filters, setFilters }) {
    const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-zinc-800 text-gray-100 flex flex-col w-1/4 h-screen m-8">
      <h1 className="font-bold text-4xl pb-8">Filtros</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
            <label htmlFor="plaza">Plaza</label>
            <select id="plaza" className="bg-zinc-700 text-gray-100 p-2 rounded" value={filters.plaza}   onChange={(e) => handleChange("plaza", e.target.value)}>
                <option value="">Selecciona una plaza</option>
                <option value="1">Plaza 1</option>
                <option value="2">Plaza 2</option>
                <option value="3">Plaza 3</option>
                <option value="4">Plaza 4</option>
                <option value="5">Plaza 5</option>
                <option value="6">Plaza 6</option>
            </select>
            </div>
            <div className="flex flex-col">
            <label htmlFor="nivel">Nivel Socioeconómico</label>
            <select id="nivel" className="bg-zinc-700 text-gray-100 p-2 rounded" value={filters.nivel} onChange={(e) => handleChange("nivel", e.target.value)}>
                <option value="">Selecciona un nivel</option>
                <option value="A">A</option>
                <option value="AB">AB</option>
                <option value="B">B</option>
                <option value="BC">BC</option>
                <option value="C">C</option>
                <option value="CD">CD</option>
                <option value="D">D</option>
            </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="entorno">Entorno</label>
                <select id="entorno" className="bg-zinc-700 text-gray-100 p-2 rounded" value={filters.entorno} onChange={(e) => handleChange("entorno", e.target.value)}>
                    <option value="">Selecciona un entorno</option>
                    <option value="Base">Base</option>
                    <option value="Hogar">Hogar</option>
                    <option value="Peatonal">Peatonal</option>
                    <option value="Receso">Receso</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="segmento">Segmento</label>
                <select id="segmento" className="bg-zinc-700 text-gray-100 p-2 rounded" value={filters.segmento} onChange={(e) => handleChange("segmento", e.target.value)}>
                    <option value="">Selecciona un segmento</option>
                    <option value="Hogar Reunion">Hogar Reunion</option>
                    <option value="Oficinistas">Oficinistas</option>
                    <option value="Clásico">Clásico</option>
                    <option value="Barrio Competido">Barrio Competido</option>
                    <option value="Parada Técnica">Parada Técnica</option>
                    <option value="NA">N/A</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label htmlFor="ubicacion">Ubicación</label>
                <select id="ubicacion" className="bg-zinc-700 text-gray-100 p-2 rounded" value={filters.ubicacion} onChange={(e) => handleChange("ubicacion", e.target.value)}>
                    <option value="">Selecciona una ubicación</option>
                    <option value="UT_CARRETERA_GAS">Carretera Gas</option>
                    <option value="UT_TRAFICO_VEHICULAR">Trafico Vehicular</option>
                    <option value="UT_DENSIDAD">Densidad</option>
                    <option value="UT_TRAFICO_PEATONAL">Trafico Peatonal</option>
                    <option value="UT_GAS_URBANA">Gas Urbana</option>
                </select>
            </div>
            <button onClick={() => setFilters({ plaza: '', nivel: '', entorno: '', segmento: '', ubicacion: ''}) } className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Limpiar filtros
            </button>
        </div>
    </div>
  );
}
