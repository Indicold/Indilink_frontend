/**
 * The above code is a custom React hook that handles making a PUT request to an API endpoint and
 * returns the result and loading state.
 * @param {string} url - The `url` parameter is the endpoint URL where you want to send the POST
 * request. It should be a string representing the URL of the API endpoint you want to send the request
 * to.
 * @param {PostData} data - The `data` parameter in the `postRequest` function is an object that
 * represents the data you want to send in the POST request. In the provided code, it is defined as
 * `PostData`, which is an interface that specifies the properties of the data object.
 * @returns The `usePutApi` function returns an object with three properties: `result`, `loading`, and
 * `sendPostRequest`.
 */
import { useState, useEffect } from 'react';
import { getToken } from './token';
import { apiUrl } from '../token';

interface ApiResponse {
  // Define the properties of the response object here
  // For example:
  success: boolean;
  message: string;
}

interface ApiError {
  // Define the properties of the error object here
  // For example:
  statusCode: number;
  message: string;
}

type ApiResult = ApiResponse | ApiError;

interface PostData {
  // Define the properties of the data you're sending in the POST request
  // For example:
  username: string;
  password: string;
}

function postRequest(url: string, data: PostData): Promise<ApiResult> {
  const {token}:any=getToken()
  // Implement your actual POST request logic here and return the result
  // You can use libraries like axios, fetch, etc.
  return fetch(`${apiUrl}/${url}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      "Authorization":`Bearer ${token}`
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      // if (!response.ok) {
      //   throw new Error(`Something went wrong try again !`);
      // }
      return response.json();
    })
    .then(responseData => {
      
      // Assuming you have a certain way to determine success or failure
      if (responseData) {
        return responseData as ApiResponse;
      } else {
        throw new Error(responseData.user_id);
      }
    })
    .catch(error => {
      // Handle errors, create an ApiError object, etc.
      return {
        statusCode: 500,
        message: error.message || 'An error occurred',
      } as ApiError;
    });
}

function usePutApi(url: string) {
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);

  const sendPostRequest = async (data: PostData) => {
    setLoading(true);
    const response = await postRequest(url, data);
    setResult(response);
    setLoading(false);
  };

  return { result, loading, sendPostRequest };
}

export default usePutApi;
