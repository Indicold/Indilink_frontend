/*
 * The above code is a TypeScript React component that renders a table of assets. It imports various
 * components and custom hooks, such as LoaderSpinner, TableLayout, getToken, and useApiFetch. It also
 * imports React.
 */
import LoaderSpinner from '@/components/LoaderSpinner'
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
    }: any = useApiFetch<any>('master/asset', token)
console.log("TTTTTUUUUUU",AllStore);

    return (
        <>
                    <h4 className="text-head-title text-center">Assets List</h4>

            {AllStore?.data?.length > 0 ? (
                <>
                    <TableLayout
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ) : <h3 className='mx-auto my-auto'>No Data Found</h3>}
            <div>
                {(moveLoad || prepLoad || StoreLoad) && <LoaderSpinner />}
            </div>
        </>
    )
}

export default PartnerTableAssetsList
