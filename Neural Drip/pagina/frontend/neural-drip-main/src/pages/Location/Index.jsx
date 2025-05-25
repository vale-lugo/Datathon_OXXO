import { useState } from 'react';
import Mapa from './Mapa';
import Input from './Input';

export default function Index() {
  const [customLocation, setCustomLocation] = useState({
    latitude: null,
    longitude: null,
    radius: 0,
  });
  const [predictedLocation, setPredictedLocation] = useState(null);

  return (
    <div className="flex bg-zinc-800 h-full">
        <Input customLocation={customLocation} setCustomLocation={setCustomLocation} setPredictedLocation={setPredictedLocation} />
        <Mapa customLocation={customLocation} setCustomLocation={setCustomLocation} predictedLocation={predictedLocation} />
    </div>
  );
}
