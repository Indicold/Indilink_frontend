/* The code is defining a React functional component called `CustomerTableTicketList`. */
import LoaderSpinner from '@/components/LoaderSpinner'
import TableLayout from '@/components/layouts/TableLayout'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React from 'react'
import TableLayoutCustomer from './TableLayoutCustomer'
import DataNotFound from '@/components/layouts/DataNotFound'
import DataNotFoundBar from '@/components/layouts/DataNotFoundBar'

const CustomerTableTicketList = () => {
    const { token }: any = getToken()
    const {
        data: Store,
        loading: StoreLoad,
        error,
    } = useApiFetch<any>('partner/store', token)
    const {
        data: Move,
        loading: moveLoad,
        error: moveErr,
    } = useApiFetch<any>('partner/move', token)
    const {
        data: Prepare,
        loading: prepLoad,
        error: prepErr,
    } = useApiFetch<any>('partner/prepare', token)
    const {
        data: AllStore,
        loading: StoreRLoad,
        error: allerr,
    }: any = useApiFetch<any>('customer/get-search-list-by-user', token)

    return (
        <>
            {!AllStore?.data?.length > 0 ? (
                <>
                    <h4 className="text-head-title text-center">Ticket List</h4>
                    <TableLayoutCustomer
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ):
            
            <DataNotFound />
            
            }
            <div>
                {(moveLoad || prepLoad || StoreLoad) && <LoaderSpinner />}
            </div>
        </>
    )
}

export default CustomerTableTicketList
