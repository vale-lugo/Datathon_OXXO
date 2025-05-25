import { useState } from "react";

export default function usePrediction() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const getPrediction = async ({ latitude, longitude, radius }) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_FLASK_URL}/mejor_ubicacion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          latitude,
          longitude,
          radius: radius / 1000
        })
      });

      if (!res.ok) {
        throw new Error("Prediction failed");
      }

      const json = await res.json();
      setPrediction(json.prediction);
      return { latitud: json.latitude, longitud: json.longitude };

    } catch (err) {
      setError(err.message || "Unknown error");
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  return { getPrediction, prediction, loading, error };
}
