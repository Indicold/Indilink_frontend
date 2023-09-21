/**
 * This code contains various functions for form validation and handling API requests in a TypeScript
 * application.
 * @param {any} email - The email address to be validated.
 * @param {any} setIsEmailValid - The `setIsEmailValid` parameter is a function that is used to update
 * the state of the email validation result. It takes a single argument, which is the result of the
 * email validation.
 */
import { toast } from 'react-toastify'
import { apiUrl, getToken } from './token'

export const validateEmail = async (email: any, setIsEmailValid: any) => {
    let body: any = {
        email: email,
    }

    try {
        const response = await fetch(`${apiUrl}/auth/check-email`, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Convert body object to JSON
        })

        const data = await response.json()

        // Check if data.isValid is defined before using it
        if (data) {
            setIsEmailValid(data.message)
        }
    } catch (error) {
        console.error('Error validating email:', error)
    }
}

export const validateForm = (formData: any, setError: any) => {
    const errorss: any = {}

    if (formData?.password !== formData?.confirm_password) {
        console.log(
            'formData?.password !== formData?.confirm_password',
            formData?.password,
            formData?.confirm_password
        )

        errorss.password = 'Passwords do not match'
    }
    if (formData?.password?.length < 8) {
        errorss.password = 'Password too short.'
    }
    if (!formData?.password) {
        errorss.password = 'Password is required'
    }
    if (!formData?.term_condition) {
        errorss.term_condition = 'Please Accept Term & condition'
    }


    if (formData?.first_name?.length < 3) {
        errorss.first_name = 'First name too short'
    }

    if (!formData?.first_name) {
        errorss.first_name = 'First name is required'
    }


    // if (!formData?.last_name) {
    //   errorss.last_name = 'Last name is required';
    // }

    if (!formData?.email) {
        errorss.email = 'Email is required'
    }
    // if (formData?.email) {
    //   if (!/\S+@\S+\.\S+/.test(formData?.email)) {
    //     errorss.email = 'Invalid email address';
    //   }
    // }

    if (!formData?.phone_number) {
        errorss.phone_number = 'Phone Number is required'
    }
    // if (formData?.phone_number) {
    //   if (!/^[0-9+\-]+$/.test(formData?.phone_number)) {
    //     errorss.phone_number = 'Mobile Number should be 10 digit';
    //   }
    // }

    // Add more validation rules for other fields
    setError(errorss)
    return Object.keys(errorss).length == 0 // Empty string indicates no validation errors
}

export const validateMobile = async (
    phone_number: any,
    setIsMobileValid: any
) => {
    let body: any = {
        phone_number: phone_number,
    }

    try {
        const response = await fetch(`${apiUrl}/auth/check-phone`, {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body), // Convert body object to JSON
        })

        const data = await response.json()

        // Check if data.isValid is defined before using it
        if (data.message) {
            setIsMobileValid(data.message)
        }
    } catch (error) {
        console.error('Error validating mobile:', error)
    }
}

export const messageView = (messagevalue: any) => {
    toast.success(messagevalue, {
        position: 'top-right', // Position of the toast
        autoClose: 3000, // Auto-close after 3000ms (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: '#FFB017',
            fontSize: 'bold',
            color: '#fff', // Set the background color here
        },
    })
}

export const handleStoreTable = async (
    url: any,
    data: any,
    setModal: any,
    formD: any,
    update: any,
    name: string
) => {
    const { token }: any = getToken()
    try {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        }

        const response = await fetch(`${apiUrl}/${url}`, config)
        const result = await response.json()

        if (result?.status) {
            messageView('Data Updated Successfully!')
            setModal(false)
            const newD: any = { ...formD }
            let arr: any = []
            if (newD[name]) arr = [...newD[name]]
            arr.push(result?.date?.id)
            newD[name] = arr
            update(newD)
            console.log("formdataa: ", formD, name, arr, newD); 
            setTimeout(() => {
                setModal(false)
            }, 2000)
        } else {
            messageView(result?.message)
        }
    } catch (error: any) {
        messageView(error.message)
        console.log('error', error.message)
    }
}

