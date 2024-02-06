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
        console.log('TYYYYY9999', data)

        // Check if data.isValid is defined before using it
        if (data) {
            setIsEmailValid(data.message)
        }
    } catch (error) {
        console.error('Error validating email:', error)
    }
}
export const onkeyDownforSpecialCharcterGSTPAN = (e: any) => {
    if (
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}
export const onkeyDownforSpecialCharcter = (e: any) => {
    if (
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const onkeyDownforNumSpecialCharcter = (e: any) => {
    if (
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~' ||
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}
export const onkeyDownforNumMobSpecialCharcter = (e: any) => {
    if (
        e.key === 'e' ||
        e.key === 'E' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const onkeyDownforNumMobSpecialCharcterOnlyAndFormPanCardGSTNumber = (
    e: any
) => {
    if (
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const onkeyDownforNumMobSpecialCharcterOnly = (e: any) => {
    if (
        e.key === 'e' ||
        e.key === 'E' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~' ||
        e.key === 'A' ||
        e.key === 'B' ||
        e.key === 'C' ||
        e.key === 'D' ||
        e.key === 'E' ||
        e.key === 'F' ||
        e.key === 'G' ||
        e.key === 'H' ||
        e.key === 'I' ||
        e.key === 'J' ||
        e.key === 'K' ||
        e.key === 'L' ||
        e.key === 'M' ||
        e.key === 'N' ||
        e.key === 'O' ||
        e.key === 'P' ||
        e.key === 'Q' ||
        e.key === 'R' ||
        e.key === 'S' ||
        e.key === 'T' ||
        e.key === 'U' ||
        e.key === 'V' ||
        e.key === 'W' ||
        e.key === 'X' ||
        e.key === 'Y' ||
        e.key === 'Z' ||
        e.key === 'a' ||
        e.key === 'b' ||
        e.key === 'c' ||
        e.key === 'd' ||
        e.key === 'e' ||
        e.key === 'f' ||
        e.key === 'g' ||
        e.key === 'h' ||
        e.key === 'i' ||
        e.key === 'j' ||
        e.key === 'k' ||
        e.key === 'l' ||
        e.key === 'm' ||
        e.key === 'n' ||
        e.key === 'o' ||
        e.key === 'p' ||
        e.key === 'q' ||
        e.key === 'r' ||
        e.key === 's' ||
        e.key === 't' ||
        e.key === 'u' ||
        e.key === 'v' ||
        e.key === 'w' ||
        e.key === 'x' ||
        e.key === 'y' ||
        e.key === 'z'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const onkeyDownforNumMobSpecialCharcterOnlyAndPercentage = (e: any) => {
    if (
        e.key === '' ||
        e.key === 'e' ||
        e.key === 'E' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '.' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~' ||
        e.key === 'A' ||
        e.key === 'B' ||
        e.key === 'C' ||
        e.key === 'D' ||
        e.key === 'E' ||
        e.key === 'F' ||
        e.key === 'G' ||
        e.key === 'H' ||
        e.key === 'I' ||
        e.key === 'J' ||
        e.key === 'K' ||
        e.key === 'L' ||
        e.key === 'M' ||
        e.key === 'N' ||
        e.key === 'O' ||
        e.key === 'P' ||
        e.key === 'Q' ||
        e.key === 'R' ||
        e.key === 'S' ||
        e.key === 'T' ||
        e.key === 'U' ||
        e.key === 'V' ||
        e.key === 'W' ||
        e.key === 'X' ||
        e.key === 'Y' ||
        e.key === 'Z' ||
        e.key === 'a' ||
        e.key === 'b' ||
        e.key === 'c' ||
        e.key === 'd' ||
        e.key === 'e' ||
        e.key === 'f' ||
        e.key === 'g' ||
        e.key === 'h' ||
        e.key === 'i' ||
        e.key === 'j' ||
        e.key === 'k' ||
        e.key === 'l' ||
        e.key === 'm' ||
        e.key === 'n' ||
        e.key === 'o' ||
        e.key === 'p' ||
        e.key === 'q' ||
        e.key === 'r' ||
        e.key === 's' ||
        e.key === 't' ||
        e.key === 'u' ||
        e.key === 'v' ||
        e.key === 'w' ||
        e.key === 'x' ||
        e.key === 'y' ||
        e.key === 'z'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const onkeyDownforNumMobSpecialCharcterwithPercentage = (e: any) => {
    if (
        e.key === 'e' ||
        e.key === 'E' ||
        e.key === '-' ||
        e.key === '+' ||
        e.key === '!' ||
        e.key === '@' ||
        e.key === '#' ||
        e.key === '$' ||
        e.key === '%' ||
        e.key === '^' ||
        e.key === '&' ||
        e.key === '*' ||
        e.key === '(' ||
        e.key === ')' ||
        e.key === '_' ||
        e.key === '' ||
        e.key === '-' ||
        e.key === '<' ||
        e.key === '>' ||
        e.key === '/' ||
        e.key == ',' ||
        e.key == '=' ||
        e.key == ':' ||
        e.key == ';' ||
        e.key == '"' ||
        e.key == "'" ||
        e.key === '[' ||
        e.key === ']' ||
        e.key === '{' ||
        e.key === '}' ||
        e.key === '?' ||
        e.key === '|' ||
        e.key === '\\' ||
        e.key === '`' ||
        e.key === '~'
    ) {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}

export const validateForm = (
    formData: any,
    setError: any,
    isMobileValid: any,
    isEmailValid: any
) => {
    const errorss: any = {}
    const strongPasswordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.#^+_-]{8,}$/

    if (formData?.password !== formData?.confirm_password) {
        errorss.confirm_password = 'Passwords do not match'
    }
    if (isMobileValid && isMobileValid !== 'Eligible') {
        errorss.phone_number = isMobileValid
    }
    if (isEmailValid && isEmailValid !== 'Eligible') {
        errorss.email = isEmailValid
    }
    if (formData?.password?.length < 8) {
        errorss.password = 'Password too short'
    }
    if (!formData?.password) {
        errorss.password = 'Password is required'
    }

    if (formData?.term_condition === 'off' || !formData?.term_condition) {
        errorss.term_condition = 'Please accept terms & conditions'
    }
    if (!strongPasswordRegex.test(formData?.password)) {
        errorss.password =
            'Minimum 8 characters, at least one number, one symbol and one uppercase letter'
    }

    if (formData?.first_name?.length < 3) {
        errorss.first_name = 'First name too short'
    }

    if (!formData?.first_name) {
        errorss.first_name = 'First name is required'
    }
    if (/\.\@/.test(formData?.email)) {
        errorss.email = 'Email not allow .@'
    }
    // if (!formData?.last_name) {
    //   errorss.last_name = 'Last name is required';
    // }

    if (!formData?.email) {
        errorss.email = 'Email is required'
    }
    // const pattern = /\.\@/;
    // if (!pattern.test(formData?.email)) {
    //     errorss.email = 'Email not allow .@ is required'
    // }

    if (formData?.email) {
        if (
            !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                formData?.email
            )
        ) {
            errorss.email = 'Invalid email address'
        }
    }

    if (!formData?.phone_number) {
        errorss.phone_number = 'Phone number is required'
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
export const validateBasicInformationForm = (
    formData: any,
    setError: any,
    Address: any
) => {
    const errorss: any = {}
    const ValidGst = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
    const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    if (formData?.gst && !ValidGst.test(formData?.gst)) {
        errorss.gst = 'Enter a valid GST number'
    }
    if (!formData?.panNo) {
        errorss.panNo = 'Pan no. is required'
    }
    if (
        (formData?.panNo && !re.test(formData?.panNo)) ||
        formData?.panNo?.length !== 10
    ) {
        errorss.panNo = 'Enter valid PAN number'
    }
    if (!formData?.designation) {
        errorss.designation = 'Designation is required'
    }
    if (!formData?.firm) {
        errorss.firm = 'Firm type is required'
    }
    if (!formData?.firmName) {
        errorss.firmName = 'Firm name is required'
    }
    if (!formData?.country) {
        errorss.country = 'Country is required'
    }
    if (!Address) {
        errorss.dest_gps = 'GPS Location is required'
    }

    console.log('RRRRRR', errorss)

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
export const messageViewNew = (messagevalue: any) => {
    console.log('REEEEEEE', messagevalue)
    // debugger
    toast?.success(messagevalue?.message || '', {
        position: 'bottom-center', // Position of the toast
        autoClose: 3000, // Auto-close after 3000ms (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            background: `${
                messagevalue?.status == 200
                    ? 'green'
                    : messagevalue?.status == 409
                    ? 'red'
                    : messagevalue?.status == 401
                    ? 'red'
                    : messagevalue?.status == 500
                    ? 'red'
                    : messagevalue?.status == 404
                    ? 'red'
                    : messagevalue?.status == 400
                    ? 'red'
                    : messagevalue?.status == 404
                    ? 'red'
                    : '#FFB017'
            }`,
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
    name: string,
    fetchAgain: any
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
            if (fetchAgain) {
                fetchAgain()
            }
            if (result?.status == 200) {
                messageViewNew({
                    status: 200,
                    message: 'Data Updated Successfully!',
                })
            }

            setModal(false)
            const newD: any = { ...formD }
            let arr: any = []
            if (newD[name]) arr = [...newD[name]]
            arr.push(result?.date?.id)
            newD[name] = arr

            update(newD)
            // Retrieve existing chamber_ids from local storage
            const existingChamberIdsJSON =
                localStorage.getItem('ca_equipment_ids')
            let existingChamberIds = []

            if (existingChamberIdsJSON) {
                existingChamberIds = JSON.parse(existingChamberIdsJSON)
            }

            // Assuming newD?.chamber_ids is the new data to be added
            const newChamberIds = newD?.ca_equipment_ids || []

            // Check if the new data is not already in the existing array
            const mergedChamberIds = [
                ...new Set([...existingChamberIds, ...newChamberIds]),
            ]
            localStorage.setItem(
                'ca_equipment_ids',
                JSON.stringify(mergedChamberIds)
            )
            if (!existingChamberIdsJSON) {
                // If chamber_ids doesn't exist in local storage, set it
                localStorage.setItem(
                    'ca_equipment_ids',
                    JSON.stringify(mergedChamberIds)
                )
            }

            setTimeout(() => {
                setModal(false)
            }, 2000)
        } else {
            messageViewNew(result)
        }
    } catch (error: any) {
        messageViewNew(error)
    }
}

export const validatePrepareForm = (
    formData: any,
    setErrors: any,
    selectedOptions: any,
    selectedOptions1: any
) => {
    const newErrors: any = {}

    if (!formData?.city_id && formData?.product_Category_valid != false) {
        newErrors.city_id = 'City is required'
    }
    if (
        selectedOptions?.length === 0 &&
        formData?.product_Category_valid != false
    ) {
        newErrors.product_category_ids = 'Product category is required'
    }

    if (!formData?.address && formData?.product_Category_valid != false) {
        newErrors.address = 'Address is required'
    }

    if (
        !formData?.hourly_throughput &&
        formData?.product_Category_valid != false
    ) {
        if (formData?.hourly_throughput === '') {
            newErrors.hourly_throughput = 'Hourly throughput is required'
        }
        if (formData?.hourly_throughput < 0) {
            newErrors.hourly_throughput = 'Hourly throughput is required'
        }
    }
    if (
        (!formData?.prepare_type_id ||
            formData?.prepare_type_id == 'Types of prepare') &&
        formData?.product_Category_valid != false
    ) {
        newErrors.prepare_type_id = 'Prepare type is required'
    }
    // if (formData?.product_category_ids?.length == 0) {
    //     newErrors.product_category_ids = 'Product category is required'
    // }
    if (!formData?.throughput && formData?.product_Category_valid != false) {
        if (formData?.throughput === '') {
            newErrors.throughput = 'Throughput is required'
        }
        if (formData?.throughput < 0) {
            newErrors.throughput = 'Throughput is required'
        }
    }
    if (!formData?.avg_case_size && formData?.product_Category_valid != false) {
        if (formData?.avg_case_size === '') {
            newErrors.avg_case_size = 'Avg.case size is required'
        }
        if (formData?.avg_case_size < 0) {
            newErrors.avg_case_size = 'Avg.case size is required'
        }
    }
    if (!formData?.no_of_docks && formData?.product_Category_valid != false) {
        if (formData?.no_of_docks === '') {
            newErrors.no_of_docks = 'No of docks is required'
        }
        if (formData?.no_of_docks < 0) {
            newErrors.no_of_docks = 'No of docks is required'
        }
    }
    // if (!formData?.type_of_dock_id) {
    //     newErrors.type_of_dock_id = 'Type of Dock id is required'
    // }
    if (
        !formData?.temperature_min &&
        formData?.product_Category_valid != false
    ) {
        if (!formData?.temperature_max) {
            newErrors.temperature_min = 'Min and max temperatures are required'
        } else {
            newErrors.temperature_min = 'Min temperature is required'
        }
    }
    if (
        !formData?.temperature_max &&
        formData?.temperature_min &&
        formData?.product_Category_valid != false
    ) {
        newErrors.temperature_min = 'Max temperature is required'
    }
    if (
        formData?.temperature_max < formData?.temperature_min &&
        formData?.product_Category_valid != false
    ) {
        newErrors.temperature_min =
            'Max temperature should be greater then min temperature'
    }
    if (
        formData?.temperature_max &&
        formData?.temperature_min &&
        formData?.temperature_max === formData?.temperature_min &&
        formData?.product_Category_valid != false
    ) {
        newErrors.temperature_min =
            'Max temperature should greater then min temperature'
    }
    if (!formData?.batch_size && formData?.product_Category_valid != false) {
        if (formData?.batch_size === '') {
            newErrors.batch_size = 'Batch size is required'
        }
        if (formData?.batch_size < 0) {
            newErrors.batch_size = 'Batch size is required'
        }
    }
    // if (!formData?.machine_ids) {
    //     newErrors.machine_ids = 'Machine id is required'
    // }
    // if (!formData?.area) {
    //     newErrors.area = 'Area is required'
    // }
    // Add more specific validation rules for other fields

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const validateBasicInfoForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.panNo) {
        newErrors.panNo = 'This field is required'
    }

    if (!formData?.address) {
        newErrors.address = 'Address is required'
    }

    if (formData?.throughput === '') {
        newErrors.throughput = 'Throughput is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateStorePartnerForm = (
    formData: any,
    setErrors: any,
    selectedOptions: any
) => {
    console.log('fggfghfh', formData)

    const newErrors: any = {}

    if (!formData?.weight_bridge_id && formData?.store_type_valid != false) {
        newErrors.weight_bridge_id = 'Weigh bridge is required'
    }
    if (
        (!formData?.road_condition_id || formData?.road_condition_id === '') &&
        formData?.store_type_valid != false
    ) {
        newErrors.road_condition_id = 'Please select road condition'
    }

    if (!formData?.city_id && formData?.store_type_valid != false) {
        newErrors.city_id = 'City is required'
    }

    if (!formData?.address && formData?.store_type_valid != false) {
        newErrors.address = 'Address is required'
    }
    if (formData?.address?.length < 4) {
        newErrors.address = 'Address should be atleast 5 character'
    }

    if (
        (!formData?.total_tonnage ||
            formData?.total_tonnage === '' ||
            formData?.total_tonnage <= 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.total_tonnage==='') {
        //     newErrors.total_tonnage = 'Total Tonnage is required'
        // }
        // if (formData?.total_tonnage<0) {
        //     newErrors.total_tonnage ='Total Tonnage is required'
        // }
        newErrors.total_tonnage = 'Total tonnage is required'
    }

    if (
        (selectedOptions?.length == 0 || !selectedOptions) &&
        formData?.store_type_valid != false
    ) {
        newErrors.store_type_id = 'Store type is required'
    }

    if (
        !formData?.cold_storage_type_id &&
        formData?.store_type_valid != false
    ) {
        newErrors.cold_storage_type_id = 'Cold storage type is required'
    }

    // if (!formData?.no_of_chambers) {
    //     newErrors.no_of_chambers = 'Number of Chambers is required'
    // }

    if (
        (!formData?.ante_room_area ||
            formData?.ante_room_area === '' ||
            formData?.ante_room_area <= 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.ante_room_area==='') {
        //     newErrors.ante_room_area = 'Ante Room Area is required'
        // }
        // if (formData?.ante_room_area<0) {
        //     newErrors.ante_room_area = 'Ante Room Area is required'
        // }
        newErrors.ante_room_area = 'Ante room area is required'
    }

    if (
        (!formData?.total_number_of_docks ||
            formData?.total_number_of_docks === '' ||
            formData?.total_number_of_docks < 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.total_number_of_docks==='') {
        //     newErrors.total_number_of_docks = 'Total Number of Docks is required'
        // }
        // if (formData?.total_number_of_docks<0) {
        //     newErrors.total_number_of_docks = 'Total Number of Docks is required'
        // }
        newErrors.total_number_of_docks = 'Total number of docks is required'
    }

    if (
        (!formData?.total_office_space ||
            formData?.total_office_space === '' ||
            formData?.total_office_space <= 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.total_office_space==='') {
        //     newErrors.total_office_space = 'Total Office Space is required'
        // }
        // if (formData?.total_office_space<=0) {
        //     newErrors.total_office_space = 'Total Office Space is required'
        // }
        newErrors.total_office_space = 'Total office space is required'
    }

    if (!formData?.type_of_dock_id && formData?.store_type_valid != false) {
        newErrors.type_of_dock_id = 'Type of dock is required'
    }

    if (
        (!formData?.processing_area ||
            formData?.processing_area === '' ||
            formData?.processing_area <= 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.processing_area==='') {
        //     newErrors.processing_area = 'Processing Area is required'
        // }
        // if (formData?.processing_area<0) {
        //     newErrors.processing_area = 'Processing Area is required'
        // }
        newErrors.processing_area = 'Processing area is required'
    }

    if (
        (!formData?.parking_area ||
            formData?.parking_area === '' ||
            formData?.parking_area <= 0) &&
        formData?.store_type_valid != false
    ) {
        // if (formData?.parking_area==='') {
        //     newErrors.parking_area = 'Parking Area is required'
        // }
        // if (formData?.parking_area<0) {
        //     newErrors.parking_area = 'Parking Area is required'
        // }
        newErrors.parking_area = 'Parking area is required'
    }

    if (
        !formData?.type_of_refrigeration_id &&
        formData?.store_type_valid != false
    ) {
        newErrors.type_of_refrigeration_id = 'Type of refrigeration is required'
    }

    if (!formData?.installation_year && formData?.store_type_valid != false) {
        newErrors.installation_year = 'Installation year is required'
    }

    if (
        !formData?.facility_manager_name &&
        formData?.store_type_valid != false
    ) {
        newErrors.facility_manager_name = 'Facility manager name is required'
    }

    if (
        (!formData?.facility_manager_contact ||
            formData?.facility_manager_contact?.length < 10) &&
        formData?.store_type_valid != false
    ) {
        newErrors.facility_manager_contact =
            'Facility manager contact is required'
    }

    if (!formData?.road_condition_id && formData?.store_type_valid != false) {
        newErrors.road_condition_id = 'Road condition is required'
    }

    if (
        (!formData?.three_d_view_of_asset ||
            formData?.three_d_view_of_asset?.length === 0) &&
        formData?.store_type_valid != false
    ) {
        newErrors.three_d_view_of_asset = 'This field is required'
    }

    if (
        (!formData?.photos_of_asset ||
            formData?.photos_of_asset?.length === 0) &&
        formData?.store_type_valid != false
    ) {
        newErrors.photos_of_asset = 'This field is required'
    }
    console.log('wertjkl', newErrors, formData)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const onkeyDown = (e: any) => {
    if (e.key === 'e' || e.key === '-') {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
}
export const onKeyDownForNumber = (e: any) => {
    // Allow only characters (letters)
    if (
        !(
            (e.key >= 'a' && e.key <= 'z') ||
            (e.key >= 'A' && e.key <= 'Z') ||
            e.key === 'Backspace' ||
            e.key === 'Delete' ||
            e.key === 'ArrowLeft' ||
            e.key === 'ArrowRight' ||
            e.key === 'Tab'
        )
    ) {
        e.preventDefault() // Prevent the default behavior for non-character keys
    }
}

export const onkeyDownOne = (e: any) => {
    console.log('TYYYYYYYYY7878', e.key)

    if (e.key === 'e' || e.key === 'E' || e.key === '-') {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
    if (e.target.value?.length < 1 && e.key === '0') {
        e.preventDefault()
    }
}
export const onkeyDownMobile = (e: any) => {
    console.log('TYYYYYYYYY7878')

    if (e.key === 'e' || e.key === '-') {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
    if (e.target.value?.length < 1 && e.key === '0') {
        e.preventDefault()
    }
    if (e.target.value?.length == 10 && e.key !== 'Backspace') {
        e.preventDefault()
    }
}
export const onkeyDownNew = (e: any) => {
    if (
        e.target.name === 'temp_range_min' ||
        e.target.name === 'temperature_min'
    ) {
        if (
            (e.key === 'e' ||
                e.target.value?.length == 5 ||
                e.key === 'E' ||
                e.key === '+') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight'
        ) {
            e.preventDefault()
        }
    } else {
        if (
            (e.key === 'e' ||
                e.key === '-' ||
                e.target.value?.length == 5 ||
                e.key === 'E' ||
                e.key === '+') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight'
        ) {
            e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
        }
        if (
            e.target.value?.length < 1 &&
            e.key === '0' &&
            e.target.name !== 'temp_range_max' &&
            e.target.name !== 'temperature_max'
        ) {
            e.preventDefault()
        }
    }
}
export const onkeyDownDimension = (e: any) => {
    if (e.key === 'e' || e.key === '-' || e.key === 'E' || e.key === '+') {
        e.preventDefault() // Prevent the default behavior (i.e., typing 'e' or '-')
    }
    if (e.target.value?.length < 1 && e.key === '0') {
        e.preventDefault()
    }
}
export const onkeyDownBankacNum = (e: any) => {
    if (
        (e.target.value?.length < 1 && e.key === '0') ||
        ((e.target.value?.length == 18 ||
            e.key === '-' ||
            e.key === '+' ||
            e.key === 'e' ||
            e.key === 'E') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight')
    ) {
        e.preventDefault()
    }
}
export const onkeyDownBankifscCode = (e: any) => {
    if (
        (e.target.value?.length < 1 && e.key === '0') ||
        ((e.target.value?.length == 11 ||
            e.key === '-' ||
            e.key === '+' ||
            e.key === 'e') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight')
    ) {
        e.preventDefault()
    }
}
export const onkeyDownPincode = (e: any) => {
    if (
        (e.target.value?.length < 1 && e.key === '0') ||
        ((e.target.value?.length == 6 ||
            e.key === '-' ||
            e.key === '+' ||
            e.key === 'e' ||
            e.key === '.' ||
            e.key === 'E') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight')
    ) {
        e.preventDefault()
    }
}
export const onkeyDownAadhar = (e: any) => {
    if (
        (e.target.value?.length < 1 && e.key === '0') ||
        ((e.target.value?.length == 12 ||
            e.key === '-' ||
            e.key === '+' ||
            e.key === 'e' ||
            e.key === 'E') &&
            e.key !== 'Backspace' &&
            e.key !== 'Delete' &&
            e.key !== 'Tab' &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight')
    ) {
        e.preventDefault()
    }
}
export function textContainsNumber(text: any) {
    const regex = /\d/
    return regex.test(text)
}
export const validateMovePartnerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.vehicle_make_id) {
        newErrors.vehicle_make_id = 'This field is required'
    }

    if (!formData?.vehicle_model_id) {
        newErrors.vehicle_model_id = 'This field is required'
    }
    if (!formData?.chassis_no) {
        newErrors.chassis_no = 'This field is required'
    }
    if (formData?.chassis_no && !textContainsNumber(formData?.chassis_no)) {
        newErrors.chassis_no = 'Please enter valid chassis No'
    }
    if (formData?.engine_no && !textContainsNumber(formData?.engine_no)) {
        newErrors.engine_no = 'Please enter valid engine no'
    }
    if (formData?.rc_no && !textContainsNumber(formData?.rc_no)) {
        newErrors.rc_no = 'Please enter valid RC no'
    }

    if (formData?.vehicle_no && !textContainsNumber(formData?.vehicle_no)) {
        newErrors.vehicle_no = 'Please enter valid vehicle no'
    }
    if (!formData?.vehicle_no) {
        newErrors.vehicle_no = 'This field is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateChamberForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.chamber_number) {
        newErrors.chamber_number = 'This field is required'
    }

    if (!formData?.chamber_name) {
        newErrors.chamber_name = 'This field is required'
    }

    if (!formData?.chamber_size) {
        newErrors.chamber_size = 'This field is required'
    }

    if (
        !formData?.chamber_size ||
        formData?.chamber_size.length < 4 ||
        !formData['ch-l'] ||
        !formData['ch-b'] ||
        !formData['ch-h']
    ) {
        newErrors.chamber_size = 'Enter all details'
    }

    if (!formData?.no_of_pallets) {
        newErrors.no_of_pallets = 'This field is required'
    }

    if (!formData?.pallet_size) {
        newErrors.pallet_size = 'This field is required'
    }

    if (
        !formData?.pallet_size ||
        formData?.pallet_size?.length < 4 ||
        !formData['pl-l'] ||
        !formData['pl-b'] ||
        !formData['pl-h']
    ) {
        newErrors.pallet_size = 'Enter all details'
    }

    if (!formData?.racking_type_id) {
        newErrors.racking_type_id = 'This field is required'
    }

    if (
        formData?.photo_of_entrance?.length < 1 ||
        !formData?.photo_of_entrance
    ) {
        newErrors.photo_of_entrance = 'This field is required'
    }

    if (!formData?.photo_of_chamber || formData?.photo_of_chamber?.length < 1) {
        newErrors.photo_of_chamber = 'This field is required'
    }

    if (!formData?.no_of_floors) {
        newErrors.no_of_floors = 'This field is required'
    }

    if (!formData?.floor_area) {
        newErrors.floor_area = 'This field is required'
    }

    if (!formData?.temp_range_min || !formData?.temp_range_max) {
        newErrors.temp_range = 'This field is required'
    }

    if (!formData?.each_floor_hight) {
        newErrors.each_floor_hight = 'This field is required'
    }

    if (!formData?.staircase) {
        newErrors.staircase = 'This field is required'
    }

    if (formData?.photos_of_asset?.length === 0) {
        newErrors.photos_of_asset = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCAEquipForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCompressorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This field is required'
    }

    if (!formData?.hp) {
        newErrors.hp = 'This field is required'
    }

    if (!formData?.amc) {
        newErrors.amc = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateACUForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.cmf) {
        newErrors.cmf = 'This field is required'
    }

    if (!formData?.hp) {
        newErrors.hp = 'This field is required'
    }

    if (!formData?.tr) {
        newErrors.tr = 'This field is required'
    }

    if (!formData?.defrosting_id) {
        newErrors.defrosting_id = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateCondensorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.amc) {
        newErrors.amc = 'This field is required'
    }

    if (!formData?.tr) {
        newErrors.tr = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateAMCForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.name_of_service) {
        newErrors.name_of_service = 'This field is required'
    }

    if (!formData?.vendor) {
        newErrors.vendor = 'This field is required'
    }

    if (!formData?.valid_till) {
        newErrors.valid_till = 'This field is required'
    }

    if (!formData?.fixed_cost) {
        newErrors.fixed_cost = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateIOTForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.type) {
        newErrors.type = 'This field is required'
    }

    if (!formData?.device_id) {
        newErrors.device_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This Field is required'
    }

    if (!formData?.internet_enabled) {
        newErrors.internet_enabled = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateITForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.type) {
        newErrors.type = 'This field is required'
    }

    if (!formData?.device_id) {
        newErrors.device_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateGeneratorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.kva) {
        newErrors.kva = 'This field is required'
    }

    if (!formData?.year) {
        newErrors.year = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateMHEForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.load) {
        newErrors.load = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateSolarInvertorForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.asset_id) {
        newErrors.asset_id = 'This field is required'
    }

    if (!formData?.make) {
        newErrors.make = 'This field is required'
    }

    if (!formData?.model) {
        newErrors.model = 'This field is required'
    }

    if (!formData?.capacity) {
        newErrors.capacity = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateStoreCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.country_id) {
        newErrors.country_id = 'This field is required'
    }

    if (!formData?.city_id) {
        newErrors.city_id = 'This field is required'
    }

    // if (!formData?.temperature) {
    //     newErrors.temperature = 'This field is required'
    // }

    if (!formData?.temperature_type_id) {
        newErrors.temperature_type_id = 'This field is required'
    }
    if (!formData?.quantity) {
        newErrors.quantity = 'This field is required'
    }
    if (!formData?.unit_id) {
        newErrors.unit_id = 'This field is required'
    }

    if (!formData?.date) {
        newErrors.date = 'This field is required'
    }
    if (!formData?.storage_duration) {
        newErrors.storage_duration = 'This field is required'
    }
    if (!formData?.storage_duration_type) {
        newErrors.storage_duration_type = 'This field is required'
    }
    if (!formData?.product_type_id) {
        newErrors.product_type_id = 'This field is required'
    }
    if (!formData?.temperature && formData?.temperature !== 0) {
        newErrors.temperature = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateMoveCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.origin_country_id) {
        newErrors.origin_country_id = 'This field is required'
    }

    if (!formData?.origin_city_id) {
        newErrors.origin_city_id = 'This field is required'
    }

    if (!formData?.dest_country_id) {
        newErrors.dest_country_id = 'This field is required'
    }

    if (!formData?.dest_city_id) {
        newErrors.dest_city_id = 'This field is required'
    }
    if (!formData?.load_quantity) {
        newErrors.load_quantity = 'This field is required'
    }
    if (!formData?.broad_category_id) {
        newErrors.broad_category_id = 'This field is required'
    }
    if (!formData?.product_type_id) {
        newErrors.product_type_id = 'This field is required'
    }
    if (formData?.load_quantity && !formData?.unit_id) {
        newErrors.load_quantity = 'Unit is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validatePrepareCustomerForm = (formData: any, setErrors: any) => {
    const newErrors: any = {}

    if (!formData?.product_category_id) {
        newErrors.product_category_id = 'This field is required'
    }

    if (!formData?.broad_category_id) {
        newErrors.broad_category_id = 'This field is required'
    }

    if (!formData?.service_category_id) {
        newErrors.service_category_id = 'This field is required'
    }

    if (!formData?.country_id) {
        newErrors.country_id = 'This field is required'
    }
    if (!formData?.state_id) {
        newErrors.state_id = 'This field is required'
    }
    if (!formData?.city_id) {
        newErrors.city_id = 'This field is required'
    }
    if (!formData?.throughput) {
        newErrors.throughput = 'This field is required'
    }
    if (formData?.throughput && !formData?.throughput_unit_id) {
        newErrors.throughput_unit_id = 'Unit is required'
    }
    if (!formData?.case_size) {
        newErrors.case_size = 'This field is required'
    }
    if (formData?.case_size && !formData?.case_size_unit_id) {
        newErrors.case_size_unit_id = 'Unit is required'
    }
    if (!formData?.temp_min && formData?.temp_min !== '0') {
        newErrors.temp_min = 'This field is required'
    }
    if (!formData?.temp_max && formData?.temp_max !== '0') {
        newErrors.temp_min = 'This field is required'
    }
    console.log(
        'YRTEREERE',
        formData,
        formData?.temp_max,
        formData?.temp_min,
        formData?.temp_max < formData?.temp_min
    )

    if (formData?.temp_max && formData?.temp_min) {
        if (parseInt(formData?.temp_max) < parseInt(formData?.temp_min)) {
            newErrors.temp_max = 'Maximum temperature should be greater'
        }
    }
    if (formData?.temp_max && formData?.temp_min && !formData?.temp_unit_id) {
        newErrors.temp_unit_id = 'Unit is required'
    }

    // if (!formData?.temp_max || formData?.temp_max === '0') {
    //     if (!formData?.temp_min) {
    //         newErrors.temp_max = 'Minimum and Maximum Temperatures are required'
    //     }
    //     else {
    //         newErrors.temp_max = 'Maximum Temperature is required'
    //     }
    // }
    if (!formData?.product_type_id) {
        newErrors.product_type_id = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const validateSHForm = (
    formData: any,
    setErrors: any,
    isEmailValid: any,
    isMobileValid: any
) => {
    const newErrors: any = {}
    const strongPasswordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.#^+_-]{8,}$/

    if (!formData?.fname) {
        newErrors.fname = 'This field is required'
    }

    if (!formData?.percentage_holding) {
        newErrors.percentage_holding = 'This field is required'
    }

    if (!formData?.address) {
        newErrors.address = 'This field is required'
    }

    if (!formData?.phone_number || formData?.phone_number?.length < 10) {
        newErrors.phone_number = 'This field is required'
    }
    if (!formData?.shareholder_email) {
        newErrors.shareholder_email = 'This field is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (
        formData?.shareholder_email &&
        !emailRegex.test(formData?.shareholder_email)
    ) {
        newErrors.shareholder_email = 'Please enter a valid email'
    }
    if (
        formData?.shareholder_email &&
        /\.\@/.test(formData?.shareholder_email)
    ) {
        newErrors.shareholder_email = 'Email not allow .@'
    }
    if (!formData?.designation) {
        newErrors.designation = 'This field is required'
    }
    if (!formData?.din_number) {
        newErrors.din_number = 'This field is required'
    }

    if (!formData?.authorized_signatory) {
        newErrors.authorized_signatory = 'This field is required'
    }
    if (
        !formData?.password &&
        formData?.type !== 'Edit' &&
        formData?.type !== 'View'
    ) {
        newErrors.password = 'This field is required'
    }
    if (
        formData?.password &&
        !strongPasswordRegex.test(formData?.password) &&
        formData?.type !== 'Edit' &&
        formData?.type !== 'View'
    ) {
        newErrors.password =
            'Minimum 8 characters, at least one number, one symbol and one uppercase letter'
    }
    if (
        formData?.shareholder_email &&
        isEmailValid &&
        isEmailValid !== 'Eligible'
    ) {
        newErrors.shareholder_email = isEmailValid || 'Please enter valid email'
    }
    if (
        formData?.phone_number &&
        isMobileValid &&
        isMobileValid !== 'Eligible'
    ) {
        newErrors.phone_number = isMobileValid || 'Please enter valid mobile'
    }

    console.log('GGGGGGGGG', newErrors, isMobileValid, isEmailValid)

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const validateBranchForm = (
    formData: any,
    setErrors: any,
    isEmailValid: any,
    isMobileValid: any
) => {
    const newErrors: any = {}

    if (!formData?.name) {
        newErrors.name = 'This field is required'
    }

    if (!formData?.address) {
        newErrors.address = 'This field is required'
    }

    if (!formData?.branch_gst) {
        newErrors.branch_gst = 'This field is required'
    }
    const reGST = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
    if (formData?.branch_gst && !reGST.test(formData?.branch_gst)) {
        newErrors.branch_gst = 'Please enter a valid gst number'
    }
    if (!formData?.branch_email) {
        newErrors.branch_email = 'This field is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData?.branch_email && !emailRegex.test(formData?.branch_email)) {
        newErrors.branch_email = 'Please enter a valid email'
    }
    if (formData?.branch_email && /\.\@/.test(formData?.branch_email)) {
        newErrors.branch_email = 'Email not allow .@'
    }
    if (!formData?.branch_head) {
        newErrors.branch_head = 'This field is required'
    }
    if (!formData?.branch_phone) {
        newErrors.branch_phone = 'This field is required'
    }
    if (formData?.branch_email && isEmailValid && isEmailValid !== 'Eligible') {
        newErrors.branch_email = isEmailValid || 'Please enter valid email'
    }
    if (
        formData?.branch_phone &&
        isMobileValid &&
        isMobileValid !== 'Eligible'
    ) {
        newErrors.branch_phone = isMobileValid || 'Please enter valid mobile'
    }

    console.log('GGGGGGGGG', newErrors, isMobileValid, isEmailValid)
    setErrors(newErrors)
    console.log('YYYYYYYYYYY', newErrors, Object.keys(newErrors).length === 0)

    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const validateBasicForm = (data: any, setErrors: any) => {
    const newErrors: any = {}

    if (!data?.country_id) {
        newErrors.country_id = 'This field is required'
    }

    if (!data?.state_id) {
        newErrors.state_id = 'This field is required'
    }

    if (!data?.address) {
        newErrors.address = 'This field is required'
    }

    if (
        typeof data?.gst_number === 'string' &&
        data?.gst_number !== '' &&
        data?.gst_file?.length < 1
    ) {
        newErrors.gst_file = 'GST file is required'
    }
    const reGST = /\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/
    if (data?.gst_number && !reGST.test(data?.gst_number)) {
        newErrors.gst_file = 'Please enter a valid gst number'
    }
    if (data?.shareholder_ids?.length < 1) {
        newErrors.shareholder_ids = 'This field is required'
    }
    if (data?.branch_ids < 1) {
        newErrors.branch_ids = 'This field is required'
    }
    if (!data?.pan_number) {
        newErrors.pan_number = 'This field is required'
    }
    if (!data?.pin_code) {
        newErrors.pin_code = 'This field is required'
    }
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]$/
    if (data?.pan_number && !panRegex.test(data?.pan_number)) {
        newErrors.pan_number = 'Please enter a valid pan number'
    }
    if (data?.vehicle_count > 10 && !data?.doc_for_vehicle) {
        newErrors.doc_for_vehicle = 'This field is rquired'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}
export const validateKeyForm = (
    data: any,
    setErrors: any,
    isEmailValid: any,
    isMobileValid: any
) => {
    const newErrors: any = {}
    const strongPasswordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&.#^+_-]{8,}$/

    if (!data?.full_name) {
        newErrors.full_name = 'This field is required'
    }

    if (!data?.person_email) {
        newErrors.person_email = 'This field is required'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (data?.person_email && !emailRegex.test(data?.person_email)) {
        newErrors.person_email = 'Please enter a valid email'
    }
    if (
        isEmailValid !== 'Eligible' &&
        data?.type !== 'Edit' &&
        data?.type !== 'View'
    ) {
        newErrors.person_email = isEmailValid
    }
    if (data?.person_email && /\.\@/.test(data?.person_email)) {
        newErrors.person_email = 'Email not allow .@'
    }
    console.log('TYYYYYYYYY', data)

    if (!data?.designation) {
        newErrors.designation = 'This field is required'
    }

    if (!data?.address) {
        newErrors.address = 'This field is required'
    }
    if (!data?.country_id) {
        newErrors.country_id = 'This field is required'
    }
    if (!data?.state_id) {
        newErrors.state_id = 'This field is required'
    }
    if (!data?.city_id) {
        newErrors.city_id = 'This field is required'
    }
    if (!data?.pin_code) {
        newErrors.pin_code = 'This field is required'
    }
    if (data?.pin_code && data?.pin_code?.length < 6) {
        newErrors.pin_code = 'Please enter valid pincode'
    }
    if (!data?.aadhar) {
        newErrors.aadhar = 'This field is required'
    }
    if (data?.aadhar && data?.aadhar?.length < 12) {
        newErrors.aadhar = 'Please enter valid aadhar ID'
    }
    if (!data?.contact_number) {
        newErrors.contact_number = 'This field is required'
    }
    if (!data?.password && data?.type !== 'Edit' && data?.type !== 'View') {
        newErrors.password = 'This field is required'
    }
    if (data?.password && !strongPasswordRegex.test(data?.password)) {
        newErrors.password =
            'Minimum 8 characters, at least one number, one symbol and one uppercase letter'
    }
    if (!data?.platform_role_id || data?.platform_role_id == 'Select') {
        newErrors.platform_role_id = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateAccountForm = (data: any, setErrors: any) => {
    const newErrors: any = {}

    if (!data?.account_name) {
        newErrors.account_name = 'This field is required'
    }

    if (!data?.account_number) {
        newErrors.account_number = 'This field is required'
    }

    if (!data?.bank_name) {
        newErrors.bank_name = 'This field is required'
    }

    if (!data?.bank_ifsc) {
        newErrors.bank_ifsc = 'This field is required'
    }
    if (data?.bank_ifsc && !textContainsNumber(data?.bank_ifsc)) {
        newErrors.bank_ifsc = 'Please enter valid IFSC'
    }
    if (!data?.branch_name) {
        newErrors.branch_name = 'This field is required'
    }
    if (!data?.cancelled_cheque || data?.cancelled_cheque?.length < 1) {
        newErrors.cancelled_cheque = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0 // Empty object indicates no validation errors
}

export const validateMakeModelForm = (formData: any, setError: any) => {
    let newErrors: any = {}

    if (!formData?.make || formData?.make == '') {
        newErrors.make = 'This field is required'
    }
    if (!formData?.model || formData?.model == '') {
        newErrors.model = 'This field is required'
    }

    setError(newErrors)
    return Object.keys(newErrors).length === 0
}

export const validateMachineForm = (formData: any, setError: any) => {
    let newErrors: any = {}

    if (!formData?.name || formData?.name == '') {
        newErrors.name = 'This field is required'
    }
    if (!formData?.type_of_machine || formData?.type_of_machine == '') {
        newErrors.type_of_machine = 'This field is required'
    }
    if (!formData?.make || formData?.make == '') {
        newErrors.make = 'This field is required'
    }
    if (!formData?.model || formData?.model == '') {
        newErrors.model = 'This field is required'
    }
    if (!formData?.purpose || formData?.purpose == '') {
        newErrors.purpose = 'This field is required'
    }
    if (!formData?.power_requirement || formData?.power_requirement == '') {
        newErrors.power_requirement = 'This field is required'
    }

    setError(newErrors)
    return Object.keys(newErrors).length === 0
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

export const locations = [
    { lat: 28.46659, lng: 80.03331 },
    { lat: 28.46859, lng: 77.03331 },
    { lat: 28.46989, lng: 40.03331 },
]
