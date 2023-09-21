import { Button, FormContainer, FormItem, Input } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import ChamberDetailModal from './MultistepForm/ChamberDetailModal'
import { useLocation, useNavigate } from 'react-router-dom'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { apiUrl, getToken } from '@/store/customeHook/token'
import CAEquipmentsModal from './MultistepForm/CAEquipmentsModal'
import CompressorModal from './MultistepForm/CompressorModal'
import ACUModall from './MultistepForm/ACUModal'
import CondensorDetailsModal from './MultistepForm/CondensorDetailsModal'
import AMCDetailModal from './MultistepForm/AMCDetailModal'
import IOTDetailModal from './MultistepForm/IOTDetailModal'
import ITDetailModal from './MultistepForm/ITDetailModal'
import GeneratorDetailModal from './MultistepForm/GeneratorDetailModal'
import MHEDetailsModal from './MultistepForm/MHEDetails'
import SolarInverterModal from './MultistepForm/SolarInverterModal'
import {
    messageView,
    validateStorePartnerForm,
} from '@/store/customeHook/validate'
import { ToastContainer } from 'react-toastify'
import {
    Accordion,
    AccordionItem,
    AccordionItemButton,
    AccordionItemHeading,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import LoaderSpinner from '@/components/LoaderSpinner'
import { payload, payload1 } from '@/store/Payload'
// import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Define the StoreRegistration component
const StoreRegistration = () => {
    // Fetch the user's token
    const { token }: any = getToken()

    // Get the assets list ID from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')

    // Fetch various data from APIs using custom hooks
    const {
        data: ColdStorageType,
        loading: CSLoading,
        error,
    } = useApiFetch<any>('master/partner/store/type-of-cold-storage', token)
    const {
        data: StorageType,
        loading: Sloading,
        error: Serror,
    } = useApiFetch<any>('master/partner/store/get-store-type', token)
    const {
        data: DocksType,
        loading: Dockloading,
        error: DockSerror,
    } = useApiFetch<any>('master/partner/store/type-of-docks', token)
    const {
        data: RefType,
        loading: Refloading,
        error: RefSerror,
    } = useApiFetch<any>('master/partner/store/type-of-refrigeration', token)
    const {
        data: CityById,
        loading: CityByIdloading,
        error: CityByIdSerror,
    } = useApiFetch<any>(`master/get-city-by-countryId/101`, token)
    const {
        data: WeighBridge,
        loading: WeighBridgeloading,
        error: WeighBridgeSerror,
    } = useApiFetch<any>('master/partner/store/get-weight-bridge', token)
    const {
        data: RoadCondition,
        loading: RoadConditionloading,
        error: RoadConditionSerror,
    } = useApiFetch<any>('master/partner/store/get-road-condition', token)
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/store/${AssetsId}`, token)

    // Manage state variables for modals and other components
    const [chamberModal, setChamberModal] = useState(false)
    const [CAModal, setCAModal] = useState<any>(false)
    const [compModal, setCompModal] = useState<any>(false)
    const [ACUModal, setACUModal] = useState<any>(false)
    const [condensorModal, setCondensorModal] = useState<any>(false)
    const [AMCModal, setAMCModal] = useState<any>(false)
    const [IOTModal, setIOTModal] = useState<any>(false)
    const [ITModal, setITModal] = useState<any>(false)
    const [genModal, setGenModal] = useState<any>(false)
    const [MHEModal, setMHEModal] = useState<any>(false)
    const [SEModal, setSEModal] = useState<any>(false)

    // Fetch the current location
    const location = useLocation()

    // Initialize state variables for form data and errors
    const [dataa, setData] = useState<any>(
        payload1 || {
            chamber_ids: [3],
        }
    )

    const [errors, setErrors] = useState<any>({})

    // Access the navigate function from React Router
    const navigate = useNavigate()

    // Handle the form submission
    const handleRoute = async () => {
        const { token }: any = getToken()

        // Validate the form data
        if (validateStorePartnerForm(dataa, setErrors)) {
            try {
                // Set the asset_id based on local storage
                dataa.asset_id = localStorage.getItem('assets_list_id')

                // Define the HTTP request configuration
                const config = {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(dataa),
                }

                // Send the HTTP request to register the store
                const response = await fetch(
                    `${apiUrl}/partner/store/register`,
                    config
                )
                const result = await response.json()

                if (result?.status) {
                    // Display a success message and navigate to a new page
                    messageView(result.message)
                    navigate('/partner-bussiness-type-compliance')

                    if (result?.status === 200) {
                        setTimeout(() => {
                            navigate('/partner-bussiness-type-compliance')
                        }, 2000)
                    }
                } else {
                    // Display an error message
                    messageView(result?.message)
                }
            } catch (error: any) {
                // Handle any errors that occur during the request
                messageView(error.message)
            }
        } else if (location?.state) {
            // Navigate to another page if there's state data
            navigate('/partner-bussiness-type-compliance', { state: true })
        }
    }

    // Handle changes to form input fields
    const handlechange = (e: any) => {
        const newData: any = { ...dataa }
        newData[e.target.name] = e.target.value
        setData(newData)
    }

    // Use useEffect to update form data when fetchDetails changes
    useEffect(() => {
        if (fetchDetails?.data !== null) {
            setData(fetchDetails?.data)
        }
    }, [fetchDetails])

    return (
        <div className='flex'>
            <div className='w-1/6'>
            

            <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">                  
    <li className="mb-10 ml-6">            
    <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Asset Specifications</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Compliance Details</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
    <li className="mb-10 ml-6">
        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"/>
            </svg>
        </span>
        <h6 className="font-medium leading-tight">Additional submissions</h6>
        {/* <p className="text-sm">Step details here</p> */}
    </li>
</ol>




            </div>
            {(CSLoading ||
                Sloading ||
                Dockloading ||
                Refloading ||
                CityByIdloading ||
                WeighBridgeloading ||
                RoadConditionloading ||
                fetchDetailsloading) && <LoaderSpinner />}
            <div className="bg-white p-4 rounded w-5/6">
                <ToastContainer />
                <h4 className="text-center text-head-title">Store</h4>
                <Formik
                    initialValues={{ field: true }}
                    onSubmit={() =>
                        console.log('Submited via my onSubmit function')
                    }
                >
                    {({ handleSubmit }) => (
                        <Form className="py-2 ">
                            {chamberModal && (
                                <ChamberDetailModal
                                    modal={chamberModal}
                                    formD={dataa}
                                    update={setData}
                                    setModal={setChamberModal}
                                />
                            )}

                            {CAModal && (
                                <CAEquipmentsModal
                                    modal={CAModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setCAModal}
                                />
                            )}

                            {compModal && (
                                <CompressorModal
                                    modal={compModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setCompModal}
                                />
                            )}

                            {ACUModal && (
                                <ACUModall
                                    modal={ACUModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setACUModal}
                                />
                            )}

                            {condensorModal && (
                                <CondensorDetailsModal
                                    modal={condensorModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setCondensorModal}
                                />
                            )}

                            {AMCModal && (
                                <AMCDetailModal
                                    modal={AMCModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setAMCModal}
                                />
                            )}

                            {IOTModal && (
                                <IOTDetailModal
                                    modal={IOTModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setIOTModal}
                                />
                            )}

                            {ITModal && (
                                <ITDetailModal
                                    modal={ITModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setITModal}
                                />
                            )}

                            {genModal && (
                                <GeneratorDetailModal
                                    modal={genModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setGenModal}
                                />
                            )}

                            {MHEModal && (
                                <MHEDetailsModal
                                    modal={MHEModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setMHEModal}
                                />
                            )}

                            {SEModal && (
                                <SolarInverterModal
                                    modal={SEModal}
                                    formD={dataa}
                                    update={setData}
                                    setData={setData}
                                    setModal={setSEModal}
                                />
                            )}

                            <FormContainer>
                                <div className="flex">
                                    <FormItem
                                        label="City"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600"
                                            name="city_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                        >
                                            <option disabled selected>Select City</option>
                                            {CityById &&
                                                CityById?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.city_id
                                                            }
                                                        >
                                                            {item?.name}
                                                        </option>
                                                    )
                                                )}
                                            <option>Other</option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.city_id}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Address"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="text"
                                            autoComplete="off"
                                            name="address"
                                            value={dataa?.address}
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            placeholder="Address"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.address}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Total tonnage"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            name="total_tonnage"
                                            value={dataa?.total_tonnage}
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            placeholder="Enter Value"
                                            component={Input}
                                        />

                                        <p className="text-[red]">
                                            {errors && errors.total_tonnage}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Type of Store"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="store_type_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Type of Store
                                            </option>
                                            {StorageType &&
                                                StorageType?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.store_type_id
                                                            }
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.store_type_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Type of Cold Storage"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="cold_storage_type_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Choose Cold Storage
                                            </option>
                                            {ColdStorageType &&
                                                ColdStorageType?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.cold_storage_type_id
                                                            }
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.cold_storage_type_id}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Total number of chambers"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            name="no_of_chambers"
                                            placeholder="Total number of chambers"
                                            value={dataa?.no_of_chambers}
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.no_of_chambers}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Ante Room - Area"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0"
                                                value={dataa?.ante_room_area}
                                                type="number"
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="ante_room_area"
                                                placeholder="Enter value"
                                            />
                                            <select
                                                disabled={location?.state}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                                <option>B</option>
                                            </select>
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.ante_room_area}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Total number of docks"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            name="total_number_of_docks"
                                            placeholder="Total number of docks"
                                            value={dataa?.total_number_of_docks}
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.total_number_of_docks}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Total office space"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0"
                                                value={
                                                    dataa?.total_office_space
                                                }
                                                type="number"
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="total_office_space"
                                                placeholder="Enter value"
                                            />
                                            <select
                                                disabled={location?.state}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                                <option>B</option>
                                            </select>
                                        </div>
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.total_office_space}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Type of docks"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="type_of_dock_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Choose Cold Storage
                                            </option>
                                            {DocksType &&
                                                DocksType?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.type_of_dock_id
                                                            }
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.type_of_dock_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Processing Area"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0"
                                                value={dataa?.processing_area}
                                                type="number"
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="processing_area"
                                                placeholder="Enter value"
                                            />
                                            <select className="border-0">
                                                <option>Square feet</option>
                                                <option>B</option>
                                            </select>
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.processing_area}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Parking Area"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0"
                                                type="number"
                                                value={dataa?.parking_area}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="parking_area"
                                                placeholder="Enter value"
                                            />
                                            <select className="border-0">
                                                <option>Square feet</option>
                                                <option>B</option>
                                            </select>
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.parking_area}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Type of Refrigeration"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="type_of_refrigeration_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Choose Cold Storage
                                            </option>
                                            {RefType &&
                                                RefType?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.type_of_refrigeration_id
                                                            }
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.type_of_refrigeration_id}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Year of Installation"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            min="1990"
                                            max="2023"
                                            autoComplete="off"
                                            name="installation_year"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            value={dataa?.installation_year}
                                            placeholder="Year of Installation"
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.installation_year}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Facility Manager Name"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="text"
                                            autoComplete="off"
                                            name="facility_manager_name"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            placeholder="Company Name"
                                            value={dataa?.facility_manager_name}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.facility_manager_name}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Cold Storage Manager Contact Number"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            name="facility_manager_contact"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            placeholder="Company Name"
                                            value={
                                                dataa?.facility_manager_contact
                                            }
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.facility_manager_contact}
                                        </p>{' '}
                                    </FormItem>
                                </div>

                                <div className="flex">
                                    <FormItem
                                        label="Internet"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="internet"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={dataa?.internet}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!dataa?.internet}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.internet}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Wifi"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="wifi"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={dataa?.wifi}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!dataa?.wifi}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.wifi}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="CCTV"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="cctv"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={dataa?.cctv}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={!dataa?.cctv}
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.cctv}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Driver Area for Food and Resting"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="driver_area_food_resting"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="true"
                                                selected={
                                                    dataa?.driver_area_food_resting
                                                }
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="false"
                                                selected={
                                                    !dataa?.driver_area_food_resting
                                                }
                                            >
                                                No
                                            </option>
                                        </select>
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.driver_area_food_resting}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Weighbridge"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div>
                                            <select
                                                disabled={location?.state}
                                                className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="weight_bridge_id"
                                            >
                                                <option value="" disabled selected>Distance in km</option>

                                                {WeighBridge &&
                                                    WeighBridge?.data?.map(
                                                        (
                                                            item: any,
                                                            index: any
                                                        ) => (
                                                            <option
                                                                value={item?.id}
                                                                selected={
                                                                    item?.id ===
                                                                    dataa?.weight_bridge_id
                                                                }
                                                            >
                                                                {item?.type}
                                                            </option>
                                                        )
                                                    )}
                                            </select>
                                        <p className="text-[red]">
                                            {errors && errors.weight_bridge_id}
                                        </p>{' '}
                                        </div>
                                    </FormItem>
                                    <FormItem
                                        label="Road condition from main road"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="road_condition_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option value="" disabled selected>
                                                Road condition from main road
                                            </option>

                                            {RoadCondition &&
                                                RoadCondition?.data?.map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            value={item?.id}
                                                            selected={
                                                                item?.id ===
                                                                dataa?.road_condition_id
                                                            }
                                                        >
                                                            {item?.type}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        <p className="text-[red]">
                                            {errors && errors.road_condition_id}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Chambers
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {false?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="mx-auto">
                                                        Chamber no.
                                                    </div>
                                                    <div className="mx-auto">
                                                        Chamber name
                                                    </div>
                                                    <div className="mx-auto">
                                                        Chamber size
                                                    </div>
                                                    <div className="mx-auto">
                                                        No. of pallets
                                                    </div>
                                                    <div className="mx-auto">
                                                        Pallet size
                                                    </div>
                                                    <div className="mx-auto">
                                                        Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="mx-auto">
                                                        A.P.
                                                    </div>
                                                    <div className="mx-auto">
                                                        EXG4568
                                                    </div>
                                                    <div className="mx-auto">
                                                        2
                                                    </div>
                                                    <div className="mx-auto">
                                                        2014
                                                    </div>
                                                    <div className="mx-auto">
                                                        48
                                                    </div>
                                                    <div className="mx-2 flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-1"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-1"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no chambers.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setChamberModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                CA Equipments
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[25%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[25%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[25%] text-center">
                                                        CFM
                                                    </div>
                                                    <div className="w-[25%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[25%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[25%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[25%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[25%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no CA Equipments.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setCAModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Compressors
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[16%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        HP
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        CFM
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        AMC
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[16%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        48
                                                    </div>
                                                    <div className="w-[16%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no Compressors.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setCompModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                ACU
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[16%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        HP
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        CFM
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        TR
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[16%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[16%] text-center">
                                                        48
                                                    </div>
                                                    <div className="w-[16%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no ACUs.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setACUModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Condensor
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        TR
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        AMC
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[20%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no condensors.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setCondensorModal(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                AMC
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center">
                                                        Name of Service
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Vendor
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Valid till
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Fixed Cost
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[20%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no AMCs.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setAMCModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                IOT Devices
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center">
                                                        Type
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        ID
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[20%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no IOT Devices.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setIOTModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                IT Devices
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center">
                                                        Type
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Asset ID
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center">
                                                        A.P.
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        EXG4568
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2
                                                    </div>
                                                    <div className="w-[20%] text-center">
                                                        2014
                                                    </div>
                                                    <div className="w-[20%] mx-auto flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-auto"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-auto"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no IT Devices.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setITModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Generator
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="mx-auto">
                                                        Make
                                                    </div>
                                                    <div className="mx-auto">
                                                        Model
                                                    </div>
                                                    <div className="mx-auto">
                                                        KVA
                                                    </div>
                                                    <div className="mx-auto">
                                                        Year
                                                    </div>
                                                    <div className="mx-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="mx-auto">
                                                        A.P.
                                                    </div>
                                                    <div className="mx-auto">
                                                        EXG4568
                                                    </div>
                                                    <div className="mx-auto">
                                                        2
                                                    </div>
                                                    <div className="mx-auto">
                                                        2014
                                                    </div>
                                                    <div className="mx-2 flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-1"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-1"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no generators.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setGenModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                MHE
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {true?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="mx-auto">
                                                        Make
                                                    </div>
                                                    <div className="mx-auto">
                                                        Model
                                                    </div>
                                                    <div className="mx-auto">
                                                        Load
                                                    </div>
                                                    <div className="mx-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="mx-auto">
                                                        A.P.
                                                    </div>
                                                    <div className="mx-auto">
                                                        EXG4568
                                                    </div>
                                                    <div className="mx-auto">
                                                        2
                                                    </div>
                                                    <div className="mx-2 flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-1"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-1"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>:<p>Currently there are no MHEs.</p>}
                                                <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setMHEModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Solar Inverters
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                        {false?<div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                            <div><div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="mx-auto">
                                                        Make
                                                    </div>
                                                    <div className="mx-auto">
                                                        Model
                                                    </div>
                                                    <div className="mx-auto">
                                                        Capacity
                                                    </div>
                                                    <div className="mx-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="mx-auto">
                                                        A.P.
                                                    </div>
                                                    <div className="mx-auto">
                                                        EXG4568
                                                    </div>
                                                    <div className="mx-auto">
                                                        2
                                                    </div>
                                                    <div className="mx-2 flex">
                                                    <Button
                                                        className="!p-2 pt-0 pb-0 mx-1"
                                                        // onClick={() => handleEdit(rowData)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        className="!p-1 mx-1"
                                                        // onClick={() => handleView(rowData)}
                                                    >
                                                        View
                                                    </Button>
                                                    </div>
                                                </div></div>
                                            </div>:<p>Currently there are no solar inverters.</p>}
                                            
                                            <div className="flex">
                                                    <button
                                                        className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                        onClick={() =>
                                                            setSEModal(true)
                                                        }
                                                    >
                                                        Add details
                                                    </button>
                                                </div>
                                        </AccordionItemPanel>
                                    </AccordionItem>
                                </Accordion>

                                <div className="flex justify-center">
                                    <Button
                                        style={{ borderRadius: '13px' }}
                                        block
                                        variant="solid"
                                        type="button"
                                        onClick={handleRoute}
                                        className="indigo-btn mt-2 !w-[140px] mx-auto rounded-[30px]"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </FormContainer>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default StoreRegistration
