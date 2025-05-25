import { useState } from 'react';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import useDimTienda from '../../hooks/useDimTienda';
import useVenta from '../../hooks/useVenta';
import OxxoStore from '../../assets/oxxo_store.svg';
import Sidebar from '../../components/Sidebar';

export default function Mapa({ filters }) {
  const { data: tiendas, loading } = useDimTienda();
  const [selectedTienda, setSelectedTienda] = useState(null);

  const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;

  const filteredTiendas = tiendas.filter((tienda) => {
    return (
      (filters.plaza === "" || tienda.plaza_cve === filters.plaza) &&
      (filters.nivel === "" || tienda.nivelsocioeconomico_des === filters.nivel) &&
      (filters.entorno === "" || tienda.entorno_des === filters.entorno) &&
      (filters.segmento === "" || tienda.segmento_maestro_desc === filters.segmento) &&
      (filters.ubicacion === "" || tienda.lid_ubicacion_tienda === filters.ubicacion)
    );
  });

  const { data: ventaData } = useVenta();

  const filteredVentas = selectedTienda
  ? ventaData
      .filter(v => v.tienda_id === selectedTienda.tienda_id)
      .sort((a, b) => a.mes_id - b.mes_id)
  : [];


  const chartData = filteredVentas.map(v => ({
    mes: String(v.mes_id).replace(/^(\d{4})(\d{2})$/, '$2/$1'), // '202407' => '07/2024'
    venta: v.venta_total
  }));

  if (loading) return <p>Loading map...</p>;


  return (
    <>
      <Map
        initialViewState={{
          longitude: -100.30,
          latitude: 25.64,
          zoom: 13,
          pitch: 60, // Tilt the map
          bearing: 0
        }}
        style={{ width: '100%', height: '600px' }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={mapboxToken}
        onLoad={(event) => {
          const map = event.target;

          map.addLayer({
            id: '3d-buildings',
            source: 'composite',
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 13,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': ['get', 'height'],
              'fill-extrusion-base': ['get', 'min_height'],
              'fill-extrusion-opacity': 0.9,
            },
          });
        }}
      >
        {filteredTiendas.map((tienda) => (
            <Marker
              key={tienda.tienda_id}
              longitude={parseFloat(tienda.longitud_num)}
              latitude={parseFloat(tienda.latitud_num)}
              onClick={() => setSelectedTienda(tienda)}
            >
              <div style={{ cursor: 'pointer' }}>
                <img
                  src={OxxoStore}
                  alt="OXXO Store"
                  style={{ width: '30px', height: '30px' }}
                />
              </div>
            </Marker>
          ))}
      </Map>
      {selectedTienda && (
        <Sidebar selectedTienda={selectedTienda} setSelectedTienda={setSelectedTienda} chartData={chartData} />
      )}
    </>
  );
}
