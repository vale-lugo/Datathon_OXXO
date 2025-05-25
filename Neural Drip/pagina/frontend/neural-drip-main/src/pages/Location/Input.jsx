import usePrediction from '../../hooks/usePrediction';

export default function Input({ customLocation, setCustomLocation, setPredictedLocation }) {
  const handleChange = (field, value) => {
    setCustomLocation(prev => ({ ...prev, [field]: parseFloat(value) }));
  };

  const { getPrediction, prediction, loading, error } = usePrediction();

  const handleRunPrediction = async () => {
    if (!customLocation.latitude || !customLocation.longitude) return;

    const result = await getPrediction(customLocation);

    if (result?.latitud && result?.longitud) {
      setPredictedLocation({
        latitude: result.latitud,
        longitude: result.longitud
      });
    }
  };


  return (
    <div className="bg-zinc-800 text-gray-100 flex flex-col w-1/4 h-screen m-8">
      <h1 className="font-bold text-4xl pb-8">Busca la mejor ubicación</h1>
        <div className="flex flex-col gap-4">
            <div className="flex flex-col">
                <label htmlFor="longitude">Longitud</label>
                <input type="number" id="longitude" className="bg-zinc-700 text-gray-100 p-2 rounded" placeholder="Ingresa la longitud"  value={customLocation.longitude ?? ''}  onChange={(e) => handleChange("longitude", e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="latitude">Latitud</label>
                <input type="number" id="latitude" className="bg-zinc-700 text-gray-100 p-2 rounded" placeholder="Ingresa la latitud" value={customLocation.latitude ?? ''} onChange={(e) => handleChange("latitude", e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="radio">Radio</label>
                <input type="range" id="radio" className="bg-zinc-700 text-gray-100 p-2 rounded" min="100" max="2500" step="25" value={customLocation.radius} onChange={(e) => handleChange("radius", e.target.value)}/>
                <span>{customLocation.radius} metros</span>
            </div>

            <button onClick={handleRunPrediction} className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Buscar
            </button>

            {loading && <p className="text-yellow-300 mt-2">Calculando...</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {prediction && (
              <div className="mt-4 bg-green-700 text-white p-3 rounded">
                <strong>Predicción de venta:</strong> {prediction}
              </div>
            )}

        </div>
    </div>
  );
}
