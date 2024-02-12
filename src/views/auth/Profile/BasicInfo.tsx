import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { apiUrl, getToken } from '@/store/token'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import ShareHolderModal from './profileModal/shareHolderModal'
import BranchsModal from './profileModal/branchModal'
import ShareHolderTable from './profileTables/shareHoldersTable'
import BranchTable from './profileTables/branchTable'
import PublishIcon from '@mui/icons-material/Publish'
import {
    messageView,
    messageViewNew,
    onkeyDownOne,
    onkeyDownPincode,
    onkeyDownforNumMobSpecialCharcterOnly,
    onkeyDownforNumMobSpecialCharcterOnlyAndFormPanCardGSTNumber,
    validateBasicForm,
} from '@/store/customeHook/validate'
import usePostApi from '@/store/customeHook/postApi'
import { ToastContainer } from 'react-toastify'
import { TokenInfo } from '@/store/customeHook/token'
const tableShareHead: any = {
    shareholder_email: 'Email ID',
    full_name: 'Name',
    percentage_holding: '% Holding',
    authorized_signatory: 'Signatory',
    Action: 'Action',
}
const tableBranchHead: any = {
    branch_email: 'Email ID',
    name: 'Name',
    branch_gst: 'GST Number',
    branch_head: 'Head',
    Action: 'Action',
}
const BasicInfo = () => {
    const isDisabled: any = !true
    const [SHModal, setSHModal] = useState<any>(false)
    const [BranchModal, setBranchModal] = useState<any>(false)
    const [error, setErrors] = useState<any>({})
    const [formDataShare, setformDataShare] = useState<any>({
        full_name: '',
        percentage_holding: '',
        address: '',
        phone_number: '',
        shareholder_email: '',
        designation: '',
        din_number: '',
        authorized_signatory: '',
    })
    const [formDataBranch, setformDataBranch] = useState<any>({
        name: '',
        address: '',
        branch_gst: '',
        branch_email: '',
        branch_head: '',
        branch_phone: '',
    })
    const [data, setData] = useState<any>({
        country_id: '',
        state_id: '',
        address: '',
        pin_code: '',
        pan_number: '',
        gst_number: [],
        gst_file: [],
        shareholder_ids: [],
        branch_ids: [],
    })
    const handleChange = (e: any) => {
        const newdata: any = { ...data }
        if (e.target.name === 'gst_file') {
            console.log('TTTTTTTTT', e.target)

            newdata[e.target.name] = Array.from(e.target.files)
        } else if (e.target.name === 'vehicle_count') {
            if (
                e.target.value == 'e' ||
                e.target.value == '-' ||
                e.target.value == '+' ||
                e.target.value == 'E' ||
                e.target.value == '='
            ) {
                e.preventDefault()
            } else {
                newdata[e.target.name] = e.target.value
            }
        } else if (e.target.name === 'doc_for_vehicle') {
            newdata[e.target.name] = Array.from(e.target.files)
        } else {
            newdata[e.target.name] = e.target.value
        }
        setData(newdata)
        if (error[e.target.name]) validateBasicForm(newdata, setErrors)
    }

    const navigate = useNavigate()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { token }: any = getToken()
    const { aud }: any = TokenInfo()
    const {
        data: ListOfCountry,
        loading: LCloading,
        error: LCerror,
    } = useApiFetch<any>(`master/get-countries`, token)

    const {
        data: companyDetails,
        loading: CDloading,
        error: CDerror,
    } = useApiFetch<any>(`auth/get-company-for-basic-details`, token)

    const {
        data: ListOfState,
        loading: LOSloading,
        error: LOSerror,
    } = useApiFetch<any>(
        `master/get-state-by-countryId/${data?.country_id || 101}`,
        token
    )

    const {
        data: BasicInfo,
        loading: LIloading,
        error: BIerror,
    } = useApiFetch<any>(`auth/basic-details`, token)

    const {
        data: SareList,
        loading: Shareloading,
        error: ShareListerror,
        refetch: fetchShare,
    } = useApiFetch<any>(`auth/shareholder`, token)

    const {
        data: BranchList,
        loading: Branchloading,
        error: BranchListerror,
        refetch: fetchBranch,
    } = useApiFetch<any>(`auth/branches`, token)

    const { result: AssetsResponse }: any = useApiFetch(
        `auth/basic-details`,
        token
    )

    const [branch, setBranch] = useState(false)

    const [shareHolder, setShareHolder] = useState(1)
    const firmType = companyDetails?.data[0]?.firm_type
    console.log('RTYRTYRYTR', data)

    const handlesubmit = (e: any) => {
        if (validateBasicForm(data, setErrors)) {
            var myHeaders = new Headers()
            myHeaders.append('Authorization', `Bearer ${token}`)

            var formdata = new FormData()
            formdata.append('country_id', data?.country_id)
            formdata.append('state_id', data?.state_id)
            formdata.append('address', data?.address)
            formdata.append('pin_code', data?.pin_code)
            formdata.append('gst', data?.gst_number)
            formdata.append('pan_number', data?.pan_number)
            formdata.append('vehicle_count', data?.vehicle_count)
            // Assuming you have an array of File objects for gst_files
            var gstFiles = data?.gst_file // Add more files as needed

            if (gstFiles)
                gstFiles?.forEach((file: any, index: any) => {
                    formdata.append(`gst_file`, file)
                })
            var vehicleFiles = data?.doc_for_vehicle // Add more files as needed
            console.log('TRRRRRRRR', vehicleFiles)

            if (vehicleFiles)
                vehicleFiles?.forEach((file: any, index: any) => {
                    formdata.append(`doc_for_vehicle`, file)
                })

            var shareholderIds = data?.shareholder_ids // Replace with your dynamic data
            var branchIds = data?.branch_ids // Replace with your dynamic data

            shareholderIds?.forEach((id: any, index: any) => {
                formdata.append(`shareholder_ids`, id)
            })

            branchIds?.forEach((id: any, index: any) => {
                formdata.append(`branch_ids`, id)
            })

            var requestOptions: any = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            }
            var requestOptionsUpdate: any = {
                method: 'PUT',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow',
            }
            console.log('tttuutttt', BasicInfo?.data[0]?.gst_file?.length > 0)

            if (
                BasicInfo?.data?.length > 0 &&
                (BasicInfo?.data[0]?.gst_file?.length > 0 || data?.country_id)
            ) {
                fetch(
                    `${apiUrl}/auth/basic-detail/${data?.id}`,
                    requestOptionsUpdate
                )
                    .then((response) => response.json())
                    .then((result) => {
                        messageViewNew(result)
                        if (result?.status == 200) {
                            navigate('/key-management')
                        }
                    })
                    .catch((error) => {
                        messageViewNew(error)
                    })
            } else {
                fetch(`${apiUrl}/auth/basic-detail`, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        messageViewNew(result)
                        if (result?.status == 200) {
                            navigate('/key-management')
                        }
                    })
                    .catch((error) => {
                        messageViewNew(error)
                    })
            }
        }
    }

    useEffect(() => {
        if (SareList?.data) {
            let newarrs: any =
                SareList?.data?.map((item: any) => item?.id) || []
            let newarr: any =
                BranchList?.data?.map((item: any) => item?.id) || []
            setData({ ...data, branch_ids: newarr, shareholder_ids: newarrs })
        }
    }, [SareList?.data])

    useEffect(() => {
        if (BranchList?.data) {
            let newarrs: any =
                SareList?.data?.map((item: any) => item?.id) || []
            let newarr: any =
                BranchList?.data?.map((item: any) => item?.id) || []
            setData({ ...data, branch_ids: newarr, shareholder_ids: newarrs })
        }
    }, [BranchList?.data])

    // useEffect(() => {
    //     if (companyDetails?.data?.length>0) {
    //         setData(
    //             {
    //                 ...data,
    //                 country_id: companyDetails?.data[0].country_id,
    //                 state_id: companyDetails?.data[0].state_id,
    //                 address: companyDetails?.data[0].address,
    //                 pin_code: companyDetails?.data[0].pin_code,
    //                 gst_number: companyDetails?.data[0].gst
    //             })

    //     }
    // }, [companyDetails?.data])
    console.log('TRRT', companyDetails)

    useEffect(() => {
        if (BasicInfo && companyDetails?.data[0]) {
            let newarrs: any =
                SareList?.data?.map((item: any) => item?.id) || []
            let newarr: any =
                BranchList?.data?.map((item: any) => item?.id) || []
            setData({
                ...BasicInfo?.data[0],
                gst_file: BasicInfo?.data,
                country_id: companyDetails?.data[0]?.country_id || 101,
                state_id:
                    companyDetails?.data[0].state_id ||
                    BasicInfo?.data[0]?.state_id,
                address: companyDetails?.data[0].address || '',
                pin_code: companyDetails?.data[0].pin_code || '',
                pan_number: companyDetails?.data[0]?.pan,
                gst_number:
                    BasicInfo?.data[0]?.gst ||
                    companyDetails?.data[0].gst ||
                    '',
                branch_ids: newarr,
                shareholder_ids: newarrs,
            })
        }
    }, [BasicInfo?.data, companyDetails?.data])

    return (
        <div className="lg:flex">
            {/* <ToastContainer /> */}

            {/* main component */}
            <div className="bg-white w-[100%] mb-5 lg:flex lg:p-8 py-3 shadow-2xl">
                {/* stepper start */}
                <div className=" md:w-1/6 w-[100%] pl-[10%] md:pl-10 lg:pl-0 lg:w-1/5">
                    <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <svg
                                    className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 12"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5.917 5.724 10.5 15 1.5"
                                    />
                                </svg>
                            </span>
                            <h6 className="font-medium leading-tight">
                                User Signup
                            </h6>
                            {/* <p className="text-sm">Step details here</p> */}
                        </li>
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <svg
                                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 20 16"
                                >
                                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                </svg>
                            </span>
                            <h6 className="font-medium leading-tight">
                                Basic Information
                            </h6>
                            {/* <p className="text-sm">Step details here</p> */}
                        </li>
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <svg
                                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                </svg>
                            </span>

                            <h6 className="font-medium leading-tight">
                                Key Management Personal
                            </h6>
                            {/* <p className="text-sm">Step details here</p> */}
                        </li>
                        <li className="mb-10 ml-6">
                            <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                                <svg
                                    className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 20"
                                >
                                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                                </svg>
                            </span>

                            <h6 className="font-medium leading-tight">
                                Account Details
                            </h6>
                            {/* <p className="text-sm">Step details here</p> */}
                        </li>
                    </ol>
                </div>
                {/* stepper end */}
                <div className="w-full p-2">
                    {/* <ArrowBackIcon className='ms-3' onClick={() => navigate(-1)} /> */}
                    <h4 className="text-head-title text-center">
                        Basic Information
                    </h4>
                    {/* pre filled common form */}
                    <Formik
                        initialValues={{ field: true }}
                        onSubmit={() =>
                            console.log('Submited via my onSubmit function')
                        }
                    >
                        <Form className="py-2 multistep-form-step">
                            <FormContainer>
                                <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%]  lg:flex">
                                    <FormItem
                                        label="Firm Registered Country"
                                        className="pl-3  w-[100%] lg:w-1/2  text-label-title m-auto"
                                        asterisk={true}
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="country_id"
                                            className="border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfCountry &&
                                                ListOfCountry?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            key={index}
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                data?.country_id
                                                            }
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.country_id}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Firm Registered State"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                        asterisk={true}
                                    >
                                        <select
                                            disabled={isDisabled}
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="state_id"
                                            className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                        >
                                            <option>Select</option>
                                            {ListOfState &&
                                                ListOfState?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            key={index}
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                data?.state_id
                                                            }
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.state_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%]  lg:flex">
                                    <FormItem
                                        label="Firm Registered Address"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
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
                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.address}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Firm Registered PIN Code"
                                        asterisk={true}
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            type="number"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="pin_code"
                                            value={data?.pin_code}
                                            placeholder="Firm Registered PIN Code"
                                            component={Input}
                                            onKeyDown={onkeyDownPincode}
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.pin_code}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%]  lg:flex">
                                    <FormItem
                                        label="GST Number"
                                        className="pl-3 w-[100%] lg:w-1/2 p-4 text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            multiple
                                            type="text"
                                            maxLength={15}
                                            className="w-[80%]"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="gst_number"
                                            value={
                                                data?.gst_number !== 'undefined'
                                                    ? data?.gst_number
                                                    : ''
                                            }
                                            placeholder="GST Number"
                                            component={Input}
                                            onKeyDown={
                                                onkeyDownforNumMobSpecialCharcterOnlyAndFormPanCardGSTNumber
                                            }
                                        />
                                        <label
                                            htmlFor="gstfile"
                                            className="w-[20%]"
                                        >
                                            <Button className=" !px-1 py-0">
                                                <PublishIcon className="text-center !mx-auto" />
                                            </Button>
                                        </label>
                                        <div className="flex">
                                            {data?.gst_file?.length > 0 && (
                                                <a
                                                    className=""
                                                    href={
                                                        data?.gst_file[0] || ''
                                                    }
                                                    target="_blank"
                                                >
                                                    view
                                                </a>
                                            )}
                                            <p className="text-[red] bg-black text-p-error-hight">
                                                {error && error.gst}
                                            </p>
                                        </div>
                                        <Field
                                            disabled={isDisabled}
                                            multiple
                                            id="gstfile"
                                            style={{ display: 'none' }}
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
                                            accept=".jpg, .jpeg, .png, .gif, .pdf"
                                        />
                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.gst_file}
                                        </p>
                                    </FormItem>

                                    <FormItem
                                        label="Pan Number"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                        asterisk={true}
                                    >
                                        <Field
                                            disabled={true}
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
                                            onKeyDown={
                                                onkeyDownforNumMobSpecialCharcterOnlyAndFormPanCardGSTNumber
                                            }
                                        />
                                        {/* <label htmlFor='gstfile'>
                                        <PublishIcon className='text-center !mx-auto' />
                                    </label> */}
                                        <p className="text-[red] h-[20px]">
                                            {error && error.pan_number}
                                        </p>
                                        <p className="text-[red] text-p-error-hight"></p>
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
                                    <p className="text-[red] text-p-error-hight">
                                        {error && error.gst_file}
                                    </p> */}
                                    </FormItem>
                                </div>
                                <div className="bg-gray-100 m-auto mt-2 rounded-md p-2 w-[90%]  lg:flex">
                                    <FormItem
                                        label="No. of Vehicle"
                                        className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                    >
                                        <Field
                                            disabled={isDisabled}
                                            multiple
                                            type="tel"
                                            maxLength={4}
                                            className="w-full"
                                            autoComplete="off"
                                            onChange={(e: any) =>
                                                handleChange(e)
                                            }
                                            name="vehicle_count"
                                            value={
                                                data?.vehicle_count !==
                                                'undefined'
                                                    ? data?.vehicle_count
                                                    : ''
                                            }
                                            placeholder="No. of Vehicle"
                                            component={Input}
                                            // onkeyDown={onkeyDownOne}
                                            onKeyDown={
                                                onkeyDownforNumMobSpecialCharcterOnly
                                            }
                                        />

                                        <p className="text-[red] text-p-error-hight">
                                            {error && error.gst}
                                        </p>
                                    </FormItem>
                                    {data?.vehicle_count > 10 ? (
                                        <FormItem
                                            label="Document for vehicle"
                                            className="pl-3 w-[100%] lg:w-1/2  text-label-title m-auto"
                                            asterisk={true}
                                        >
                                            <Field
                                                disabled={isDisabled}
                                                multiple
                                                id="doc_for_vehicle"
                                                // style={{ display: "none" }}
                                                type="file"
                                                // className="!hidden"
                                                autoComplete="off"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                name="doc_for_vehicle"
                                                value={data?.firm_state}
                                                component={Input}
                                            />
                                            <p className="text-[red] text-p-error-hight">
                                                {error && error.doc_for_vehicle}
                                            </p>
                                        </FormItem>
                                    ) : (
                                        <div className="w-1/2"></div>
                                    )}
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>

                    {/* share holder details */}
                    {/* {firmType === 'Private Limited' && */}
                    <div className="pt-10">
                        {Array.from({ length: shareHolder }, (_, index) => (
                            <>
                                <h4 className="text-head-title text-center">
                                    Share Holder Information
                                </h4>
                                <div className="text-center flex justify-end">
                                    {SareList?.data?.length < 1 ? (
                                        <button
                                            className=" bg-green-600 hover:bg-green-500 rounded-lg p-2 text-white"
                                            onClick={() => {
                                                setSHModal(true)
                                            }}
                                        >
                                            + Add Share Holder
                                        </button>
                                    ) : (
                                        <button
                                            className=" bg-green-600 hover:bg-green-500 text-white rounded-lg p-2"
                                            onClick={() => {
                                                setformDataShare({})
                                                setSHModal(true)
                                            }}
                                        >
                                            + Add Another Share Holder
                                        </button>
                                    )}
                                </div>
                                {SHModal && (
                                    <ShareHolderModal
                                        companyDetails={companyDetails}
                                        fetchShare={fetchShare}
                                        formData={formDataShare}
                                        setformData={setformDataShare}
                                        data={data}
                                        setData={setData}
                                        modal={SHModal}
                                        setModal={setSHModal}
                                    />
                                )}
                            </>
                        ))}
                        {SareList?.data && (
                            <ShareHolderTable
                                modal={SHModal}
                                setModal={setSHModal}
                                formData={formDataShare}
                                setformData={setformDataShare}
                                AllStore={SareList?.data}
                                tableHead={tableShareHead}
                            />
                        )}
                        <p className="text-[red] text-p-error-hight">
                            {error && error.shareholder_ids}
                        </p>
                    </div>
                    {/* } */}

                    {/* branch details */}
                    <div className="mt-6">
                        {!branch && (
                            <>
                                <h4 className="text-head-title text-center">
                                    Branch Information
                                </h4>
                                <div className="text-center flex justify-end">
                                    <button
                                        className=" p-4 text-white bg-green-600 hover:bg-green-500 rounded-lg py-2"
                                        onClick={() => {
                                            setformDataBranch({})
                                            setBranchModal(true)
                                        }}
                                    >
                                        + Add Branch Details
                                    </button>
                                </div>
                                {BranchModal && (
                                    <BranchsModal
                                        fetchBranch={fetchBranch}
                                        data={data}
                                        setData={setData}
                                        modal={BranchModal}
                                        setModal={setBranchModal}
                                        formData={formDataBranch}
                                        setformData={setformDataBranch}
                                    />
                                )}
                                {BranchList?.data && (
                                    <BranchTable
                                        modal={BranchModal}
                                        setModal={setBranchModal}
                                        formData={formDataBranch}
                                        setformData={setformDataBranch}
                                        AllStore={BranchList?.data}
                                        tableHead={tableBranchHead}
                                    />
                                )}
                                <p className="text-[red] text-p-error-hight">
                                    {error && error.branch_ids}
                                </p>
                            </>
                        )}
                    </div>

                    {/* final submit button */}
                    <div className="lg:flex gap-10  pl-6 pr-6">
                        <Button
                            style={{ borderRadius: '13px' }}
                            block
                            disabled
                            variant="solid"
                            type="button"
                            role="button"
                            onClick={() => navigate(-1)}
                            className="indigo-btn mt-4  bg-green-600 hover:bg-green-500  rounded-[30px]"
                        >
                            Prev
                        </Button>
                        <Button
                            block
                            style={{ borderRadius: '13px' }}
                            loading={isSubmitting}
                            // disabled={isDisabled}
                            variant="solid"
                            onClick={handlesubmit}
                            className="indigo-btn bg-green-600 hover:bg-green-500 mt-4 rounded-xl shadow-lg"
                        >
                            {isSubmitting ? 'Saving...' : 'Save & Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BasicInfo
