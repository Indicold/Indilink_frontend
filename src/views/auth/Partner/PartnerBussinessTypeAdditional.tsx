// Import necessary components and libraries
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui';
import { getToken } from '@/store/customeHook/token';
import useApiUpload from '@/store/customeHook/uploadApi';
import useApiFetch from '@/store/customeHook/useApiFetch';
import axios from 'axios';
import { File } from 'buffer';
import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Define the PartnerBussinessTypeAdditional component
const PartnerBussinessTypeAdditional = () => {
  // Get the user's token
  const { token }: any = getToken();
  
  // Get the assets list ID and other information from local storage and location state
  const AssetsId: any = localStorage.getItem('assets_list_id');
  const location = useLocation();
  const isDisabled = location?.state || false;
  
  // Initialize state variables for file upload
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const AssetsType: any = localStorage.getItem('asset_id');
  
  // Construct the API URL based on the AssetsType
  let apiUrl: string = 
    AssetsType == 1 ? `partner/store/${AssetsId}` :
    AssetsType == 2 ? `partner/move/${AssetsId}` :
    AssetsType == 3 ? `partner/prepare/${AssetsId}` :
    '';
  
  // Fetch data from the API using a custom hook
  const { data: fetchDetails, loading: fetchDetailsloading, error: fetchDetailsSerror } = useApiFetch<any>(apiUrl, token);
  
  // Define an array of objects for file upload items
  let array1 = [
    {
      label: "No Lien Certificate",
      placeholder: "Upload",
      key: "no_lien_cert",
    },
    {
      label: "Latest Electricity Bill",
      placeholder: "Upload",
      key: "latest_electricity_bill",
    },
    {
      label: "Structural Load Safety",
      placeholder: "Upload",
      key: "structural_load_safety_cert",
    }, {
      label: "Pest Control Agency Contract",
      placeholder: "Upload",
      key: "pest_control_agency_contract",
    },
    {
      label: "Insurance Certificate",
      placeholder: "Upload",
      key: "insurance_cert",
    },
    {
      label: "Facility Layout",
      placeholder: "Upload",
      key: "facility_layout",
    },
    {
      label: "Storage Temperature Record for Last Couple of Months",
      placeholder: "Upload",
      key: "storage_temp_record",
    },
    {
      label: "3D view of the assets",
      placeholder: "Upload",
      key: "three_d_view_of_asset",
    }, {
      label: "Photo of the Assets",
      placeholder: "Upload",
      key: "photos_of_asset",
    },
    // Add additional objects as needed
    // Example:
    // {
    //   label: "New License",
    //   placeholder: "Upload",
    //   key: "new_license",
    // },
  ];
  
  // Initialize state variable for the file upload items
  const [array, setArray] = useState<any>(array1);
  
  // Handle file change and upload
  const handleFileChange = (e: any, item: any) => {
    setSelectedFile(e.target.files[0]);
    handleUpload(item, e.target.files[0]);
  }
  
  // Upload the file to the server
  const handleUpload = async (item: any, file: any) => {
    let AssetsId = localStorage.getItem('assets_list_id');
    let asset_type_id = localStorage.getItem('asset_id');
    const { token } = getToken();
    const formData = new FormData();
    formData.append(item?.key, file);
    formData.append('key', item?.key);
    formData.append('asset_id', AssetsId || 'INDI01AAAA9');
    formData.append('asset_type_id', asset_type_id || '1');
  
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    
    const config = {
      method: 'POST',
      body: formData,
      headers: headers,
    };
  
    try {
      const response = await fetch(`https://seal-app-uqxwl.ondigitalocean.app/partner/register-partner-upload-doc`, config);
      const responseData = await response.json();
      if (responseData?.status) {
        const updatedArray = array.map((itemData: any) =>
          itemData.key === item.key ? { ...itemData, view: true, url: responseData?.data } : itemData
        );
        setArray(updatedArray); // Update the state with the modified array
      }
      setResponse(response.data);
      setError(null);
    } catch (error: any) {
      setError(error);
      setResponse(null);
    }
  };
  
  // Effect to update the array based on fetched data
  useEffect(() => {
    if (fetchDetails) {
      const newData = {
        ...fetchDetails?.data
      };
  
      const updatedArray = array.map((item: any) =>
        newData[item.key]
          ? { ...item, view: true, url: newData[item.key], message: 'Uploaded' }
          : item
      );
  
      setArray(updatedArray);
    }
  }, [fetchDetails]);
  
  // Render the component JSX
  return (
    <div>
      <div className="bg-white">
        <h4 className="mb-2 text-head-title text-center p-4">Additional Submissions</h4>
        <div>
          <Formik>
            <Form className="py-2 multistep-form-step">
              <FormContainer>
                <div className="flex flex-wrap">
                  {array?.map((item: any, index: any) => (
                    <FormItem label={item?.label} key={index}
                      className='w-1/2 rounded-lg pl-[22px] flex text-label-title'>
                      <input
                        disabled={isDisabled}
                        type="file"
                        name={item?.key}
                        id="file-input"
                        className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                        file:bg-transparent file:border-0
                        file:bg-gray-100 file:mr-4
                        file:py-3 file:px-4
                        dark:file:bg-gray-700 dark:file:text-gray-400"
                        onChange={(e: any) => handleFileChange(e, item)}
                      />
                      <div className='flex'>
                        {item?.view && <b>Status:</b>}
                        {item?.view && <a href={`${apiUrl}/${item?.url}`} target='_blank' >View</a>}
                      </div>
                    </FormItem>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Button
                    style={{ borderRadius: "13px" }}
                    block
                    variant="solid"
                    type="button"
                    onClick={() => navigate('/asset_list')}
                    className='indigo-btn !w-[200px] m-4 mx-auto rounded-[30px]'
                  >
                    Next
                  </Button>
                </div>
              </FormContainer>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default PartnerBussinessTypeAdditional;
