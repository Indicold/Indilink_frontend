// useApiUpload.tsx
import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface UploadResponse {
  // Define the properties of the response object here
}

const useApiUpload = () => {
  const [response, setResponse] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const uploadFile = async (
    filePath: string,
    key: string,
    assetId: string,
    token: string
  ) => {
    const formData = new FormData();
    formData.append(key, fs.createReadStream(filePath)); // fs.createReadStream(filePath) should be handled separately

    const headers = {
      'Authorization': `Bearer ${token}`,
      ...formData.getHeaders()
    };

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://seal-app-uqxwl.ondigitalocean.app/partner/register-partner-upload-doc',
      headers,
      data: formData
    };

    try {
      const response: AxiosResponse<UploadResponse> = await axios.request(config);
      setResponse(response.data);
      setError(null);
    } catch (error:any) {
      setError(error);
      setResponse(null);
    }
  };

  return { response, error, uploadFile };
};

export default useApiUpload;
