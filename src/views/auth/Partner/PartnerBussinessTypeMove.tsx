import React, { useEffect, useState } from 'react'
import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { getToken } from '@/store/customeHook/token';
import { useLocation, useNavigate } from 'react-router-dom';
import { messageView, validateMovePartnerForm } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useApiFetch from '@/store/customeHook/useApiFetch';

const PartnerBussinessTypeMove = () => {
    const { token }: any = getToken();
    const AssetsId: any = localStorage.getItem('assets_list_id');
    const location=useLocation();
    const isDisabled=location?.state;
console.log("location",location?.state);
    const { data: vehicalModal, loading: vehicalLoading, error: vehicalError } = useApiFetch<any>('master/partner/move/get-vehicle-model', token);
    const { data: vehicalMake, loading: MakeLoading, error: makeError } = useApiFetch<any>('master/partner/move/get-vehicle-make', token);
    const { data: fetchDetails, loading: fetchDetailsloading, error: fetchDetailsSerror } = useApiFetch<any>(`partner/move/${AssetsId}`, token);
    const payload = {
        vehicle_make_id: "",
        vehicle_model_id: "",
        permit_validity: "",
        pucc_validity: "",
        chassis_no: "",
        fitness_validity: "",

    }
    const [data, setData] = useState<any>(payload);
    const [errors, setErrors] = useState<any>(null);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const newData: any = { ...data };
        newData[e.target.name] = e.target.value;
        setData(newData);

    }
    let ID: any = localStorage.getItem('assets_list_id');

    const handlesave = async () => {
        console.log("IDDDDDDDDD", ID);

        if (validateMovePartnerForm(data, setErrors) && !isDisabled) {

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

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
            };

            try {
                const response = await fetch("https://seal-app-uqxwl.ondigitalocean.app/partner/move/register", requestOptions);
                const result = await response.json();
                messageView(result?.message)

                if (result?.status == 200 || result?.status) {
                    navigate('/partner-bussiness-type-compliance')
                }
            } catch (error: any) {
                messageView(error.message)
            }
        }else if(isDisabled){
            navigate('/partner-bussiness-type-compliance',{state:isDisabled})
        }

    };
    useEffect(() => {
        if (fetchDetails?.data) {
            setData(fetchDetails?.data)
        }

    }, [fetchDetails])
    console.log("INDI01AAAA5INDI01AAAA5", fetchDetails);
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
