import { useState, useEffect } from 'react';
import { apiUrl, getToken } from './token';

const useApiFetch = <T>(url: string, token: string): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const tokenB: any = getToken();

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData: T = await response.json();
      setData(responseData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const refetch = () => {
    // You can add any additional logic here if needed
    setLoading(true); // Set loading to true to indicate the start of a new fetch
    setError(null); // Clear any previous errors
    fetchData(); // Call fetchData to fetch the data again
  };

  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, loading, error, refetch };
};

export default useApiFetch;
