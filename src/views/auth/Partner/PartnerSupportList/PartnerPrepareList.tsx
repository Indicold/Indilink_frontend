/*
 * The code is a React component called `PartnerPrepareList`.
 */
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React from 'react'
import LoaderSpinner from '@/components/LoaderSpinner'
import TableLayoutPartner from '../PartnerTableLayout'
const tableHead = {
    id: 'S.No',
    avg_case_size: 'Avg.case size',
    no_of_docks: 'No Of Docks',
    address: 'Address',
    asset_id: 'Asset Id',
    area: 'Area',
    Action: 'Action',
}
const PartnerPrepareList = () => {
    const { token }: any = getToken()
    const {
        data: PrepareData,
        loading: PrepareLoad,
        error,
    } = useApiFetch<any>('partner/prepare', token)
    console.log('FFFFFFF', PrepareData)

    return (
        <>
          <h4 className="text-head-title text-center">
                        Prepare Support List
                    </h4>
            {PrepareData?.data?.length > 0 ? (
                <>
                  
                    <TableLayoutPartner
                        AllStore={
                            PrepareData?.data?.length > 0 && PrepareData?.data
                        }
                        tableHead={tableHead}
                        type="Prepare"
                    />
                </>
            ) :<h3 className='mx-auto my-auto'>No Data Found</h3>}
            <div>{PrepareLoad && <LoaderSpinner />}</div>
        </>
    )
}

export default PartnerPrepareList
