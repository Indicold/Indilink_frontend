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
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const PartnerTableAssetsList = () => {
    const { t, i18n }:any = useTranslation();
    const { token }: any = getToken();
    const [pageNo, setPageNo] = useState<any>(1)

    const {
        data: AllLength,
    }: any = useApiFetch<any>(`master/asset`, token)
    const {
        data: AllStore,
        loading: StoreRLoad,
        refetch: fetchApi
    }: any = useApiFetch<any>(`master/asset/10/${pageNo}`, token)

    return (
        <>
            <div className='mb-4'>
                <h5><b> {t("Assets List")}</b></h5>
            </div>

            {AllStore?.data?.length > 0 ? (
                <>
                    <TableLayout fetchApi={fetchApi}
                        setPageNo={setPageNo}
                        AllLength={AllLength}
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ) : <DataNotFound title="Create Assets" url="/collapse-menu-item-view-1" />}
            <div>
                {StoreRLoad && <LoaderSpinner />}
            </div>
        </>
    )
}

export default PartnerTableAssetsList
