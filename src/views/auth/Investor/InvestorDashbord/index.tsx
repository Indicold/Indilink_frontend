/**
 * This is a TypeScript React component for an Investor Dashboard that allows the user to select their
 * user type and navigate to different dashboards based on their selection.
 * @returns The InvestorDashboard component is returning a div element containing a h2 element with the
 * text "Investor Dashboard".
 */
import CardLayout from '@/components/layouts/Dashbord/DashboardInvestor/CardLayout';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

   

/**
 * The `InvestorDashboard` component is a TypeScript React component that renders a card layout with
 * the title "Investor Dashboard" and allows the user to select a user type, which is then stored in
 * localStorage and navigates to a specific page based on the selected value.
 */
const InvestorDashbord = () => {
  
    const navigate = useNavigate()
    /**
     * The handleChange function sets the user_type in localStorage based on the selected value and
     * navigates to a specific page.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handleChange`
     * function. It is typically used to access information about the event that triggered the
     * function, such as the target element and its value.
     */
    const handleChange = (e: any) => {
        if (e.target.value == 1) {
            localStorage.setItem('user_type', 'Partner')

            navigate('/partner-dashbord')
        }
        if (e.target.value == 2) {
            localStorage.setItem('user_type', 'Customer')

            navigate('/home')
        }
        if (e.target.value == 3) {
            localStorage.setItem('user_type', 'Investor')

            navigate('/investor-dashbord')
        }

    }

    const { t, i18n }:any = useTranslation();
    return (
        <>
          
            <CardLayout title= {t("Investor Dashboard")} />
        </>
    )
}

export default InvestorDashbord
