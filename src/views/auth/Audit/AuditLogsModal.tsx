import { Button } from '@/components/ui'
import React from 'react'
// import AssetsLogsTable from './AssetsLogsTable'
// import DataNotFound from '../DataNotFound'
import { getToken } from '@/store/customeHook/token'
import AuditLogsTableList from './AuditAssignLogs'
import useApiFetch2 from '@/store/customeHook/useFetchApi2'
import DataNotFound from '@/components/layouts/DataNotFound'
const AuditLogsModal = ({ setModal, RowData }: any) => {
    const { token }: any = getToken()
    console.log('TYTYTYTYTY', RowData)

    /* The code is using the `useApiFetch` custom hook to make an API request to fetch audit logs data
    for a specific asset. */
    const {
        data: AllStore,

        refetch: fetchApi,
    }: any = useApiFetch2<any>(
        `audit/getAuditLogs/${RowData?.asset_id}/${RowData?.audit_module_id}`,
        token
    )
    console.log('grerwre', AllStore)

    /* The `return` statement is returning JSX code that represents the UI of the `AuditLogsModal`
  component. */
    return (
        <>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="my-auto relative w-full max-w-[1000px] max-h-full rounded-[13px]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-white">
                        <button
                            onClick={() => setModal(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h5 className="flex justify-center w-full !text-center">
                                <b className="flex">Audit Logs</b>
                            </h5>
                            {AllStore?.length > 0 ? (
                                <AuditLogsTableList
                                    allData={AllStore}
                                    fetchApi={fetchApi}
                                />
                            ) : (
                                <DataNotFound title="No Title" url="/" />
                            )}
                            <div className="flex mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuditLogsModal
