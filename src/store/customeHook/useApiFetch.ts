/**
 * The `useApiFetch` function is a custom hook in TypeScript that fetches data from an API using a
 * provided URL and token, and returns the fetched data, loading state, and error state.
 * @param {string} url - The `url` parameter is a string that represents the endpoint or route of the
 * API that you want to fetch data from. It is used to construct the complete URL for the API request.
 * @param {string} token - The `token` parameter is a string that represents the authentication token
 * used for making API requests. It is passed to the `Authorization` header in the fetch request to
 * authenticate the user.
 * @returns The `useApiFetch` function returns an object with three properties: `data`, `loading`, and
 * `error`.
 */
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
