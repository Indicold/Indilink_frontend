/*
 * The above code is a TypeScript React component that renders a table of assets. It imports various
 * components and custom hooks, such as LoaderSpinner, TableLayout, getToken, and useApiFetch. It also
 * imports React.
 */
import LoaderSpinner from '@/components/LoaderSpinner'
import DataNotFound from '@/components/layouts/DataNotFound'
import TableLayout from '@/components/layouts/TableLayout'
import { getToken } from '@/store/customeHook/token'
import useApiFetch from '@/store/customeHook/useApiFetch'
import React from 'react'

const PartnerTableAssetsList = () => {
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
        refetch:fetchApi
    }: any = useApiFetch<any>('master/asset', token)

    return (
        <>
                    <h4 className="text-head-title text-center">Assets List</h4>

            {AllStore?.data?.length > 0 ? (
                <>
                    <TableLayout fetchApi={fetchApi}
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ) :  <DataNotFound title="Create Assets" url="/collapse-menu-item-view-1" />}
            <div>
                {(moveLoad || prepLoad || StoreLoad) && <LoaderSpinner />}
            </div>
        </>
    )
}

export default PartnerTableAssetsList
