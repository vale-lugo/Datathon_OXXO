import { useEffect, useState } from 'react';

export default function useMetaVenta() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/meta-venta`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching meta_venta:', err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
