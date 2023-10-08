/**
 * This is a TypeScript React component for a Partner Dashboard that allows the user to select their
 * user type and navigate to different pages based on their selection.
 * @returns The component is returning a `<div>` element containing a `<h2>` element with the text
 * "Partner Dashboard".
 */
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PartnerDashbord = () => {
    const navigate = useNavigate()
    /**
     * The handleChange function is used to handle the change event of a select input and navigate to
     * different pages based on the selected value.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input element.
     */
    const handleChange = (e: any) => {
        if (e.target.value == 1) {
            navigate('/partner_dashbord')
            localStorage.setItem('user_type', 'Partner')
        }
        if (e.target.value == 2) {
            localStorage.setItem('user_type', 'Customer')
            navigate('/home')
        }
        if (e.target.value == 3) {
            navigate('/investor-dashbord')
            localStorage.setItem('user_type', 'Investor')
        }
    }
    return (
        <div>
            <div className="w-full flex justify-between">
                <h2 className="text-start">Partner Dashboard</h2>
            </div>
        </div>
    )
}

export default PartnerDashbord
