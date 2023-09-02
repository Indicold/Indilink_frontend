import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { getToken } from '@/store/customeHook/token';
import useApiUpload from '@/store/customeHook/uploadApi';
import useApiFetch from '@/store/customeHook/useApiFetch';
import axios from 'axios';
import { File } from 'buffer'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const PartnerBussinessTypeCompliances = () => {// Get the user's token
   const { token }: any = getToken();
   
   // Get the current location
   const location = useLocation();
   
   // Initialize a boolean variable based on the location state (default to false)
   const isDisabled = location?.state || false;
   
   // Initialize state variables for file upload
   const [selectedFile, setSelectedFile] = useState<any>(null);
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);
   
   // Get asset IDs from local storage
   const AssetsId: any = localStorage.getItem('assets_list_id');
   const AssetsType: any = localStorage.getItem('asset_id');
   
   // Determine the API URL based on the asset type
   let apiUrl: string =
     AssetsType == 1
       ? `partner/store/${AssetsId}`
       : AssetsType == 2
       ? `partner/move/${AssetsId}`
       : AssetsType == 3
       ? `partner/prepare/${AssetsId}`
       : '';
   
   console.log("TTTTTTTTTT", apiUrl);
   
   // Fetch details using the determined API URL
   const { data: fetchDetails, loading: fetchDetailsloading, error: fetchDetailsSerror } = useApiFetch<any>(apiUrl, token);
   
   let array1 = [
      {
        label: "FASSAI License",
        placeholder: "Upload",
        key: "fsssai_lic",
        view: false,
        url: null,
      },
      {
        label: "ISO (optional)",
        placeholder: "Upload",
        key: "iso_cert",
        view: false,
        url: null,
      },
      {
        label: "HACCP",
        placeholder: "Upload",
        key: "haccp",
        view: false,
        url: null,
      }, {
        label: "Pest Control Agency Contract",
        placeholder: "Upload",
        key: "pest_control_agency_contract",
        view: false,
        url: null,
      },
      {
        label: "BRC Audit or any other certification (If Applicable)",
        placeholder: "Upload",
        key: "brc_audit",
        view: false,
        url: null,
      },
      {
        label: "Pollution NOC",
        placeholder: "Upload",
        key: "pollution_noc",
        view: false,
        url: null,
      },
      {
        label: "Fire Safety NOC",
        placeholder: "Upload",
        key: "fire_safety_noc",
        view: false,
        url: null,
      },
      {
        label: "MCD License (if applicable)",
        placeholder: "Upload",
        key: "mcd_lic",
        view: false,
        url: null,
      }, {
        label: "UP Cold Storage License",
        placeholder: "Upload",
        key: "up_cond_storage_lic",
        view: false,
        url: null,
      },
      {
        label: "Factory License",
        placeholder: "Upload",
        key: "factory_lic",
        view: false,
        url: null,
      },
      {
        label: "Panchayat NOC",
        placeholder: "Upload",
        key: "panchayat_noc",
        view: false,
        url: null,
      },
      // Add additional objects as needed
      // Example:
      // {
      //   label: "New License",
      //   placeholder: "Upload",
      //   key: "new_license",
      //   view: false,
      //   url: null,
      // },
    ];
   
   // Initialize state variable for the file upload items
   const [array, setArray] = useState(array1);
   
   // Handle changes in the file input
   const handleFileChange = (e: any, item: any) => {
     console.log("FILE", e.target.files[0]);
   
     setSelectedFile(e.target.files[0]);
     handleUpload(item, e.target.files[0]);
   }
   
   // Handle the file upload
   const handleUpload = async (item: any, file: any) => {
     let AssetsId = localStorage.getItem('AssetsId');
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
       const response = await fetch('https://seal-app-uqxwl.ondigitalocean.app/partner/register-partner-upload-doc', config);
       const responseData = await response.json();
       if (responseData?.status == 200 || responseData?.status) {
         const updatedArray = array.map((itemData: any) =>
           itemData.key === item.key ? { ...itemData, view: true, url: responseData?.data, message: "Uploaded" } : itemData
         );
   
         setArray(updatedArray); // Update the state with the modified array
       } else if (responseData?.status == 400 || responseData?.status == 409) {
         const updatedArray = array.map((itemData: any) =>
           itemData.key === item.key ? { ...itemData, view: false, url: responseData?.data, message: "Error While Uploading" } : itemData
         );
         setArray(updatedArray); // Update the state with the modified array
       }
       console.log('Response data:', responseData?.data);
     } catch (error) {
       console.error('Error:', error);
     }
   };
   
   // Access the navigate function from React Router
   const navigate = useNavigate();
   
   // Handle route navigation
   const handleRoute = () => {
     navigate('/partner-bussiness-type-additional', { state: isDisabled });
   }
   
   // Use useEffect to update file upload items when fetchDetails changes
   useEffect(() => {
     if (fetchDetails) {
       const newData = {
         ...fetchDetails?.data
       };
   
       const updatedArray = array.map((item) =>
         newData[item.key]
           ? { ...item, view: true, url: newData[item.key], message: 'Uploaded' }
           : item
       );
   
       setArray(updatedArray);
     }
   }, [fetchDetails]);
   
   console.log("DDDDDDDD", array[0]);
   return (
      <div>
         <ToastContainer />
         <div className="bg-white">
            <h4 className=" mb-2 text-head-title text-center p-4">Compliance Details</h4>
            <div>
               <Formik>
                  <Form className="py-2 multistep-form-step">
                     <FormContainer>
                        <div className="flex flex-wrap">
                           {array?.map((item: any, index: any) => (
                              <FormItem label={item?.label} key={index}
                                 className=' w-1/2 rounded-lg pl-[22px] text-label-title '>

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
                                    {item?.message && <p className='text-[red]'>Status:{item?.message}</p>}
                                    {/* <button type='button' onClick={() => handleUpload(item)}>Upload</button> */}
                                    {item?.view && <a href={`https://seal-app-uqxwl.ondigitalocean.app/${item?.url}`} target='_blank' >View</a>}
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
                              onClick={handleRoute}
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

export default PartnerBussinessTypeCompliances