export const validatePrepareForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.city_id) {
        newErrors.city_id = 'City ID is required'
    }

    if (!formData?.address) {
        newErrors.address = 'Address is required'
    }

    if (formData?.hourly_throughput === '') {
        newErrors.hourly_throughput = 'Hourly throughput is required'
    }
    if (!formData?.prepare_type_id) {
        newErrors.prepare_type_id = 'Prepare type id is required'
    }
    if (!formData?.product_category_ids) {
        newErrors.product_category_ids = 'Product category ids is required'
    }
    if (!formData?.throughput) {
        newErrors.throughput = 'Throughput is required'
    }
    if (!formData?.avg_case_size) {
        newErrors.avg_case_size = 'Avg.Case Size is required'
    }
    if (!formData?.no_of_docks) {
        newErrors.no_of_docks = 'No of Docks is required'
    }
    if (!formData?.type_of_dock_id) {
        newErrors.type_of_dock_id = 'Type of Dock id is required'
    }
    if (!formData?.temperature) {
        newErrors.temperature = 'Temperature is required'
    }
    if (!formData?.batch_size) {
        newErrors.batch_size = 'Batch_size is required'
    }
    if (!formData?.machine_ids) {
        newErrors.machine_ids = 'Machine id is required'
    }
    if (!formData?.area) {
        newErrors.area = 'Area is required'
    }
    // Add more specific validation rules for other fields
    console.log('errr', newErrors)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateStorePartnerForm = (formData: any, setErrors: any) => {
    console.log('partner store validation', formData)

    const newErrors: any = {}

    if (!formData?.weight_bridge_id || formData?.weight_bridge_id === '') {
        newErrors.weight_bridge_id = 'Weigh Bridge is required'
        console.log("err weigh:", newErrors.weight_bridge_id)
    }

    if (!formData?.road_condition_id || formData?.road_condition_id === '') {
        newErrors.road_condition_id = 'Please select road condition'
        console.log("err road:", newErrors.road_condition_id)
    }

    if (!formData?.city_id) {
        newErrors.city_id = 'City is required'
    }

    if (!formData?.address) {
        newErrors.address = 'Address is required'
    }

    if (!formData?.total_tonnage) {
        newErrors.total_tonnage = 'Total Tonnage is required'
    }

    if (!formData?.store_type_id) {
        newErrors.store_type_id = 'Store Type is required'
    }

    if (!formData?.cold_storage_type_id) {
        newErrors.cold_storage_type_id = 'Cold Storage Type is required'
    }

    if (!formData?.no_of_chambers) {
        newErrors.no_of_chambers = 'Number of Chambers is required'
    }

    if (!formData?.ante_room_area) {
        newErrors.ante_room_area = 'Ante Room Area is required'
    }

    if (!formData?.total_number_of_docks) {
        newErrors.total_number_of_docks = 'Total Number of Docks is required'
    }

    if (!formData?.total_office_space) {
        newErrors.total_office_space = 'Total Office Space is required'
    }

    if (!formData?.type_of_dock_id) {
        newErrors.type_of_dock_id = 'Type of Dock is required'
    }

    if (!formData?.processing_area) {
        newErrors.processing_area = 'Processing Area is required'
    }

    if (!formData?.parking_area) {
        newErrors.parking_area = 'Parking Area is required'
    }

    if (!formData?.type_of_refrigeration_id) {
        newErrors.type_of_refrigeration_id = 'Type of Refrigeration is required'
    }

    if (!formData?.installation_year) {
        newErrors.installation_year = 'Installation Year is required'
    }

    if (!formData?.facility_manager_name) {
        newErrors.facility_manager_name = 'Facility Manager Name is required'
    }

    if (!formData?.facility_manager_contact) {
        newErrors.facility_manager_contact =
            'Facility Manager Contact is required'
    }

    if (!formData?.road_condition_id) {
        newErrors.road_condition_id = 'Road Condition is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateMovePartnerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.vehicle_make_id) {
        newErrors.vehicle_make_id = 'This Field is required'
    }

    if (!formData?.vehicle_model_id) {
        newErrors.vehicle_model_id = 'This Field is required'
    }

    if (!formData?.permit_validity) {
        newErrors.permit_validity = 'This Field is required'
    }

    if (!formData?.pucc_validity) {
        newErrors.pucc_validity = 'This Field is required'
    }

    if (!formData?.chassis_no) {
        newErrors.chassis_no = 'This Field is required'
    }

    if (!formData?.fitness_validity) {
        newErrors.fitness_validity = 'This Field is required'
    }

    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateChamberForm = (formData: any, setErrors: any) => {
    console.log("validateChamberForm", formData);
    const newErrors: any = {}

    if (!formData?.chamber_number) {
        newErrors.chamber_number = 'This Field is required'
    }

    if (!formData?.chamber_name) {
        newErrors.chamber_name = 'This Field is required'
    }

    if (!formData?.chamber_size) {
        newErrors.chamber_size = 'This Field is required'
    }

    if (!formData?.no_of_pallets) {
        newErrors.no_of_pallets = 'This Field is required'
    }

    if (!formData?.pallet_size) {
        newErrors.pallet_size = 'This Field is required'
    }

    if (!formData?.racking_type_id) {
        newErrors.racking_type_id = 'This Field is required'
    }

    if (!formData?.photo_of_entrance) {
        newErrors.photo_of_entrance = 'This Field is required'
    }

    if (!formData?.photo_of_chamber) {
        newErrors.photo_of_chamber = 'This Field is required'
    }

    if (!formData?.no_of_floors) {
        newErrors.no_of_floors = 'This Field is required'
    }

    if (!formData?.floor_area) {
        newErrors.floor_area = 'This Field is required'
    }

    if (!formData?.temp_range) {
        newErrors.temp_range = 'This Field is required'
    }

    if (!formData?.each_floor_hight) {
        newErrors.each_floor_hight = 'This Field is required'
    }

    if (!formData?.staircase) {
        newErrors.staircase = 'This Field is required'
    }

    if (!formData?.parking_area) {
        newErrors.parking_area = 'This Field is required'
    }

    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCAEquipForm = (formData: any, setErrors: any) => {
    console.log("validateChamberForm", formData);
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This Field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This Field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This Field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This Field is required'
    }


    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCompressorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This Field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This Field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This Field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This Field is required'
    }

    if (!formData?.hp) {
        newErrors.hp = 'This Field is required'
    }

    if (!formData?.amc) {
        newErrors.amc = 'This Field is required'
    }


    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateACUForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This Field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This Field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This Field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This Field is required'
    }

    if (!formData?.hp) {
        newErrors.hp = 'This Field is required'
    }

    if (!formData?.amc) {
        newErrors.amc = 'This Field is required'
    }

    if (!formData?.tr) {
        newErrors.tr = 'This Field is required'
    }

    if (!formData?.defrosting_id) {
        newErrors.defrosting_id = 'This Field is required'
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCondensorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This Field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This Field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This Field is required'
    }

    if (!formData?.amc) {
        newErrors.amc = 'This Field is required'
    }

    if (!formData?.tr) {
        newErrors.tr = 'This Field is required'
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateStoreCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.country_id) {
        newErrors.country_id = 'This Field is required'
    }

    if (!formData?.city_id) {
        newErrors.city_id = 'This Field is required'
    }

    if (!formData?.temperature) {
        newErrors.temperature = 'This Field is required'
    }

    if (!formData?.temperature_type_id) {
        newErrors.temperature_type_id = 'This Field is required'
    }
    if (!formData?.certification_id) {
        newErrors.certification_id = 'This Field is required'
    }
    if (!formData?.unit_id) {
        newErrors.unit_id = 'This Field is required'
    }

    if (!formData?.date) {
        newErrors.date = 'This Field is required'
    }
    if (!formData?.storage_duration) {
        newErrors.storage_duration = 'This Field is required'
    }
    if (!formData?.storage_duration_type) {
        newErrors.storage_duration_type = 'This Field is required'
    }
    if (!formData?.product_type_id) {
        newErrors.product_type_id = 'This Field is required'
    }
    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateMoveCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.origin_country_id) {
        newErrors.origin_country_id = 'This Field is required'
    }

    if (!formData?.origin_city_id) {
        newErrors.origin_city_id = 'This Field is required'
    }

    if (!formData?.dest_country_id) {
        newErrors.dest_country_id = 'This Field is required'
    }

    if (!formData?.dest_city_id) {
        newErrors.dest_city_id = 'This Field is required'
    }
    if (!formData?.load_quantity_id) {
        newErrors.load_quantity_id = 'This Field is required'
    }
    if (!formData?.broad_category_id) {
        newErrors.broad_category_id = 'This Field is required'
    }
    if (formData?.load_quantity_id && !formData?.unit_id) {
        newErrors.load_quantity_id = 'Unit is required'
    }
    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validatePrepareCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.product_category_id) {
        newErrors.product_category_id = 'This Field is required'
    }

    if (!formData?.broad_category_id) {
        newErrors.broad_category_id = 'This Field is required'
    }

    if (!formData?.service_category_id) {
        newErrors.service_category_id = 'This Field is required'
    }

    if (!formData?.country_id) {
        newErrors.country_id = 'This Field is required'
    }
    if (!formData?.state_id) {
        newErrors.state_id = 'This Field is required'
    }
    if (!formData?.city_id) {
        newErrors.city_id = 'This Field is required'
    }
    if (!formData?.throughput) {
        newErrors.throughput = 'This Field is required'
    }
    if (formData?.throughput && !formData?.throughput_unit_id) {
        newErrors.throughput = 'Unit is required'
    }
    if (!formData?.case_size) {
        newErrors.case_size = 'This Field is required'
    }
    if (formData?.case_size && !formData?.case_size_unit_id) {
        newErrors.case_size = 'Unit is required'
    }
    if (!formData?.temp_min) {
        newErrors.temp_min = 'This Field is required'
    }
    if (!formData?.temp_max) {
        newErrors.temp_max = 'This Field is required'
    }

    console.log('errr', newErrors)
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const fieldsToAppendForPrepare: any = [
    'product_category_id',
    'broad_category_id',
    'product_type_id',
    'service_category_id',
    'country_id',
    'state_id',
    'city_id',
    'throughput',
    'throughput_unit_id',
    'case_size',
    'case_size_unit_id',
    'estimated_docks',
    'estimated_dispatch',
    'temp_min',
    'temp_max',
    'temp_unit_id',
    'date_of_start',
    'dispatch_date',
    'arrival_date',
    'contract_type',
    'contract_name',
    'status_id',
    'comment',
    'contract_download',
]
export const formatDate = (inputDate: any) => {
    const parts = inputDate.split('-') // Split the input date into parts
    if (parts.length === 3) {
        const [year, month, day] = parts
        return `${day}-${month}-${year}`
    }
    return inputDate // Return the input date if it's not in the expected format
}
