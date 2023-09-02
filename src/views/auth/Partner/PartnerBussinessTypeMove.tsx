// Import necessary React and custom components and libraries
import React, { useEffect, useState } from 'react';
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'; // Import UI components
import { Field, Form, Formik } from 'formik'; // Import Formik for form handling
import { getToken } from '@/store/customeHook/token'; // Import a custom hook for handling tokens
import { useLocation, useNavigate } from 'react-router-dom'; // Import routing related hooks
import { messageView, validateMovePartnerForm } from '@/store/customeHook/validate'; // Import custom functions for messages and form validation
import { ToastContainer } from 'react-toastify'; // Import a toast notification container component
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast notifications
import useApiFetch from '@/store/customeHook/useApiFetch'; // Import a custom hook for API fetching

// Define the main functional component for PartnerBussinessTypeMove
const PartnerBussinessTypeMove = () => {
  // Get the user's token using a custom hook
  const { token }: any = getToken();
  
  // Get the AssetsId from local storage
  const AssetsId: any = localStorage.getItem('assets_list_id');
  
  // Get the current route location and check if it's disabled
  const location = useLocation();
  const isDisabled = location?.state;
  console.log("location", location?.state);
  
  // Fetch data for vehicle model and make using custom hooks
  const { data: vehicalModal, loading: vehicalLoading, error: vehicalError } =
    useApiFetch<any>('master/partner/move/get-vehicle-model', token);
  const { data: vehicalMake, loading: MakeLoading, error: makeError } =
    useApiFetch<any>('master/partner/move/get-vehicle-make', token);
  
  // Fetch additional data for form pre-filling using a custom hook
  const { data: fetchDetails, loading: fetchDetailsloading, error: fetchDetailsSerror } =
    useApiFetch<any>(`partner/move/${AssetsId}`, token);
  
  // Define a payload object for the POST request
  const payload = {
    vehicle_make_id: "",
    vehicle_model_id: "",
    permit_validity: "",
    pucc_validity: "",
    chassis_no: "",
    fitness_validity: "",
  }
  
  // Define state variables for form data and errors
  const [data, setData] = useState<any>(payload);
  const [errors, setErrors] = useState<any>(null);
  
  // Get the navigate function from the routing hook
  const navigate = useNavigate();
  
  // Define a function to handle form input changes
  const handleChange = (e: any) => {
    const newData: any = { ...data };
    newData[e.target.name] = e.target.value;
    setData(newData);
  }
  
  // Get the AssetsId from local storage
  let ID: any = localStorage.getItem('assets_list_id');
  
  // Define a function to handle form submission
  const handlesave = async () => {
    console.log("IDDDDDDDDD", ID);
    
    // Check form validation and if the form is not disabled
    if (validateMovePartnerForm(data, setErrors) && !isDisabled) {
      
      // Prepare headers and form data for the POST request
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var formdata = new FormData();
      formdata.append("asset_id", 'INDI01AAAA7');
      formdata.append("vehicle_make_id", data?.vehicle_make_id);
      formdata.append("vehicle_model_id", data?.vehicle_model_id);
      formdata.append("permit_validity", data?.permit_validity);
      formdata.append("pucc_validity", data?.pucc_validity);
      formdata.append("chassis_no", data?.chassis_no);
      formdata.append("fitness_validity", data?.fitness_validity);
      
      // Prepare request options for the POST request
      var requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };
      
      try {
        // Make the POST request
        const response = await fetch("https://seal-app-uqxwl.ondigitalocean.app/partner/move/register", requestOptions);
        const result = await response.json();
        messageView(result?.message);
        
        // If the response status is 200, navigate to the specified route
        if (result?.status == 200 || result?.status) {
          navigate('/partner-bussiness-type-compliance');
        }
      } catch (error: any) {
        // Display an error message on request failure
        messageView(error.message);
      }
    } else if (isDisabled) {
      // If the form is disabled, navigate to the specified route with state
      navigate('/partner-bussiness-type-compliance', { state: isDisabled });
    }
  };
  
  // Load data into the form when fetchDetails has data
  useEffect(() => {
    if (fetchDetails?.data) {
      setData(fetchDetails?.data);
    }
  }, [fetchDetails]);
  
  console.log("INDI01AAAA5INDI01AAAA5", fetchDetails);
  
  // Log vehicalMake?.data for debugging purposes
  {
    console.log("vehicalMake?.data", vehicalMake?.data)
  }
    return (
        <div>
            <ToastContainer />
            <div className="bg-white">
                <h4 className=" mb-2 text-head-title text-center p-4">Move</h4>
                <div>
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() => console.log("Submited via my onSubmit function")}
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <div className="flex">
                                    <FormItem label="Make"
                                        className='mx-auto w-1/2 rounded-lg pl-[22px] '>


                                        <select disabled={isDisabled} onChange={(e: any) => handleChange(e)}
                                            name="vehicle_make_id" className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                            <option>Select Make</option>
                                            {vehicalMake && vehicalMake?.data?.map((item: any, index: any) => (
                                                <option value={item?.id} selected={item?.id === data?.vehicle_make_id}>{item?.name}</option>

                                            ))}
                                        </select>

                                        <p className='text-[red]'>{errors && errors.vehicle_make_id}</p>
                                    </FormItem>
                                    <FormItem label="Model"
                                        className='mx-auto w-1/2 rounded-lg pl-[22px]'>

                                        <select disabled={isDisabled} onChange={(e: any) => handleChange(e)}
                                            name="vehicle_model_id" className='border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600'>
                                            <option>Select Model</option>
                                            {vehicalModal && vehicalModal?.data?.map((item: any, index: any) => (
                                                <option value={item?.vehicle_make_id} selected={item?.id == data?.vehicle_model_id}>{item?.name}</option>

                                            ))}
                                        </select>
                                        <p className='text-[red]'>{errors && errors.vehicle_model_id}</p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem label="Permit valid Till Date"
                                        className='mx-auto w-1/2 rounded-lg pl-[22px]'>
                                        <Field 
                                        disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            onChange={(e: any) => handleChange(e)}
                                            name="permit_validity"
                                            value={data?.permit_validity}
                                            placeholder="Permit Validity Date"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.permit_validity}</p>
                                    </FormItem>
                                    <FormItem
                                        label="PUCC valid Till Date"
                                        className='rounded-lg pl-[22px] w-1/2'
                                    >
                                        <Field 
                                        disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            onChange={(e: any) => handleChange(e)}
                                            name="pucc_validity"
                                            value={data?.pucc_validity}
                                            placeholder="PUCC valid Till Date"
                                            component={Input}
                                        />

                                        <p className='text-[red]'>{errors && errors.pucc_validity}</p>
                                    </FormItem>

                                </div>
                                <div className="flex">

                                    <FormItem
                                        label="Get Chassis No from RC"
                                        className='mx-auto w-1/2 rounded-lg pl-[22px]'
                                    >
                                        <Field 
                                        disabled={isDisabled}
                                            type="text"
                                            autoComplete="off"
                                            onChange={(e: any) => handleChange(e)}
                                            name="chassis_no"
                                            value={data?.chassis_no}
                                            placeholder="Get Chassis No from RC"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.chassis_no}</p>
                                    </FormItem>
                                    <FormItem
                                        label="Fitness Certificate Valid Till"
                                        className=' w-1/2 rounded-lg pl-[22px]'
                                    >
                                        <Field 
                                        disabled={isDisabled}
                                            type="date"
                                            autoComplete="off"
                                            value={data?.fitness_validity}
                                            onChange={(e: any) => handleChange(e)}
                                            name="fitness_validity"
                                            placeholder="Fitness Certificate Valid Till"
                                            component={Input}
                                        />
                                        <p className='text-[red]'>{errors && errors.fitness_validity}</p>
                                    </FormItem>
                                </div>


                                <div className="flex justify-center">
                                    <Button
                                        style={{ borderRadius: "13px" }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handlesave}
                                        className='indigo-btn m-4 !w-[200px] mx-auto rounded-[30px]'
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

export default PartnerBussinessTypeMove
