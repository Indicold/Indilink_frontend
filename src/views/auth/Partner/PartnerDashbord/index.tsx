/**
 * This is a TypeScript React component for a Partner Dashboard that allows the user to select their
 * user type and navigate to different pages based on their selection.
 * @returns The component is returning a `<div>` element containing a `<h2>` element with the text
 * "Partner Dashboard".
 */
import CardLayout from '@/components/layouts/Dashbord/CardLayout'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'




const PartnerDashbord = () => {
    const { t, i18n }:any = useTranslation();
    return (
        <>
        
            <CardLayout title={t("Partner Dashboard")} />
        </>
    )
}

export default PartnerDashbord
