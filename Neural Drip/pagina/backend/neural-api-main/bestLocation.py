from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
from shapely.ops import unary_union
from math import radians, cos, sin, asin, sqrt

# Cargar el DataFrame df_train
df_train = pd.read_csv('df_tienda_limpia.csv')

# ----------------------------
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radio Tierra en km
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
    return 2 * R * asin(sqrt(a))

# ----------------------------
def optimizar_ubicacion_max_distancia(df_oxxos, lat_centro, lon_centro, radio_km=2.0, grid_spacing_m=200):
    # Crear GeoDataFrame con OXXOs
    gdf = gpd.GeoDataFrame(df_oxxos.copy(),
                           geometry=gpd.points_from_xy(df_oxxos['LONGITUD_NUM'], df_oxxos['LATITUD_NUM']),
                           crs='EPSG:4326')

    # Crear punto central y buffer (en proyección métrica para precisión)
    centro = Point(lon_centro, lat_centro)
    centro_proj = gpd.GeoSeries([centro], crs='EPSG:4326').to_crs(epsg=3857)
    buffer_proj = centro_proj.buffer(radio_km * 1000).iloc[0]
    buffer = gpd.GeoSeries([buffer_proj], crs='EPSG:3857').to_crs(epsg=4326).iloc[0]

    # Filtrar OXXOs dentro del buffer
    oxxos_zona = gdf[gdf.geometry.within(buffer)]
    if oxxos_zona.empty:
        print("No hay OXXOs dentro del área.")
        return None

    # Crear grilla de puntos candidatos dentro del buffer (en proyección métrica)
    minx, miny, maxx, maxy = buffer_proj.bounds
    x_coords = np.arange(minx, maxx, grid_spacing_m)
    y_coords = np.arange(miny, maxy, grid_spacing_m)

    puntos_candidatos = []
    for x in x_coords:
        for y in y_coords:
            pt = Point(x, y)
            if buffer_proj.contains(pt):
                puntos_candidatos.append(pt)

    if not puntos_candidatos:
        print("No se generaron puntos candidatos.")
        return None

    # Convertir puntos candidatos a lat/lon
    gdf_candidatos = gpd.GeoDataFrame(geometry=puntos_candidatos, crs='EPSG:3857').to_crs(epsg=4326)
    gdf_candidatos['LAT'] = gdf_candidatos.geometry.y
    gdf_candidatos['LON'] = gdf_candidatos.geometry.x

    # Para cada candidato, calcular la distancia mínima al OXXO más cercano
    def distancia_minima(lat, lon):
        return min(haversine(lat, lon, row['LATITUD_NUM'], row['LONGITUD_NUM']) for _, row in oxxos_zona.iterrows())

    gdf_candidatos['distancia_min_oxxo'] = gdf_candidatos.apply(lambda row: distancia_minima(row['LAT'], row['LON']), axis=1)

    # Seleccionar punto con mayor distancia mínima
    mejor_punto = gdf_candidatos.loc[gdf_candidatos['distancia_min_oxxo'].idxmax()]

    # print("Mejor ubicación encontrada:")
    # print(f"Latitud: {mejor_punto['LAT']}")
    # print(f"Longitud: {mejor_punto['LON']}")
    # print(f"Distancia mínima al OXXO más cercano: {mejor_punto['distancia_min_oxxo']:.2f} km")

    return mejor_punto

# Supón que df_train ya está cargado con LATITUD_NUM, LONGITUD_NUM
# Punto central proporcionado por la interfaz:
# lat_centro = 25.639
# lon_centro = -100.383

# mejor_punto = optimizar_ubicacion_max_distancia(df_train, lat_centro, lon_centro, radio_km=0.5)


app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Neural-Drip"

# Recibe un json con latitud, longitud y radio
@app.route('/mejor_ubicacion', methods=['POST'])
def mejor_ubicacion_post():
    data = request.get_json()
    lat_centro = data.get('latitude')
    lon_centro = data.get('longitude')
    radius_km = data.get('radius')

    if lat_centro is None or lon_centro is None:
        return jsonify({'error': 'Faltan parámetros de latitud o longitud.'}), 400

    mejor_punto = optimizar_ubicacion_max_distancia(df_train, lat_centro, lon_centro, radius_km)

    if mejor_punto is not None:
        return jsonify({
            'latitude': mejor_punto['LAT'],
            'longitude': mejor_punto['LON'],
            'distancia_min_oxxo': mejor_punto['distancia_min_oxxo']
        })
    
    else:
        return jsonify({'error': 'No se encontró una ubicación óptima.'}), 404
