/* The code is defining a React functional component called `CustomerTableTicketList`. */
import LoaderSpinner from '@/components/LoaderSpinner'
import TableLayout from '@/components/layouts/TableLayout'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React from 'react'
import TableLayoutCustomer from './TableLayoutCustomer'
import CustomerGeneralTableList from './CustomerGeneralTableList'
import DataNotFound from '@/components/layouts/DataNotFound'
import { useTranslation } from 'react-i18next'

/* The code defines a functional component called `CustomerTableTicketList`. Inside the component, it
performs several API calls using the `useApiFetch` custom hook to fetch data from different
endpoints. The fetched data is stored in variables such as `Store`, `Move`, `Prepare`, `AllStore`,
and `AllStoreGeneral`. */
const CustomerTableTicketList = () => {
    const { token }: any = getToken() // Extracting token for API call
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


    const { t, i18n }:any = useTranslation();

    return (
        <>
            {AllStore?.data?.length > 0 ? (
                <>
                    <h4 className="text-head-title mb-4 text-center"> {t("Ticket List")}</h4>
                    <TableLayoutCustomer fetchDataA={fetchDataA}
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                     <h4 className="text-head-title mt-6 text-center"> {t("General Ticket List")}</h4>
                  {AllStoreGeneral?.data?.length > 0 &&    <CustomerGeneralTableList fetchDataG={fetchDataG}
                        AllStore={AllStoreGeneral?.data}
                    />}
                </>
            ):
            
            <DataNotFound title="Create Query" url="/collapse-menu-item-view-1" />
            
            }
            <div>
                {(moveLoad || prepLoad || StoreLoad || StoreGRLoad) && <LoaderSpinner />}
            </div>
        </>
    )
}

export default CustomerTableTicketList
