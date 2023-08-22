import { useState, useEffect } from 'react';

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
  // Implement your actual POST request logic here and return the result
  // You can use libraries like axios, fetch, etc.
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      console.log("responseData",responseData);
      
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
