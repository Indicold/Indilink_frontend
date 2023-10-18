/*
 * The above code is a TypeScript React component that renders a modal for selecting a business type.
 * It imports various dependencies and custom hooks for handling API requests and form data.
 */
import { apiUrl, getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React, { useEffect, useState } from 'react'
import { Button, FormItem, Input } from '@/components/ui'
import { CiImageOn } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { Field } from 'formik'
import usePostApi from '@/store/customeHook/postApi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import LoaderSpinner from '@/components/LoaderSpinner'
import { messageView } from '@/store/customeHook/validate'

const BussinessTypeModal = () => {
    const [assetsType, setAssetsType] = useState<any>(1)

    const { token }: any = getToken()
    const { data, loading, error } = useApiFetch<any>(
        'master/get-asset-types',
        token
    )
    const {
        data: countryId,
        loading: countryIdLoading,
        error: countryIdError,
    } = useApiFetch<any>('master/get-countries', token)
    const {
        data: CategoryId,
        loading: CategoryIdLoading,
        error: CategoryIdError,
    } = useApiFetch<any>('master/get-categories', token)
    const {
        result: AssetsResponse,
        loading: AssetsLoading,
        sendPostRequest: PostAssetsDetails,
    }: any = usePostApi(`partner/selectAsset`)
    const {
        result: QueryResponse,
        loading:QLoading,
        sendPostRequest: PostQueryDetails,
    }: any = usePostApi(`customer/general/search`)
    
    const [modal, setModal] = useState(true)
    const navigate = useNavigate()
    const [Bussiness, setBussiness] = useState('')
    const [formData, setFormData] = useState<any>({})
    const [Query,setQuery]=useState<any>('')

    /**
     * The `handleRoute` function sets various values in local storage based on user type and business
     * type, and then navigates to different routes depending on the conditions.
     */
    let title_id: any = ''
    let asset_type_id: any = ''
    const handleRoute = () => {
     

        localStorage.setItem('bussiness_type', Bussiness)

        let body: any = {
            title_id:
                localStorage.getItem('user_type') === 'Partner'
                    ? 1
                    : localStorage.getItem('user_type') === 'Investor'
                    ? 3
                    : 2,
            asset_type_id:
                Bussiness === 'Store' ? 1 : Bussiness === 'Move' ? 2 : 3,
            country_id: formData?.country_id,
            category_id: formData?.category_id,
        }
        console.log(
            localStorage.getItem('asset_id'),
            typeof localStorage.getItem('asset_id')
        )
        localStorage.setItem('country_id', formData?.country_id)
        localStorage.setItem('category_id', formData?.category_id)

        PostAssetsDetails(body)
      
    }
    console.log('datadatadata', countryId)

    const handleCloseModal = () => {
        setModal(false);
        console.log("user type close modal", localStorage.getItem('user_type'));
        if (localStorage.getItem('user_type') === 'Customer') {
            navigate('/home')
        }
        if (localStorage.getItem('user_type') === 'Partner') {
            navigate('/partner-dashbord')
        }
        if (localStorage.getItem('user_type') === 'Investor') {
            navigate('/investor-dashbord')
        }
    }
useEffect(()=>{
    console.log('AssetsResponse',AssetsResponse?.message?.asset_id);
    
if(AssetsResponse?.message || AssetsResponse?.data){
    messageView(AssetsResponse?.message?.message)
    setTimeout(() => {
        if (localStorage.getItem('user_type') === 'Partner') {
            // localStorage.removeItem('assets_list_id')
            title_id = 1
            if (Bussiness === 'Move') {
                setAssetsType(2)
                asset_type_id = 2
                navigate(`/partner-bussiness-type-move/${AssetsResponse?.data}`)
            }
            if (Bussiness === 'Prepare') {
                setAssetsType(3)
                asset_type_id = 3
                navigate(`/partner-bussiness-type-prepare/${AssetsResponse?.data}`)
            }
            if (Bussiness === 'Store') {
                asset_type_id = 1
                setAssetsType(1)
                navigate(`/partner-registration/${AssetsResponse?.data}`)
            }
        }
        if (localStorage.getItem('user_type') === 'Investor') {
            title_id = 3
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
        localStorage.setItem('asset_id', asset_type_id)
        localStorage.setItem('AssetId', AssetsResponse?.message?.asset_id)
    }, 2000)
}
},[AssetsResponse?.message,AssetsResponse?.data])
    /**
     * The handleChange function updates the formData state with the new value from the input field and
     * logs the countryId.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It is typically an event object that is triggered by a user interaction, such as a
     * button click or input change.
     */
    const handleChange = (e: any) => {
        const newData = { ...formData }
        newData[e.target.name] = e.target.value
        setFormData(newData)
        console.log('datadatadata', countryId)
    }
    /**
     * The function `messageView` displays a success toast message with a custom style and auto-closes
     * after 3 seconds.
     * @param {any} messagevalue - The message value is the text that you want to display in the toast
     * message. It can be any string or variable that contains the message you want to show.
     */
 
    console.log('AssetsResponse', AssetsResponse)

    /* The `useEffect` hook is used to perform side effects in a React component. In this case, the
  effect is triggered whenever the `AssetsResponse` variable changes. */
  console.log('ATTTTTT', AssetsResponse?.message?.asset_id)

    useEffect(() => {
        if (AssetsResponse?.message?.asset_id) {
            localStorage.setItem('assets_list_id',AssetsResponse?.message?.asset_id)

            // messageView(AssetsResponse?.message)
        }
        if (AssetsResponse?.data && AssetsResponse?.status) {
            localStorage.setItem('AssetsId', AssetsResponse?.data)
        }
    }, [AssetsResponse,AssetsResponse?.message?.asset_id,AssetsResponse?.data])
    useEffect(()=>{
        if(QueryResponse?.data){
            messageView(QueryResponse?.data)
            if(QueryResponse?.status===200){
                setTimeout(()=>{
                    navigate('/ticket_list')
                },2000)
            }
        
         
        }

    },[QueryResponse?.data])

    return (
        <div>
            <ToastContainer />
            {modal && (
                <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className={`relative w-full ${localStorage.getItem('user_type') ===
                                    'Customer' ?"max-w-[900px]" :"max-w-[800px]" }  mt-[50px] max-h-full`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={handleCloseModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>

                            <div className="px-6 py-6 lg:px-8">
                                <h4 className="text-head-title  mb-4">
                                    {localStorage.getItem('user_type') ===
                                    'Customer'
                                        ? 'Request for solution'
                                        : 'Choice on Business'}{' '}
                                </h4>
                                <p>You may also change later</p>

                                <div className="flex justify-around grid grid-cols-3 grid-flow-col gap-2">
                       
                                    {data ? (
                                        
                                        data?.data.slice(0,localStorage.getItem('user_type') ===
                                        'Customer' ? 4:3).map(
                                            (item: any, index: any) => (
                                                <div
                                                    role="button"
                                                    key={index}
                                                    onClick={() =>
                                                        setBussiness(item?.type)
                                                    }
                                                    style={{
                                                        backgroundColor: `${
                                                            Bussiness ==
                                                            item?.type
                                                                ? '#CBD9D4'
                                                                : ''
                                                        }`,
                                                    }}
                                                    className="m-4 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
                                                >
                                                    <CiImageOn className="text-6xl mx-auto" />
                                                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                                        {item?.type}
                                                    </h5>
                                                    <p>sample Caption</p>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <LoaderSpinner />
                                    )}
                                </div>
                             {Bussiness==='General' &&   <div className='flex justify-around w-[80%] mx-auto items-center'>
                                <FormItem
                                            label="General Query"
                                            className="mx-auto w-1/2"
                                        >
                                       <input type='text'
                                     className=" h-11 block w-full border border-gray-200 
                                     shadow-sm rounded-md text-sm 
                                     focus:z-10 focus:border-blue-500 focus:ring-blue-500
                                      dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
                                                file:bg-transparent file:border-0
                                          file:bg-gray-100 file:mr-4
                                        file:py-3 file:px-4
                                               dark:file:bg-gray-700 dark:file:text-gray-400"
                                               placeholder='Enter your query'
                                    onChange={(e:any)=>setQuery(e.target.value)}
                                       />
                                        </FormItem>
                                        <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={()=>PostQueryDetails({description:Query})}
                                        className="indigo-btn !w-[30%] mt-6 mx-auto rounded-[30px]"
                                    >
                                        Send Query
                                    </Button>
                                        </div>}
                                {localStorage.getItem('user_type') ===
                                    'Partner' && Bussiness !== 'Move' && Bussiness!=='general'  && (
                                    <div className="flex">
                                        <FormItem
                                            label="Select Country"
                                            className="mx-auto w-1/2"
                                        >
                                            <select
                                                name="country_id"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select Country</option>
                                                {countryId &&
                                                    countryId?.data?.map(
                                                        (
                                                            item: any,
                                                            index: any
                                                        ) => (
                                                            <option
                                                                value={item?.id}
                                                            >
                                                                {item?.name}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        </FormItem>
                                        <FormItem
                                            label="Category"
                                            className="mx-auto w-1/2"
                                        >
                                            <select
                                                name="category_id"
                                                onChange={(e: any) =>
                                                    handleChange(e)
                                                }
                                                className="h-11 border w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            >
                                                <option>Select</option>
                                                {CategoryId &&
                                                    CategoryId?.data
                                                        ?.filter(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) =>
                                                                item?.asset_type_id ==
                                                                assetsType
                                                        )
                                                        .map(
                                                            (
                                                                item: any,
                                                                index: any
                                                            ) => (
                                                                <option
                                                                    value={
                                                                        item?.asset_type_id
                                                                    }
                                                                >
                                                                    {item?.name}
                                                                </option>
                                                            )
                                                        )}
                                            </select>
                                        </FormItem>
                                    </div>
                                )}
                              {Bussiness!=='General' &&   <div className="flex">
                                 { Bussiness==='Move' ?  <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRoute}
                                        className="indigo-btn !w-[30%] mx-auto rounded-[30px]"
                                    >
                                        Next
                                    </Button> :
                                    <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    disabled={localStorage.getItem('user_type') === 'Partner' ? (Bussiness == '' || !formData?.country_id || !formData?.category_id) : Bussiness === ''}
                                    variant="solid"
                                    type="button"
                                    onClick={handleRoute}
                                    className="indigo-btn !w-[30%] mx-auto rounded-[30px]"
                                >
                                    Next
                                </Button> 
                                    }
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BussinessTypeModal
