export const validateEmail = async (email: any, setIsEmailValid: any) => {
    let body: any = {
        email: email
    };

    try {
        const response = await fetch('https://seal-app-uqxwl.ondigitalocean.app/auth/check-email', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // Convert body object to JSON
        });

        const data = await response.json();

        // Check if data.isValid is defined before using it
        if (data) {
            setIsEmailValid(data.message);
        }
    } catch (error) {
        console.error('Error validating email:', error);
    }
};

export const validateForm = (formData: any, setError: any) => {
    const errorss: any = {}

    if (formData.password !== formData.confirm_password) {
        console.log("formData.password !== formData.confirm_password", formData.password, formData.confirm_password);

        errorss.password = 'Passwords do not match';
    }
    if (!formData.password) {

        errorss.password = 'Password is required';
    }
    if (!formData.term_condition) {

        errorss.term_condition = 'Please Accept Term & condition';
    }

    // Add more specific validation rules for each field
    if (!formData.first_name) {

        errorss.first_name = 'First name is required';
    }

    if (!formData.last_name) {
        errorss.last_name = 'Last name is required';
    }

    if (!formData.email) {
        errorss.email = 'Email is required';
    }
    if (formData.email) {
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errorss.email = 'Invalid email address';
        }
    }

    if (!formData.phone_number) {
        errorss.phone_number = 'Phone Number is required';
    }
    if (formData.phone_number) {
        if (!/^[0-9+\-]+$/.test(formData.phone_number)) {
            errorss.phone_number = 'Mobile Number should be 10 digit';
        }
    }


    // Add more validation rules for other fields
    setError(errorss)
    return Object.keys(errorss).length == 0; // Empty string indicates no validation errors
};

export const validateMobile = async (phone_number: any, setIsMobileValid: any) => {
    let body: any = {
        phone_number: phone_number
    };

    try {
        const response = await fetch('https://seal-app-uqxwl.ondigitalocean.app/auth/check-phone', {
            method: 'POST', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body) // Convert body object to JSON
        });

        const data = await response.json();

        // Check if data.isValid is defined before using it
        if (data.message) {
            setIsMobileValid(data.message);
        }
    } catch (error) {
        console.error('Error validating email:', error);
    }
};