// Haversine formula to calculate distance in meters
export function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get all tiendas within a given radius
export function getNearbyTiendas(lat, lon, tiendas, radiusMeters = 300) {
  return tiendas.filter(t => {
    const d = haversine(
      lat,
      lon,
      parseFloat(t.latitud_num),
      parseFloat(t.longitud_num)
    );
    return d <= radiusMeters;
  });
}

// Estimate most frequent field values
export function estimateFieldsFromNearby(lat, lon, tiendas, radiusMeters = 300) {
  const nearby = getNearbyTiendas(lat, lon, tiendas, radiusMeters);
  if (nearby.length === 0) return null;

  const mode = arr => {
    const freq = {};
    for (const v of arr) freq[v] = (freq[v] || 0) + 1;
    return Object.entries(freq).reduce((a, b) => b[1] > a[1] ? b : a)[0];
  };

  return {
    entorno_des: mode(nearby.map(t => t.entorno_des)),
    segmento_maestro_desc: mode(nearby.map(t => t.segmento_maestro_desc)),
    nivelsocioeconomico_des: mode(nearby.map(t => t.nivelsocioeconomico_des)),
    plaza_cve: mode(nearby.map(t => t.plaza_cve.toString())),
    lid_ubicacion_tienda: mode(nearby.map(t => t.lid_ubicacion_tienda)),
    mts2ventas_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.mts2ventas_num), 0) / nearby.length),
    puertasrefrig_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.puertasrefrig_num), 0) / nearby.length),
    cajonesestacionamiento_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.cajonesestacionamiento_num), 0) / nearby.length),
    poblacion: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.poblacion), 0) / nearby.length),
    competidores_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.competidores_num), 0) / nearby.length),
    escuelas_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.escuelas_num), 0) / nearby.length),
    hospitales_num: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.hospitales_num), 0) / nearby.length),
    venta_total: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.venta_total), 0) / nearby.length),
    meta_venta: Math.round(nearby.reduce((sum, t) => sum + parseFloat(t.meta_venta), 0) / nearby.length),
    
  };
}
