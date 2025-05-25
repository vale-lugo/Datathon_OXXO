import VentaChart from "./VentaChart";

export default function Sidebar({ selectedTienda, setSelectedTienda, chartData }) {
    const isValid = (value) => {
        return value !== null && value !== 0 && value !== 'NA' && value !== 'N/A' && value !== '0';
    };

    if (!selectedTienda) return null;
    return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-zinc-900 text-white shadow-lg z-50 p-6 overflow-y-auto transition-all duration-300">
        <button onClick={() => setSelectedTienda(null)} className="absolute top-2 right-2 text-gray-300 hover:text-white text-xl" >
            &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Tienda #{selectedTienda.tienda_id}</h2>
        <p><strong>Plaza:</strong> {selectedTienda.plaza_cve}</p>
        <p><strong>Nivel Socioeconómico:</strong> {selectedTienda.nivelsocioeconomico_des}</p>
        <p><strong>Entorno:</strong> {selectedTienda.entorno_des}</p>
        <p><strong>Segmento:</strong> {selectedTienda.segmento_maestro_desc}</p>
        {isValid(selectedTienda.mts2ventas_num) && (
            <p><strong>Área:</strong> {selectedTienda.mts2ventas_num} m²</p>
        )}
        {isValid(selectedTienda.puertasrefrig_num) && (
            <p><strong>Refrigeradores:</strong> {selectedTienda.puertasrefrig_num}</p>
        )}
        {isValid(selectedTienda.cajonesestacionamiento_num) && (
            <p><strong>Estacionamiento:</strong> {selectedTienda.cajonesestacionamiento_num}</p>
        )}
        <p><strong>Ubicación:</strong> {selectedTienda.lid_ubicacion_tienda}</p>
        <p><strong>Venta Total:</strong> ${Math.round(selectedTienda.venta_total*100000).toLocaleString('es-MX')} MXN</p>
        <p><strong>Meta de Venta:</strong> ${(selectedTienda.meta_venta*100000).toLocaleString('es-MX')} MXN</p>
        <p><strong>¿Cumple la meta?</strong> {selectedTienda.above_goal ? '✅ Sí' : '❌ No'}</p>
        <p><strong>Porcentaje de Meta:</strong> {Math.round(selectedTienda.percentage_of_goal)}%</p>
        <p><strong>Población:</strong> {(selectedTienda.poblacion).toLocaleString('es-MX')}</p>
        {isValid(selectedTienda.competidores_num) && (
            <p><strong>Competidores:</strong> {selectedTienda.competidores_num}</p>
        )}
        {isValid(selectedTienda.escuelas_num) && (
            <p><strong>Escuelas:</strong> {selectedTienda.escuelas_num}</p>
        )}
        {isValid(selectedTienda.hospitales_num) && (
            <p><strong>Hospitales:</strong> {selectedTienda.hospitales_num}</p>
        )}
        <a
        href={`https://www.google.com/maps/search/?api=1&query=${selectedTienda.latitud_num},${selectedTienda.longitud_num}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline mt-2 inline-block"
        >
        Ver en Google Maps
        </a>

        <h3 className="text-lg font-bold mt-6 mb-2">Ventas mensuales</h3>
        <VentaChart data={chartData} />
    </div>
    );
}