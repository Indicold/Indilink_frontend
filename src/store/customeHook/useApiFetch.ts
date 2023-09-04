import { useState, useEffect } from 'react';
import { apiUrl, getToken } from './token';

const useApiFetch = <T>(url: string, token: string): { data: T | null; loading: boolean; error: Error | null } => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
   const tokenB:any=getToken();
  //  console.log("token",tokenB,apiUrl);
   
  useEffect(() => {
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
      } catch (err:any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);

  return { data, loading, error };
};

export default useApiFetch;
