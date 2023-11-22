/*
 * The code you provided is a TypeScript React component called `PartnerStoreList`.
 */
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React, { useState } from 'react'
import LoaderSpinner from '@/components/LoaderSpinner'
import CustomerDetailModal from '@/components/layouts/Customer/CustomerDetailModal'
import TableLayoutPartner from '../PartnerTableLayout'
const tableHead = {
    id: 'S.No',
    facility_manager_name: 'Manager Name',
    facility_manager_contact: 'Contact No',
    address: 'Address',
    asset_id: 'Asset Id',
    installation_year: 'Installation Year',
    Action: 'Action',
}
const PartnerStoreList = () => {
    const { token }: any = getToken()

    const {
        data: Store,
        loading: StoreLoad,
        error,
    } = useApiFetch<any>('partner/store', token)

    return (
        <>
              <h4 className="text-head-title text-center">
                        Store Support List
                    </h4>
            {Store?.data?.length > 0 ? (
                <>
                  
                    <TableLayoutPartner
                        AllStore={Store?.data?.length > 0 && Store?.data}
                        tableHead={tableHead}
                        type="Store"
                    />
                </>
            ) :<h3 className='mx-auto my-auto'>No Data Found</h3>}
            <div>{StoreLoad && <LoaderSpinner />}</div>
        </>
    )
}

export default PartnerStoreList
