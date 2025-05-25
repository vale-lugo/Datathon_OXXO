import { useEffect, useState } from 'react';

export default function useDimTienda() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/dim-tienda`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Error fetching dim_tienda:', err))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}
