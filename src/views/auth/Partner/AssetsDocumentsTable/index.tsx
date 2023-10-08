import LoaderSpinner from '@/components/LoaderSpinner'
import DocumentTableList from '@/components/layouts/TableLayout/DocumentTableList'
import useApiFetch from '@/store/customeHook/useApiFetch'
import { getToken } from '@/store/token'
import React from 'react'
import { useParams } from 'react-router-dom'

const AssetsDocumentsTable = () => {
    const {token}:any=getToken();
    const {id}:any=useParams();
    const {
        data: AllStore,
        loading: StoreRLoad,
        error: allerr,
    }: any = useApiFetch<any>(`legal/document-final/${id}`, token)
  return (
    <div>
      <h2>Doument List</h2>

      {AllStore?.data?.length > 0 ? (
                <>
                    <DocumentTableList
                        AllStore={AllStore?.data?.length > 0 && AllStore?.data}
                    />
                </>
            ) : <h3 className='mx-auto my-auto'>No Data Found</h3>}
            <div>
                {/* {StoreRLoad && <LoaderSpinner />} */}
            </div>
    </div>
  )
}

export default AssetsDocumentsTable
