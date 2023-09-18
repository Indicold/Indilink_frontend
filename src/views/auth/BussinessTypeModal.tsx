/* 
* The above code is a TypeScript React component that renders a modal for selecting a business type.
* It imports various dependencies and custom hooks for handling API requests and form data. 
*/
import { apiUrl, getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React, { useEffect, useState } from 'react'
import { Button, FormItem, Input } from "@/components/ui";
import { CiImageOn } from "react-icons/ci"
import { useNavigate } from 'react-router-dom'
import { Field } from 'formik';
import usePostApi from '@/store/customeHook/postApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderSpinner from '@/components/LoaderSpinner';

const BussinessTypeModal = () => {
  const [assetsType,setAssetsType]=useState<any>(1)

  const { token }: any = getToken();
  const { data, loading, error } = useApiFetch<any>('master/get-asset-types', token);
  const { data:countryId, loading:countryIdLoading, error:countryIdError } = useApiFetch<any>('master/get-countries', token);
  const { data:CategoryId, loading:CategoryIdLoading, error:CategoryIdError } = useApiFetch<any>('master/get-categories', token);
  const { result: AssetsResponse, loading: AssetsLoading, sendPostRequest: PostAssetsDetails }:any = usePostApi(`${apiUrl}/partner/selectAsset`);
  const [modal, setModal] = useState(true)
  const navigate = useNavigate();
  const [Bussiness, setBussiness] = useState('');
  const [formData,setFormData]=useState<any>({});
  
  /**
   * The `handleRoute` function sets various values in local storage based on user type and business
   * type, and then navigates to different routes depending on the conditions.
   */
  const handleRoute = () => {
    let title_id:any='';
    let asset_type_id:any='';
   
    localStorage.setItem("bussiness_type", Bussiness)
   
    let body:any={
      title_id:localStorage.getItem('user_type') === 'Partner' ? 1:localStorage.getItem('user_type')==='Investor' ? 3:2,
      asset_type_id:Bussiness==='Store' ? 1 :Bussiness==='Move' ? 2:3,
      country_id: formData?.country_id,
      category_id: formData?.category_id
    }
    console.log(localStorage.getItem('asset_id'), typeof localStorage.getItem('asset_id'));
    localStorage.setItem('country_id', formData?.country_id);
    localStorage.setItem('category_id', formData?.category_id);
    
    PostAssetsDetails(body);
    setTimeout(()=>{
       if (localStorage.getItem('user_type') === 'Partner') {
      title_id=1;
      if (Bussiness === 'Move') {
        setAssetsType(2)
        asset_type_id=2;
        navigate('/partner-bussiness-type-move')
      }
      if (Bussiness === 'Prepare') {
        setAssetsType(3)
        asset_type_id=3;
        navigate('/partner-bussiness-type-prepare')
      }
      if (Bussiness === 'Store') {
        asset_type_id=1;
        setAssetsType(1)
        navigate('/partner-registration')

      }

    }
    if (localStorage.getItem('user_type') === 'Investor') {
      title_id=3;
      navigate('/investor-registration')

    }
    if (localStorage.getItem('user_type') === 'Customer') {
      if (Bussiness === 'Store') {
        navigate('/customer-store')
      }
      if (Bussiness === 'Move') {
        navigate('/customer-move')
      }
      if (Bussiness === 'Prepare') {
        navigate('/customer-prepare')
      }
    }
    localStorage.setItem('asset_id', asset_type_id);
    },3000)
  }
  console.log("datadatadata", countryId);

  /**
   * The handleChange function updates the formData state with the new value from the input field and
   * logs the countryId.
   * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
   * function. It is typically an event object that is triggered by a user interaction, such as a
   * button click or input change.
   */
  const handleChange = (e: any) => {
    const newData={...formData};
    newData[e.target.name]=e.target.value;
    setFormData(newData);
    console.log("datadatadata", countryId);

  }
  /**
   * The function `messageView` displays a success toast message with a custom style and auto-closes
   * after 3 seconds.
   * @param {any} messagevalue - The message value is the text that you want to display in the toast
   * message. It can be any string or variable that contains the message you want to show.
   */
  const messageView=(messagevalue:any)=>{
    toast.success(messagevalue, {
        position: 'top-right', // Position of the toast
        autoClose: 3000,       // Auto-close after 3000ms (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: '#FFB017',fontSize:"bold",
            color: "#fff"// Set the background color here
        },
    });
}
console.log("AssetsResponse",AssetsResponse)

  /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
  effect is triggered whenever the `AssetsResponse` variable changes. */
  useEffect(()=>{

if(AssetsResponse){
  // messageView(AssetsResponse?.message)
}
if(AssetsResponse?.data && AssetsResponse?.status){
  console.log("ATTTTTT",AssetsResponse);
  
  localStorage.setItem('AssetsId',AssetsResponse?.data)
}
  },[AssetsResponse])

  return (
    <div>
            <ToastContainer />
      {modal && <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-[800px] mt-[50px] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button> */}

            <div className="px-6 py-6 lg:px-8">
              <h4 className="text-head-title  mb-4">{localStorage.getItem('user_type')==='Customer' ? "Request search" : "Choice on Bussiness"} </h4>
              <p>You may also change later</p>

              <div className="flex justify-around grid grid-cols-3 grid-flow-col gap-2">
                {data ? data?.data.map((item: any, index: any) => (
                  <div role="button" key={index} onClick={() => setBussiness(item?.type)} style={{ backgroundColor: `${Bussiness == item?.type ? "#CBD9D4" : ""}` }} className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                    <CiImageOn className='text-6xl mx-auto' />
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                      {item?.type}
                    </h5>
                    <p>
                      sample Caption
                    </p>


                  </div>
                )):
            <LoaderSpinner />
                
                }


              </div>
              {localStorage.getItem('user_type') === 'Partner' && <div className="flex">
                <FormItem
                  label="Country Id"
                  className='mx-auto w-1/2'
                >

                  <select name='country_id' onChange={(e: any) => handleChange(e)} className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                    <option>Select Country</option>
                    {countryId && countryId?.data?.map((item:any,index:any)=>(
                    <option value={item?.id}>{item?.name}</option>

                    ))}
                  </select>
                </FormItem>
                <FormItem
                  label="Category Id"
                  className='mx-auto w-1/2'
                >

                  <select name='category_id' onChange={(e: any) => handleChange(e)} className='h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                    <option>Select</option>
                    {CategoryId && CategoryId?.data?.filter((item:any,index:any)=>item?.asset_type_id==assetsType).map((item:any,index:any)=>(
                    <option value={item?.asset_type_id}>{item?.name}</option>

                    ))}
                  </select>
                </FormItem>
              </div>}
              <div className='flex'>
                <Button
                  style={{ borderRadius: "13px" }}
                  block
                  disabled={Bussiness === ''}
                  variant="solid"
                  type="button"
                  onClick={handleRoute}
                  className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}

export default BussinessTypeModal
