import { Button, FormContainer, FormItem, Input, Tooltip } from '@/components/ui'
import { Field, Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import ChamberDetailModal from './MultistepForm/ChamberDetailModal'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
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
    onkeyDown,
    validateStorePartnerForm,
} from '@/store/customeHook/validate'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
import usePostApi from '@/store/customeHook/postApi'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Chip } from '@mui/material'
// import ModeEditIcon from '@mui/icons-material/ModeEdit';

// Define the StoreRegistration component
const StoreRegistration = () => {
    // Fetch the user's token
    const { token }: any = getToken()

    // Get the assets list ID from local storage
    const AssetsId: any = localStorage.getItem('assets_list_id')
    const { id }: any = useParams()
    const fixedOptions1: any = [];
    const [value1, setValue1] = useState<any>([...fixedOptions1]);
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
    } = useApiFetch<any>(`master/get-city-by-countryId/${localStorage.getItem('country_id')}`, token)
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
    } = useApiFetch<any>(`partner/store/${id}`, token)
    const {
        data: fetchDetailsAll,
        loading: fetchDetailsloadingAll,
        error: fetchDetailsSerrorAll,
        refetch: FetchAgain
    } = useApiFetch<any>(`partner/store/components-all/${id}`, token)
    const { data: profileData, loading: PDloading, error: PDerror } =
        useApiFetch<any>(`auth/get-user-profile`, token);
    const { result: response, loading, sendPostRequest }: any = usePostApi(`partner/store/chambers`);
    const { result: responseca, sendPostRequest: sendPostRequestca }: any = usePostApi(`partner/store/ca-equipments`);
    const { result: responsecompressor, sendPostRequest: sendPostRequestcompressor }: any = usePostApi(`partner/store/get-compressors`);
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
    const [chamberData, setChamberData] = useState<any>([])
    const [CAData, setCAData] = useState<any>([])
    const [isChecked,setIsChecked]=useState<any>(false)
    let [commanData, setCommanData] = useState<any>({})


    // Fetch the current location
    const location = useLocation()

    // Initialize state variables for form data and errors
    const [dataa, setData] = useState<any>({
        store_type_id: value1,
        three_d_view_of_asset: [],
        photos_of_asset: [],
        total_tonnage: '',
        ante_room_area: '',
        total_number_of_docks: '',
        total_office_space: '',
        processing_area: '',
        parking_area: '',
        chamber_number: '',
        chamber_name: '',
        no_of_pallets: 0,
        no_of_floors: 1,
        floor_area: '',
        temp_range_min: 0,
        temp_range_max: 0,
        each_floor_hight: '',
        
    })

    const [errors, setErrors] = useState<any>({})

    // Access the navigate function from React Router
    const navigate = useNavigate()



    // Handle the form submission
    const handleRoute = async () => {
        const { token }: any = getToken()
        dataa.store_type_id = value1?.map((item: any) => item?.id)
        // console.log("T666666", dataa);
        let formdata: any = new FormData();
        formdata.append("asset_id", id);
        formdata.append("city_id", dataa?.city_id);
        formdata.append("address", dataa?.address);
        formdata.append("total_tonnage", dataa?.total_tonnage);
        if (dataa?.store_type_id) for (const value of value1?.map((item: any) => item?.id)) {
            formdata.append("store_type_id", value);
        }
        formdata.append("cold_storage_type_id", dataa?.cold_storage_type_id);
        formdata.append("no_of_chambers", dataa?.no_of_chambers);
        if (dataa?.chamber_ids) for (const value of dataa?.chamber_ids) {
            formdata.append("chamber_ids", value);
        }
        formdata.append("ante_room_area", dataa?.ante_room_area);
        formdata.append("total_number_of_docks", dataa?.total_number_of_docks);
        formdata.append("total_office_space", dataa?.total_office_space);
        formdata.append("type_of_dock_id", dataa?.type_of_dock_id);
        formdata.append("processing_area", dataa?.processing_area);
        formdata.append("parking_area", dataa?.parking_area);
        formdata.append("type_of_refrigeration_id", dataa?.type_of_refrigeration_id);
        formdata.append("installation_year", dataa?.installation_year);
        formdata.append("facility_manager_name", dataa?.facility_manager_name);
        formdata.append("facility_manager_contact", dataa?.facility_manager_contact);
        formdata.append("internet", dataa?.internet);
        formdata.append("wifi", dataa?.wifi);
        formdata.append("cctv", dataa?.cctv);
        formdata.append("cctv_internet", dataa?.cctv_internet);
        formdata.append("driver_area_food_resting", dataa?.driver_area_food_resting);
        formdata.append("weight_bridge_id", dataa?.weight_bridge_id);
        formdata.append("road_condition_id", dataa?.road_condition_id);
        // console.log("5GHGHGHGHG", dataa?.three_d_view_of_asset);

        if (dataa?.three_d_view_of_asset) for (const value of dataa?.three_d_view_of_asset) {
            formdata.append(
                'three_d_view_of_asset',
                value
            )
        }
        if (dataa?.photos_of_asset) for (const value of dataa?.photos_of_asset) {
            formdata.append(
                'photos_of_asset',
                value
            )
        }

        if (dataa?.compressor_ids) for (const value of dataa?.compressor_ids) {
            formdata.append("compressor_ids", value);
        }
        if (dataa?.acu_ids) for (const value of dataa?.acu_ids) {
            formdata.append("acu_ids", value);
        }
        if (dataa?.condensor_ids) for (const value of dataa?.condensor_ids) {
            formdata.append("condensor_ids", value);
        }
        if (dataa?.amc_ids) for (const value of dataa?.amc_ids) {
            formdata.append("amc_ids", value);
        }
        if (dataa?.iot_devices_ids) for (const value of dataa?.iot_devices_ids) {
            formdata.append("iot_devices_ids", value);
        }
        if (dataa?.it_devices_ids) for (const value of dataa?.it_devices_ids) {
            formdata.append("it_devices_ids", value);
        }
        if (dataa?.generator_ids) for (const value of dataa?.generator_ids) {
            formdata.append("generator_ids", value);
        }
        if (dataa?.mhe_ids) for (const value of dataa?.mhe_ids) {
            formdata.append("mhe_ids", value);
        }
        if (dataa?.solar_invertor_ids) for (const value of dataa?.solar_invertor_ids) {
            formdata.append("solar_invertor_ids", value);
        }


        // Validate the form data
        if (validateStorePartnerForm(dataa, setErrors)) {
            try {
                // Set the asset_id based on local storage
                dataa.asset_id = id


                // Define the HTTP request configuration
                const config = {
                    method: 'post',
                    headers: {
                        // 'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: formdata,
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
                    navigate(`/partner-bussiness-type-compliance/${id}`, { state: location?.state })

                    if (result?.status === 200) {
                        setTimeout(() => {
                            navigate(`/partner-bussiness-type-compliance/${id}`, { state: location?.state })
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
            navigate(`/partner-bussiness-type-compliance/${id}`, { state: true })
        }
    }

    const [phone, setPhone] = useState<any>('')
    // Handle changes to form input fields
    const handlechange = (e: any) => {
        // console.log("TYYYYYYYY", e.target.name);

        const newData: any = { ...dataa }
        if (e.target.name === 'store_type_id') {
            // console.log("TTTTTT6565656", e.target.value);

        }

        if (e.target.name === 'facility_manager_contact') {
            if (e.target.value.length <= 10) {
                // setPhone(e.target.value)
                newData[e.target.name] = e.target.value
            }
        } else if (e.target.name == 'three_d_view_of_asset') {

            const fileInput: any = e.target; // Assuming e.target is the input element
            const fileArray = Array.from(fileInput.files);
            newData['three_d_view_of_asset'] = fileArray;
            // console.log("TTTTTTT787878787", fileArray, fileInput.files);

        } else
            if (e.target.name === 'photos_of_asset') {

                const fileInput = e.target; // Assuming e.target is the input element
                const fileArray = [];

                for (let i = 0; i < fileInput.files.length; i++) {
                    const file = fileInput.files[i];
                    fileArray.push(file);
                }
                newData[e.target.name] = fileArray;

            }
            else newData[e.target.name] = e.target.value
        newData.no_of_chambers = dataa.no_of_chambers ? dataa.no_of_chambers : '0';
        setData(newData)
        // console.log("e.target.value", `${e.target.nodeName === 'SELECT'} e ${e.target.value}`)
        // console.log("newData", newData)
        if (errors[e.target.name]) validateStorePartnerForm(newData, setErrors)
        // if(e.target.nodeName === 'SELECT')validateStorePartnerForm(dataa, setErrors)
    }

    const [value, setValue] = useState([])

    const handleStoreChange = (e: any, newValue: any) => {
        const newData: any = { ...dataa }
        newData['store_type_id'] = newValue?.map((item: any, index: any) => item?.id)
        setData(newData)
        if (errors[e.target.name]) validateStorePartnerForm(newData, setErrors)
        // console.log("newDataa", newData)
        // console.log("newVal", newValue?.map((item:any,index:any)=>item?.id))
    }

    const handleEditView = (rowdata: any, targetModal: string, readOnly: boolean) => {
        // setEditableFields(!readOnly);
        setTableTriggeredAction(true);
        setRowData(rowdata);
        switch(targetModal) {
            case 'ChamberDetailModal':
                setChamberModal(true);
                break

            case 'CAEquipmentsModal':
                setCAModal(true);
                break

            case 'CompressorModal':
                setCompModal(true);
                break

            case 'ACUModal':
                setACUModal(true);
                break

            case 'CondensorDetailsModal':
                setCondensorModal(true);
                break

            case 'AMCDetailModal':
                setAMCModal(true);
                break

            case 'IOTDetailModal':
                setIOTModal(true);
                break

            case 'ITDetailModal':
                setITModal(true);
                break

            case 'GeneratorDetailModal':
                setGenModal(true);
                break

            case 'MHEDetails':
                setMHEModal(true);
                break

            case 'SolarInverterModal':
                setSEModal(true);
                break

            default: return;
        }
    }

    // Use useEffect to update form data when fetchDetails changes

    useEffect(() => {

        if (fetchDetails?.data !== null && fetchDetails?.data !== undefined) {
            const phoneNumberWithoutCountryCode :any= fetchDetails?.data?.facility_manager_contact?.replace('+91', '');
            setPhone(phoneNumberWithoutCountryCode)
            if(profileData?.data[0]?.phone_number===fetchDetails?.data?.facility_manager_contact){
                setIsChecked(true)
            }
            setData(fetchDetails?.data)
        }
    }, [fetchDetails])
    useEffect(() => {

        const newState: any = { ...dataa };
        newState.no_of_chambers = dataa?.chamber_ids?.length || '0'
        // console.log("no_of_chambers", newState)
        setData(newState)
        setValue(dataa?.store_type_id)
        // console.log("dataa", dataa)
        if (localStorage.getItem('chamber_ids')) {
            const arr: any = JSON.parse(localStorage.getItem('chamber_ids')) || [];
            if (arr) {
                const filteredArray: any = arr?.filter((item: any) => item !== null) || [];
                const body: any = {
                    ids: filteredArray
                }
                sendPostRequest(body)
            }


        }

    }, [])
    useEffect(() => {
        if (localStorage.getItem('ca_equipment_ids')) {
            const arr: any = JSON.parse(localStorage.getItem('ca_equipment_ids')) || [];
            if (arr) {
                const filteredArray: any = arr?.filter((item: any) => item !== null) || [];
                const body: any = {
                    ids: filteredArray
                }
                // console.log("GGGGGG", body, filteredArray);
                if (arr.length > 0) {
                    sendPostRequestca(body)
                }

            }


        }
    }, [])
    useEffect(() => {
        if (response?.data) {
            setChamberData(response?.data)
        }
        if (responseca?.data) {
            setCAData(responseca?.data)
        }
    }, [response?.data, responseca?.data])

    useEffect(() => {
        setData(dataa)
    }, [dataa])

    const targetArray1: any = StorageType?.data || [];
    const itemsToFind1 = dataa?.store_type_id;
    // console.log("TTTTTTTTT768786786786867", dataa);

    useEffect(() => {
        const foundItems: any = itemsToFind1?.length > 0 ? targetArray1?.filter((item: any) => itemsToFind1?.includes(item?.id)) : targetArray1?.filter((item: any) => item?.id === itemsToFind1);
        setValue1(foundItems)
    }, [StorageType?.data, dataa?.store_type_id])

    const handleCheckbox = (e: any) => {
        const isChecked: any = e.target.checked;
        const phoneNumberWithoutCountryCode = profileData?.data[0].phone_number?.replace('+91', '');
        setPhone(phoneNumberWithoutCountryCode)
        if (isChecked && profileData?.data) {
            setData({ ...dataa, facility_manager_name: `${profileData?.data[0].first_name} ${profileData?.data[0].last_name}`, facility_manager_contact: profileData?.data[0].phone_number })
        } else {
            setPhone('');
            setData({ ...dataa, facility_manager_name: ``, facility_manager_contact: '' })

        }

    }
    console.log("TTTTTTT77777777", dataa);
    const handleView = (rowData: any, type: any) => {
        if (type === 'Chamber') {
            setChamberModal(true)
            setCommanData({ ...rowData, type: "View" })
        } else if (type === 'CA') {
            setCAModal(true)
            setCommanData({ ...rowData, type: "View" })
        } else if (type === 'Compressors') {
            setCompModal(true)
            setCommanData({ ...rowData, type: "View" })
        }
        else if (type === 'ACU') {
            setACUModal(true)
            setCommanData({ ...rowData, type: "View" })
        }
         else if (type === 'Condenser') {
            setCondensorModal(true)
            setCommanData({ ...rowData, type: "View" })
        } else if (type === 'AMC') {
            setAMCModal(true)
            setCommanData({ ...rowData, type: "View" })
        }else if (type === 'IOT') {
            setIOTModal(true)
            setCommanData({ ...rowData, types: "View" })
        }else if (type === 'IT') {
            setITModal(true)
            setCommanData({ ...rowData, types: "View" })
        }
        else if (type === 'Generator') {
            setGenModal(true)
            setCommanData({ ...rowData, type: "View" })
        }
        else if (type === 'MHE') {
            setMHEModal(true)
            setCommanData({ ...rowData, type: "View" })
        }
        else if (type === 'Solar') {
            setSEModal(true)
            setCommanData({ ...rowData, type: "View" })
        }


    }
    const handleEdit = (rowData: any, type: any) => {
        if (type === 'Chamber') {
            setChamberModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        } else if (type === 'CA') {
            setCAModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'Compressors') {
            setCompModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'ACU') {
            setACUModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        } else if (type === 'Condenser') {
            setCondensorModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'AMC') {
            setAMCModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'IOT') {
            setIOTModal(true)
            setCommanData({ ...rowData, types: "Edit" })
        }
        else if (type === 'IT') {
            setITModal(true)
            setCommanData({ ...rowData, types: "Edit" })
        }
        else if (type === 'Generator') {
            setGenModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'MHE') {
            setMHEModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }
        else if (type === 'Solar') {
            setSEModal(true)
            setCommanData({ ...rowData, type: "Edit" })
        }

    }

    return (
        <div className='flex'>
            <div className='w-1/6'>


                <ol className="relative text-gray-500 border-l border-gray-200 dark:border-gray-700 dark:text-gray-400">
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">Asset Specifications</h6>
                        {/* <p className="text-sm">Step details here</p> */}
                    </li>
                    <li className="mb-10 ml-6">
                        <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                            <svg className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                            </svg>
                        </span>
                        <h6 className="font-medium leading-tight">Compliance Details</h6>
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
                <ArrowBackIcon onClick={() => navigate(-1)} />
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
                                    FetchAgain={FetchAgain}
                                    modal={chamberModal}
                                    formD={dataa}
                                    commanData={commanData}
                                    update={setData}
                                    setModal={setChamberModal}
                                    
                                />
                            )}

                            {CAModal && (
                                <CAEquipmentsModal
                                    FetchAgain={FetchAgain}
                                    modal={CAModal}
                                    formD={dataa}
                                    commanData={commanData}
                                    update={setData}
                                    setModal={setCAModal}
                                    
                                />
                            )}

                            {compModal && (
                                <CompressorModal
                                    FetchAgain={FetchAgain}
                                    modal={compModal}
                                    formD={dataa}
                                    commanData={commanData}
                                    update={setData}
                                    setModal={setCompModal}
                                    
                                />
                            )}

                            {ACUModal && (
                                <ACUModall
                                    FetchAgain={FetchAgain}
                                    modal={ACUModal}
                                    formD={dataa}
                                    chamber={null}
                                    update={setData}
                                    setData={setData}
                                    commanData={commanData}
                                    setModal={setACUModal}
                                    
                                />
                            )}

                            {condensorModal && (
                                <CondensorDetailsModal
                                    FetchAgain={FetchAgain}
                                    modal={condensorModal}
                                    formD={dataa}
                                    update={setData}
                                    commanData={commanData}
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
                                    commanData={commanData}
                                    setModal={setAMCModal}
                                    FetchAgain={FetchAgain}
                                    
                                />
                            )}

                            {IOTModal && (
                                <IOTDetailModal
                                    FetchAgain={FetchAgain}
                                    modal={IOTModal}
                                    formD={dataa}
                                    update={setData}
                                    commanData={commanData}
                                    setData={setData}
                                    setModal={setIOTModal}
                                    
                                />
                            )}

                            {ITModal && (
                                <ITDetailModal
                                    FetchAgain={FetchAgain}
                                    modal={ITModal}
                                    formD={dataa}
                                    commanData={commanData}
                                    update={setData}
                                    setModal={setITModal}
                                    
                                />
                            )}

                            {genModal && (
                                <GeneratorDetailModal
                                    FetchAgain={FetchAgain}
                                    modal={genModal}
                                    formD={dataa}
                                    chamber={null}
                                    update={setData}
                                    setData={setData}
                                    commanData={commanData}
                                    setModal={setGenModal}
                                    
                                />
                            )}

                            {MHEModal && (
                                <MHEDetailsModal
                                    FetchAgain={FetchAgain}
                                    modal={MHEModal}
                                    formD={dataa}
                                    commanData={commanData}
                                    update={setData}
                                    setModal={setMHEModal}
                                    
                                />
                            )}

                            {SEModal && (
                                <SolarInverterModal
                                    FetchAgain={FetchAgain}
                                    modal={SEModal}
                                    formD={dataa}
                                    chamber={null}
                                    update={setData}
                                    commanData={commanData}
                                    setData={setData}
                                    setModal={setSEModal}
                                    
                                />
                            )}

                            <FormContainer>
                                <div className="flex items-center mb-4">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        checked={isChecked}
                                        disabled={location?.state}
                                        onClick={(e: any) => handleCheckbox(e)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Are You Facility Manager
                                    </label>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Facility Manager*"
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
                                            placeholder="Facility Manager Name"
                                            value={dataa?.facility_manager_name}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.facility_manager_name}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Contact Number*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            minLength={10}
                                            maxLength={10}
                                            name="facility_manager_contact"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            placeholder="Contact Number"
                                            value={
                                                phone || dataa?.facility_manager_contact
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
                                        label="City*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <select
                                            disabled={location?.state}
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                        label="Address*"
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
                                        label="Total Tonnage(MT)*"
                                        className="w-1/2 text-label-title"
                                    >

                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0 focus:outline-0"
                                                value={dataa?.total_tonnage}
                                                type="number"
                                                min={0}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="total_tonnage"
                                                onKeyDown={onkeyDown}
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0 ms-auto me-2"
                                            >
                                                <option>MT</option>
                                            </select> */}
                                        </div>

                                        <p className="text-[red]">
                                            {errors && errors.total_tonnage}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Type of Store*"
                                        className="w-1/2 text-label-title"
                                    >
                                        {/* <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="store_type_id"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected disabled value="">
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
                                        </select> */}
                                        <Autocomplete
                                            multiple
                                            limitTags={1}
                                            id="fixed-tags-demo"
                                            value={value1}
                                            onChange={(event, newValue) => {
                                                setValue1([
                                                    ...fixedOptions1,
                                                    ...newValue.filter((option) => fixedOptions1.indexOf(option) === -1),
                                                ]);
                                                handlechange(event)
                                            }}
                                            options={StorageType ? StorageType?.data : []}
                                            getOptionLabel={(option: any) => option?.type}
                                            renderTags={(tagValue, getTagProps) =>
                                                tagValue.map((option, index) => (
                                                    <Chip
                                                        label={option?.type}
                                                        {...getTagProps({ index })}
                                                        disabled={fixedOptions1.indexOf(option) !== -1}
                                                    />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField {...params}
                                                    name="store_type_id"
                                                    placeholder="Store Category" />
                                            )}
                                            disabled={location?.state}
                                        />

                                        <p className="text-[red]">
                                            {errors && errors.store_type_id}
                                        </p>
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Type of Cold Storage*"
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


                                    {/* <FormItem
                                        label="Total Number Of Chambers*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            autoComplete="off"
                                            min="0"
                                            name="no_of_chambers"
                                            placeholder="Total number of chambers"
                                            value={fetchDetailsAll?.data?.chambers?.length || 0}
                                            component={Input}
                                        />
                                        <p className="text-[red]">
                                            {errors && errors.no_of_chambers}
                                        </p>
                                    </FormItem> */}
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Ante Room - Area (Square feet)*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0 focus:outline-0"
                                                value={dataa?.ante_room_area}
                                                type="number"
                                                min={0}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                name="ante_room_area"
                                                onKeyDown={onkeyDown}
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                            </select> */}
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.ante_room_area}
                                        </p>
                                    </FormItem>
                                    <FormItem
                                        label="Total number of docks*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <Field
                                            disabled={location?.state}
                                            type="number"
                                            min="0"
                                            autoComplete="off"
                                            name="total_number_of_docks"
                                            placeholder="Total number of docks"
                                            value={dataa?.total_number_of_docks}
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            onKeyDown={onkeyDown}
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
                                        label="Total office space(Square feet)*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0 focus:outline-0"
                                                value={
                                                    dataa?.total_office_space
                                                }
                                                min="0"
                                                type="number"
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                onKeyDown={onkeyDown}
                                                name="total_office_space"
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                            </select> */}
                                        </div>
                                        <p className="text-[red]">
                                            {errors &&
                                                errors.total_office_space}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Type of docks*"
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
                                                Choose Dock Storage
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
                                        label="Processing Area(Square feet)*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0 focus:outline-0"
                                                value={dataa?.processing_area}
                                                type="number"
                                                min={0}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                onKeyDown={onkeyDown}
                                                name="processing_area"
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                            </select> */}
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.processing_area}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Parking Area(Square feet)*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                className="w-2/3 border-0 focus:outline-0"
                                                type="number"
                                                min={0}
                                                value={dataa?.parking_area}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                onKeyDown={onkeyDown}
                                                name="parking_area"
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                            </select> */}
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.parking_area}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <div className="flex">
                                    <FormItem
                                        label="Type of Refrigeration*"
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
                                        label="Year of Installation*"
                                        className="w-1/2 text-label-title"
                                    >

                                        <select
                                            disabled={location?.state}
                                            id="countries"
                                            name="installation_year"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option selected>
                                                Choose Year of Installation
                                            </option>
                                            {true &&
                                                Array.from({ length: 2023 - 1980 + 1 }, (_, index) => 1980 + index).map(
                                                    (item: any, index: any) => (
                                                        <option
                                                            key={item}
                                                            value={item}
                                                            selected={item === dataa?.installation_year}
                                                        >
                                                            {item}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                        {/* <Field
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
                                        /> */}
                                        <p className="text-[red]">
                                            {errors && errors.installation_year}
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
                                            name="cctv_internet"
                                            onChange={(e: any) =>
                                                handlechange(e)
                                            }
                                            className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <option
                                                value="1"
                                                selected={dataa?.cctv_internet}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="0"
                                                selected={!dataa?.cctv_internet}
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
                                                value="1"
                                                selected={dataa?.wifi}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="0"
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
                                                value="1"
                                                selected={dataa?.cctv}
                                            >
                                                Yes
                                            </option>
                                            <option
                                                value="0"
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
                                        label="Weighbridge*"
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
                                        label="Road condition from main road*"
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
                                                Select
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
                                <div className="flex">
                                    <FormItem
                                        label="3D Photo*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                multiple
                                                name="three_d_view_of_asset"

                                                className="w-2/3 border-0 focus:outline-0"
                                                type="file"
                                                accept="image/png, image/jpeg"
                                                min={0}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                disabled={location?.state}

                                            />

                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.three_d_view_of_asset}
                                        </p>{' '}
                                    </FormItem>
                                    <FormItem
                                        label="Photo Of Assets*"
                                        className="w-1/2 text-label-title"
                                    >
                                        <div className="border flex h-11 w-full input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                                            <input
                                                multiple
                                                className="w-2/3 border-0 focus:outline-0"
                                                type="file"
                                                accept="image/png, image/jpeg"

                                                min={0}
                                                onChange={(e: any) =>
                                                    handlechange(e)
                                                }
                                                onKeyDown={onkeyDown}
                                                name="photos_of_asset"
                                                placeholder="Enter value"
                                                disabled={location?.state}
                                            />
                                            {/* <select
                                                disabled={true}
                                                className="border-0"
                                            >
                                                <option>Square feet</option>
                                            </select> */}
                                        </div>
                                        <p className="text-[red]">
                                            {errors && errors.photos_of_asset}
                                        </p>{' '}
                                    </FormItem>
                                </div>
                                <Accordion>
                                    <AccordionItem>
                                        <AccordionItemHeading>
                                            <AccordionItemButton>
                                                Chambers
                                                <p className='text-[red]'>{errors?.chamber_ids}</p>

                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.chambers.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">

                                                    <div className="w-[17%] text-center my-auto">
                                                        Chamber name
                                                    </div>
                                                    <div className="w-[17%] text-center my-auto">
                                                        Chamber no.
                                                    </div>
                                                    <div className="w-[17%] text-center my-auto">
                                                        Chamber size
                                                    </div>
                                                    <div className="w-[14%] text-center my-auto">
                                                        Created
                                                    </div>
                                                    <div className="w-[17%] text-center my-auto">
                                                        Updated
                                                    </div>
                                                    <div className="mx-auto">
                                                        Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.chambers?.map((item: any, index: any) => (
                                                    <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.chamber_name}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.chamber_number}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto !text-center">
                                                            {item?.no_of_pallets}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {new Date(item?.created_at)?.toLocaleDateString()}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {new Date(item?.updated_at)?.toLocaleDateString()}
                                                        </div>
                                                        <div className="mx-2 flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-1"
                                                                onClick={() => handleEdit(item, 'Chamber')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-1"
                                                                onClick={() => handleView(item, 'Chamber')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div> : <p className="text-center">Currently there are no chambers.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>
                                                        {
                                                            // setEditableFields(true);
                                                            setChamberModal(true);
                                                            // setTableTriggeredAction(false);
                                                            setCommanData({});
                                                        }
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
                                                <p className='text-[red]'>{errors?.ca_equipment_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.caEquipments.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[26%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[27%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        CFM
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.caEquipments?.map((item: any, index: any) => (
                                                    <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.make}
                                                        </div>
                                                        <div className="w-[28%] text-center my-auto">
                                                            {item?.model}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.cmf}
                                                        </div>
                                                        <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'CA')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'CA')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div> : <p className="text-center">Currently there are no CA Equipments.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCAModal(true)
                                                        setCommanData({})
                                                    }
                                                       
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
                                                <p className='text-[red]'>{errors?.compressor_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.compressors?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[25%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        HP
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        CFM
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        AMC
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.compressors?.map((item: any, index: any) => (
                                                    <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.make}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.model}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.hp}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.cmf}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.amc}
                                                        </div>
                                                        <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'Compressors')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'Compressors')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div> : <p className="text-center">Currently there are no Compressors.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setCompModal(true);
                                                    }
                                                       
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
                                                <p className='text-[red]'>{errors?.acu_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.acus?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        HP
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        CFM
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        TR
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.acus?.map((item: any, index: any) => (
                                                    <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.make}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.model}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.hp}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.cmf}
                                                        </div>
                                                        <div className="w-[20%] text-center my-auto">
                                                            {item?.tr}
                                                        </div>
                                                        <div className="w-[20%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'ACU')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'ACU')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div> : <p className="text-center">Currently there are no ACUs.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setACUModal(true)
                                                    }
                                                     
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
                                                Condenser
                                                <p className='text-[red]'>{errors?.condensor_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.condensors?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        TR
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        AMC
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.condensors?.map((item: any, index: any) => (
                                                    <div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.make}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.model}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.tr}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.amc}
                                                        </div>
                                                        <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'Condenser')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'Condenser')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}

                                            </div> : <p className="text-center">Currently there are no Condenser.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setCondensorModal(
                                                            true
                                                        )
                                                    }
                                                        
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
                                                Annual Maintenance Contract
                                                <p className='text-[red]'>{errors?.amc_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.amcs?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Name of Service
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Vendor
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Valid till
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Fixed Cost
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.amcs?.map((item: any, index: any) => {
                                                    let date: any = new Date(item?.valid_till)
                                                    date = date?.toLocaleDateString()
                                                    // console.log("amcs", date)
                                                    return (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.name_of_service}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.vendor}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {date}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.fixed_cost}
                                                        </div>
                                                        <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'AMC')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'AMC')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>)
                                                })}
                                            </div> : <p className="text-center">Currently there are no AMCs.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setAMCModal(true)
                                                    }
                                                    
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
                                                <p className='text-[red]'>{errors?.iot_devices_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.iotDevices?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Type
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        ID
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.iotDevices?.map((item: any, index: any) => (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.type}
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.device_id}
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.make}
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.model}
                                                    </div>
                                                    <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'IOT')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'IOT')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                </div>))}
                                            </div> : <p className="text-center">Currently there are no IOT Devices.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setIOTModal(true)
                                                    }
                                                        
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
                                                <p className='text-[red]'>{errors?.it_devices_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.itDevices?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Type
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Device ID
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.itDevices?.map((item: any, index: any) => (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.type}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.device_id}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.make}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.model}
                                                    </div>
                                                    <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'IT')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'IT')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                </div>))}
                                            </div> : <p className="text-center">Currently there are no IT Devices.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({})
                                                        setITModal(true)
                                                    }
                                                     
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
                                                <p className='text-[red]'>{errors?.generator_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.generators?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[20%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        KVA
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        Year
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                    Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.generators?.map((item: any, index: any) => (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.make}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.model}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.kva}
                                                    </div>
                                                    <div className="w-[20%] text-center my-auto">
                                                        {item?.year}
                                                    </div>
                                                    <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'Generator')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'Generator')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                </div>))}
                                            </div> : <p className="text-center">Currently there are no generators.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setGenModal(true)
                                                    }
                                                    
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
                                                <p className='text-[red]'>{errors?.mhe_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.mhes?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[25%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Load
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Actions
                                                    </div>
                                                </div>
                                                {fetchDetailsAll?.data?.mhes?.map((item: any, index: any) => (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.make}
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.model}
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        {item?.load}
                                                    </div>
                                                    <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'MHE')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'MHE')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                </div>))}
                                            </div> : <p className="text-center">Currently there are no MHEs.</p>}
                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setCommanData({});
                                                        setMHEModal(true)
                                                    }
                                                    
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
                                                <p className='text-[red]'>{errors?.solar_invertor_ids}</p>
                                            </AccordionItemButton>
                                        </AccordionItemHeading>
                                        <AccordionItemPanel>
                                            {fetchDetailsAll?.data?.solarInverters?.length > 0 ? <div className="w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3">
                                                <div><div className="bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2">
                                                    <div className="w-[25%] text-center my-auto">
                                                        Make
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Model
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Capacity
                                                    </div>
                                                    <div className="w-[25%] text-center my-auto">
                                                        Actions
                                                    </div>
                                                </div>
                                                    {fetchDetailsAll?.data?.solarInverters?.map((item: any, index: any) => (<div className="listt flex w-full bg-white py-4 rounded-[13px]">
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.make}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.model}
                                                        </div>
                                                        <div className="w-[25%] text-center my-auto">
                                                            {item?.capacity}
                                                        </div>
                                                        <div className="w-[25%] mx-auto flex">
                                                            <Button
                                                                className="!p-2 pt-0 pb-0 mx-auto"
                                                                onClick={() => handleEdit(item, 'Solar')}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                className="!p-1 mx-auto"
                                                                onClick={() => handleView(item, 'Solar')}
                                                            >
                                                                View
                                                            </Button>
                                                        </div>
                                                    </div>))}</div>
                                            </div> : <p className="text-center">Currently there are no solar inverters.</p>}

                                            <div className="flex">
                                                <button
                                                    className="mx-auto indigo-btn text-white px-[65px] py-2 rounded-[13px] my-2 border"
                                                    onClick={() =>{
                                                        setSEModal(true)
                                                        setCommanData({})
                                                    }
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
                                        disabled
                                        onClick={() => navigate(-1)}
                                        className="indigo-btn mt-2 !w-[140px] !bg-gray-300 mx-auto rounded-[30px]"
                                    >
                                        Prev
                                    </Button>
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