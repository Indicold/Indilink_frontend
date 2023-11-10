import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch';
import { apiUrl, getToken } from '@/store/token';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import ShareHolderModal from './profileModal/shareHolderModal';
import BranchsModal from './profileModal/branchModal';
import ShareHolderTable from './profileTables/shareHoldersTable';
import BranchTable from './profileTables/branchTable';
import PublishIcon from '@mui/icons-material/Publish';
import { messageView, validateBasicForm } from '@/store/customeHook/validate';
import usePostApi from '@/store/customeHook/postApi';
import { ToastContainer } from 'react-toastify';
const tableShareHead: any = {
    email: "Email ID",
    full_name: "Name",
    percentage_holding: "% Holding",
    authorized_signatory: "Signatory",
    Action: "Action"
};
const tableBranchHead: any = {
    email: "Email ID",
    name: "Name",
    branch_gst: "GST Number",
    branch_head: "Head",
    Action: "Action"
};
const BasicInfo = () => {
    const isDisabled: any = !true;
    const [SHModal, setSHModal] = useState<any>(false);
    const [BranchModal, setBranchModal] = useState<any>(false);
    const [error, setErrors] = useState<any>({})
    const [formDataShare, setformDataShare] = useState<any>({
        full_name: "",
        percentage_holding: "",
        address: "",
        phone_number: "",
        shareholder_email: "",
        designation: "",
        din_number: "",
        authorized_signatory: ""
    });
    const [formDataBranch, setformDataBranch] = useState<any>({
        name: "",
        address: "",
        branch_gst: "",
        branch_email: "",
        branch_head: "",
        branch_phone: ""

    })
    const [data, setData] = useState<any>({
        country_id: "",
        state_id: "",
        address: "",
        pin_code: "",
        pan_number: "",
        gst_number: [],
        gst_file:[],
        shareholder_ids: [],
        branch_ids: []
    })
    const handleChange = (e: any) => {
        const newdata: any = { ...data };
        newdata[e.target.name] = e.target.value;
        if (e.target.name === 'gst_file') {

            newdata[e.target.name] = Array.from(e.target.files);
        }
        setData(newdata);
    }

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { token }: any = getToken()
    const { data: ListOfCountry, loading: LCloading, error: LCerror } =
        useApiFetch<any>(`master/get-countries`, token);

    const { data: companyDetails, loading: CDloading, error: CDerror } =
        useApiFetch<any>(`auth/get-company-for-basic-details`, token);

    const { data: ListOfState, loading: LOSloading, error: LOSerror } =
        useApiFetch<any>(`master/get-state-by-countryId/${data?.country_id}`, token);

    const { data: BasicInfo, loading: LIloading, error: BIerror } =
        useApiFetch<any>(`auth/basic-details`, token);

    const { data: SareList, loading: Shareloading, error: ShareListerror, refetch: fetchShare } =
        useApiFetch<any>(`auth/shareholder`, token);

    const { data: BranchList, loading: Branchloading, error: BranchListerror, refetch: fetchBranch } =
        useApiFetch<any>(`auth/branches`, token);

    const { result: AssetsResponse}: any =
    useApiFetch(`auth/basic-details`,token)
    

    const [branch, setBranch] = useState(false)

    const [shareHolder, setShareHolder] = useState(1)
    const firmType = 'Private Limited'

    const handlesubmit = (e: any) => {
  
        if (validateBasicForm(data, setErrors)) {
            var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              `Bearer ${token}`
            );
            
            var formdata = new FormData();
            formdata.append("country_id", data?.country_id);
            formdata.append("state_id", data?.state_id);
            formdata.append("address", data?.address);
            formdata.append("pin_code", data?.pin_code);
            formdata.append("gst",data?.gst_number);
            
            // Assuming you have an array of File objects for gst_files
            var gstFiles = data?.gst_file; // Add more files as needed
            
           if(gstFiles) gstFiles.forEach((file:any, index:any) => {
              formdata.append(`gst_file`, file);
            });
            
            var shareholderIds =data?.shareholder_ids // Replace with your dynamic data
            var branchIds =data?.branch_ids; // Replace with your dynamic data
            
            shareholderIds.forEach((id:any, index:any) => {
              formdata.append(`shareholder_ids`, id);
            });
            
            branchIds.forEach((id:any, index:any) => {
              formdata.append(`branch_ids`, id);
            });
            
            var requestOptions :any= {
              method: "POST",
              headers: myHeaders,
              body: formdata,
              redirect: "follow",
            };
            
            if(BasicInfo?.data[0]?.gst_file?.length>0){
         
                navigate('/key-management')
            }else{
                fetch(`${apiUrl}/auth/basic-detail`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                  messageView(result?.message)
                  if(result?.status==200){
   navigate('/key-management')
                  }
                })
                .catch((error) => {
                  messageView(error?.message)
                });
            }
           
            
       
           

        }
    }

    useEffect(() => {

        if (SareList?.data) {
            let newarrs: any = SareList?.data?.map((item: any) => item?.id) || [];
            let newarr: any = BranchList?.data?.map((item: any) => item?.id) || [];
            setData({ ...data, branch_ids: newarr, shareholder_ids: newarrs });
        }

    }, [SareList?.data])

    useEffect(() => {
        if (BranchList?.data) {
            let newarrs: any = SareList?.data?.map((item: any) => item?.id) || [];
            let newarr: any = BranchList?.data?.map((item: any) => item?.id) || [];
            setData({ ...data, branch_ids: newarr, shareholder_ids: newarrs });
        }

    }, [BranchList?.data])
    useEffect(() => {
        if (companyDetails?.data?.length>0) {
            setData(
                {
                    ...data,
                    country_id: companyDetails?.data[0].country_id,
                    state_id: companyDetails?.data[0].state_id,
                    address: companyDetails?.data[0].address,
                    pin_code: companyDetails?.data[0].pin_code,
                    gst_number: companyDetails?.data[0].gst
                })

        }
    }, [companyDetails?.data])

