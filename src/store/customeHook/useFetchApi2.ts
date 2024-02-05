/* The code is importing the `useState` and `useEffect` hooks from the `react` library, as well as the
`apiUrl` and `getToken` functions from a file called `token`. These imports are necessary for the
code to use the hooks and access the API URL and token. */
import { useState, useEffect } from 'react';
import { apiUrl, apiUrl2, getToken } from './token';

/**
 * The `useApiFetch2` function is a custom hook in TypeScript that fetches data from an API endpoint,
 * handles loading and error states, and provides a `refetch` function to fetch the data again.
 * @param {string} url - The `url` parameter is a string that represents the API endpoint URL from
 * which data will be fetched.
 * @param {string} token - The `token` parameter is a string that represents an authentication token.
 * It is used to authorize the API request made in the `fetchData` function by including it in the
 * `Authorization` header.
 * @returns The `useApiFetch2` function returns an object with the following properties:
 */
const useApiFetch2 = <T>(url: string, token: string): { data: T | null; loading: boolean; error: Error | null; refetch: () => void } => {
  /* The code is using the `useState` hook from the `react` library to define three state variables:
  `data`, `loading`, and `error`. */
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const tokenB: any = getToken();

  /**
   * The function fetchData is an asynchronous function that makes a network request to a specified API
   * endpoint, handles the response, and updates the data, error, and loading state accordingly.
   */
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl2}/${url}`, {
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

  /**
   * The function refetch is used to initiate a new fetch by setting loading to true, clearing any
   * previous errors, and calling the fetchData function.
   */
  const refetch = () => {
    // You can add any additional logic here if needed
    setLoading(true); // Set loading to true to indicate the start of a new fetch
    setError(null); // Clear any previous errors
    fetchData(); // Call fetchData to fetch the data again
  };

  /* The `useEffect` hook is used to perform side effects in functional components. In this code, the
  `useEffect` hook is used to fetch data from an API endpoint when the `url` or `token` dependencies
  change. */
  useEffect(() => {
    fetchData();
  }, [url, token]);

  return { data, loading, error, refetch };
};

export default useApiFetch2;
