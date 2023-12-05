/* These lines of code are importing various components and functions from different files and
libraries. */
import LoaderSpinner from '@/components/LoaderSpinner'
import DataNotFound from '@/components/layouts/DataNotFound'
import DocumentTableList from '@/components/layouts/TableLayout/DocumentTableList'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { getToken } from '@/store/token'
import React from 'react'
import { useParams } from 'react-router-dom'

const AssetsDocumentsTable = () => {
    const {token}:any=getToken(); // Extracting token to define payload for API call
    const {id}:any=useParams(); // Extracting active URL endpoint to define payload for API call
    const {
        data: AllStore,
        loading: StoreRLoad,
        error: allerr,
    }: any = useApiFetch<any>(`legal/document-final/${id}`, token)
  return (
    <div>
      <h2>Document List</h2>

      {AllStore?.data?.length > 0 ? (
                <>
                    <DocumentTableList
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ) : <DataNotFound title="No Title" url="/collapse-menu-item-view-1" />}
            <div>
                {/* {StoreRLoad && <LoaderSpinner />} */}
            </div>
    </div>
  )
}

export default AssetsDocumentsTable