useEffect(()=>{
    if(BasicInfo){
        setData({...data,gst_file:BasicInfo?.data})
    }
 
},[BasicInfo?.data])

    return (
        <div className='flex'>
            <ToastContainer />
            {/* stepper start */}
            <div className='w-1/6'>


                <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">User Signup</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">Basic Information</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>

                        <h6 className="font-medium leading-tight">Key Management Personnel</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>

                        <h6 className="font-medium leading-tight">Account Details</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                   
                </ol>




            </div>
            {/* stepper end */}

            {/* main component */}
            <div className="mb-4 w-5/6 bg-white">
                <ArrowBackIcon className='ms-3' onClick={() => navigate(-1)} />
                <h4 className="text-head-title text-center">Basic Information</h4>
                {/* pre filled common form */}
                <Formik
                    initialValues={{ field: true }}
                    onSubmit={() =>
                        console.log('Submited via my onSubmit function')
                    }
                >
                    <Form className="py-2 multistep-form-step">
                        <FormContainer>

                            <div className="flex">
                                <FormItem
                                    label="Firm Registered Country"
                                    className="mx-auto w-1/2 rounded-lg pl-[22px]"
                                    asterisk={true}
                                >
                                    <select
                                        disabled={isDisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="country_id"
                                        className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfCountry && ListOfCountry?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.country_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.country_id}
                                    </p>
                                </FormItem>
                                <FormItem
                                    label="Firm Registered State"
                                    className="rounded-lg pl-[22px] w-1/2"
                                    asterisk={true}
                                >
                                    <select
                                        disabled={isDisabled}
                                        onChange={(e: any) => handleChange(e)}
                                        name="state_id"
                                        className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                    >
                                        <option>Select</option>
                                        {ListOfState && ListOfState?.data?.map((item: any, index: any) => (
                                            <option value={item?.id} selected={item?.id === data?.state_id}>{item?.name}</option>

                                        ))}
                                    </select>
                                    <p className="text-[red]">
                                        {error && error.state_id}
                                    </p>
                                </FormItem>

                            </div>
                            <div className="flex">
                                <FormItem
                                    label="Firm Registered Address"
                                    className="rounded-lg pl-[22px] w-1/2"
                                    asterisk={true}
                                >
                                    <Field
                                        disabled={isDisabled}
                                        type="text"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="address"
                                        value={data?.address}
                                        placeholder="Firm Registered Address"
                                        component={Input}
                                    />
                                    <p className="text-[red]">
                                        {error && error.address}
                                    </p>
                                </FormItem>
                                <FormItem
                                    label="Firm Registered PIN Code"
                                    className="rounded-lg pl-[22px] w-1/2"
                                >
                                    <Field
                                        disabled={isDisabled}
                                        type="text"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="pin_code"
                                        value={data?.pin_code}
                                        placeholder="Firm Registered PIN Code"
                                        component={Input}
                                    />
                                    <p className="text-[red]">
                                        {error && error.pin_code}
                                    </p>
                                </FormItem>
                            </div>
                            <div className="flex">
                                <FormItem
                                    label="GST Number"
                                    className="rounded-lg pl-[22px] w-1/2"
                                >
                                    <Field
                                        disabled={isDisabled}
                                        multiple
                                        type="text"
                                        maxLength={15}
                                        className="w-[90%]"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="gst_number"
                                        value={data?.gst_number}
                                        placeholder="GST Number"
                                        component={Input}
                                    />
                                    <label htmlFor='gstfile'>
                                        <PublishIcon className='text-center !mx-auto' />
                                    </label>
                                    <p className="text-[red]">
                                        {error && error.gst}
                                    </p>
                                    <Field
                                        disabled={isDisabled}
                                        multiple
                                        id="gstfile"
                                        style={{ display: "none" }}
                                        type="file"
                                        className="!hidden"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="gst_file"
                                        value={data?.firm_state}
                                        placeholder="GST Number"
                                        component={Input}
                                    />
                                    <p className="text-[red]">
                                        {error && error.gst_file}
                                    </p>
                                </FormItem>

                                <FormItem
                                    label="Pan Number"
                                    className="rounded-lg pl-[22px] w-1/2"
                                    asterisk={true}
                                >
                                    <Field
                                        disabled={isDisabled}
                                        multiple
                                        type="text"
                                        maxLength={10}
                                        className="w-full"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="pan_number"
                                        value={data?.pan_number}
                                        placeholder="Pan Card No."
                                        component={Input}
                                    />
                                    {/* <label htmlFor='gstfile'>
                                        <PublishIcon className='text-center !mx-auto' />
                                    </label> */}
                                    <p className="text-[red]">
                                        {error && error.pan_number}
                                    </p>
                                    {/* <Field
                                        disabled={isDisabled}
                                        multiple
                                        id="gstfile"
                                        style={{ display: "none" }}
                                        type="file"
                                        className="!hidden"
                                        autoComplete="off"
                                        onChange={(e: any) =>
                                            handleChange(e)
                                        }
                                        name="gst_file"
                                        value={data?.firm_state}
                                        placeholder="GST Number"
                                        component={Input}
                                    />
                                    <p className="text-[red]">
                                        {error && error.gst_file}
                                    </p> */}
                                </FormItem>
                                
                            </div>
                        </FormContainer>
                    </Form>
                </Formik>

                {/* share holder details */}
                {firmType === 'Private Limited' &&
                    <>
                        {Array.from({ length: shareHolder }, (_, index) => (<><h4 className="text-head-title text-center">Share Holder Information</h4>
                            {SHModal && <ShareHolderModal fetchShare={fetchShare} formData={formDataShare} setformData={setformDataShare} data={data} setData={setData} modal={SHModal} setModal={setSHModal} />}</>))}
                        {SareList?.data && <ShareHolderTable modal={SHModal} setModal={setSHModal} formData={formDataShare} setformData={setformDataShare} AllStore={SareList?.data} tableHead={tableShareHead} />}
                        {SareList?.data?.length < 1 ? <button className='w-full bg-gray-400 rounded-lg py-2 mb-4' onClick={() => setSHModal(true)}>+ Add  Share Holder</button> : <button className='w-full bg-gray-400 rounded-lg py-2 mb-4' onClick={() => setSHModal(true)}>+ Add Another Share Holder</button>}
                        {error && error.shareholder_ids}
                    </>}


                {/* branch details */}
                <div>
                    {!branch && <>
                        <h4 className="text-head-title text-center">Branch Information6</h4>
                        {BranchModal && <BranchsModal fetchBranch={fetchBranch} data={data} setData={setData} modal={BranchModal} setModal={setBranchModal} formData={formDataBranch} setformData={setformDataBranch} />}
                        {BranchList?.data && <BranchTable modal={BranchModal} setModal={setBranchModal} formData={formDataBranch} setformData={setformDataBranch} AllStore={BranchList?.data} tableHead={tableBranchHead} />}
                        <p className="text-[red]">{error && error.branch_ids}</p>
                    </>}
                    <button className='w-full bg-gray-400 rounded-lg py-2' onClick={() => setBranchModal(true)}>+ Add Branch Details</button>
                </div>

                {/* final submit button */}
                <div className='flex'>
                    <Button
                        style={{ borderRadius: '13px' }}
                        block
                        disabled
                        variant="solid"
                        type="button"
                        role='button'
                        onClick={() => navigate(-1)}
                        className="indigo-btn !w-[200px] !bg-gray-500 m-4 mx-auto rounded-[30px]"
                    >
                        Prev
                    </Button>
                    <Button
                        block
                        style={{ borderRadius: "13px" }}
                        loading={isSubmitting}
                        // disabled={isDisabled}
                        variant="solid"
                        onClick={handlesubmit}
                        className='indigo-btn mt-4 !w-[30%] mx-auto rounded-xl shadow-lg'
                    >
                        {isSubmitting
                            ? 'Saving...'
                            : 'Save & Next'}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo
