/* The code is defining a React functional component called `CustomerTableTicketList`. */
import LoaderSpinner from '@/components/LoaderSpinner'
import TableLayout from '@/components/layouts/TableLayout'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React from 'react'
import TableLayoutCustomer from './TableLayoutCustomer'
import CustomerGeneralTableList from './CustomerGeneralTableList'
import DataNotFound from '@/components/layouts/DataNotFound'

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
        refetch:fetchDataA
    }: any = useApiFetch<any>('customer/get-search-list-by-user', token)
    const {
        data: AllStoreGeneral,
        loading: StoreGRLoad,
        refetch:fetchDataG
    }: any = useApiFetch<any>('customer/general/search', token)


    console.log(AllStoreGeneral)

    return (
        <>
            {AllStore?.data?.length > 0 ? (
                <>
                    <h4 className="text-head-title text-center">Ticket List</h4>
                    <TableLayoutCustomer fetchDataA={fetchDataA}
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                     <h4 className="text-head-title text-center">General Ticket List</h4>
                      <CustomerGeneralTableList fetchDataG={fetchDataG}
                        AllStore={AllStoreGeneral?.data?.length > 0 && AllStoreGeneral?.data}
                    />
                </>
            ):
            
            <DataNotFound />
            
            }
            <div>
                {(moveLoad || prepLoad || StoreLoad || StoreGRLoad) && <LoaderSpinner />}
            </div>
        </>
    )
}

export default CustomerTableTicketList
