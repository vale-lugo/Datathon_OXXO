import { useEffect, useState } from 'react';

export default function useVenta() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/venta`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching venta:', err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
