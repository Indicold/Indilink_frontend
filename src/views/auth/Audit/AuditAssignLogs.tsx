/* The code is importing various dependencies and components for a React component called `AuditAssignTableList`.
Here is a breakdown of the imports: */
import React, { useEffect, useRef, useState } from 'react'

import throttle from 'lodash/throttle'

import Pagination from 'rc-pagination'

import 'rc-pagination/assets/index.css'

import { cloneDeep } from 'lodash'

import 'rc-pagination/assets/index.css'

import { Button } from '@/components/ui'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import usePutApi from '@/store/customeHook/putApi'
import axios from 'axios'
import { getToken } from '@/store/customeHook/token'
import { ToastContainer } from 'react-toastify'
import { messageView } from '@/store/customeHook/validate'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddTaskIcon from '@mui/icons-material/AddTask'
import useApiFetch from '@/store/customeHook/useApiFetch'
import AuditLogsModal from './AuditLogsModal'
import useApiFetch2 from '@/store/customeHook/useFetchApi2'
import DataNotFound from '@/components/layouts/DataNotFound'

/* The `tableHead` constant is an object that defines the column headers for a table. Each key-value
pair represents a column header, where the key is the property name and the value is the display
name for the header. In this case, the table has the following columns: */
const tableHead = {
    id: 'S.No',
    audit_id: 'Audit ID',
    // modulename: 'Module Name',
    status: 'Status',
    audit_temp_task_id: 'Audit Temp Task ID',
    updated_by: 'Audited By',
    created_by: 'Created By',
    updated_at: 'updated At',
    created_at: 'created At',
    // Action: 'Action',
}

const AuditLogsTableList = ({
    setType,
    allData,
    setModal,
    setAssetId,
    setDisabled,
    setData,
}: any) => {
    const { token }: any = getToken() // to fetch token using custom hook
    const permission: any = {
        role: 'View Assets',
    }
    /* The line `let { data: userList, loading: ULLoading }: any = useApiFetch(`admin/users`, token);`
    is using the `useApiFetch` custom hook to fetch data from the `admin/users` endpoint. */
    let { data: userList, loading: ULLoading }: any = useApiFetch2(
        `admin/admins`,
        token
    )

    let allDataArray: any = allData || []
    const countPerPage = 5
    console.log('ghfghgfhg', allDataArray, allData)

    /* The code snippet is using the `useState` hook from React to define and initialize state
    variables. */
    const [value, setValue] = React.useState('')
    const [currentPage, setCurrentPage] = React.useState(1)
    const [RowData, setRowData] = useState<any>({})
    const [AuditModal, setAuditModal] = useState<any>(false)
    const [collection, setCollection] = React.useState(
        allDataArray

        // cloneDeep(allDataArray.slice(0, countPerPage))
    )

    /* The line `const userPermissions :any= VerifyPermission();` is calling the `VerifyPermission`
    function and assigning its return value to the `userPermissions` constant. The
    `VerifyPermission` function is likely a custom hook or function that checks the user's
    permissions and returns an array of permissions. By assigning the return value to
    `userPermissions`, the code is storing the user's permissions for later use. */

    /* The `searchData` constant is using the `useRef` hook to create a mutable ref object. This ref
    object is initialized with a throttled function that is used for searching/filtering data in the
    `TableAudit` component. */
    const searchData = useRef(
        throttle((val) => {
            const query = val.toLowerCase()
            setCurrentPage(1)
            const filteredData = cloneDeep(
                allDataArray
                    .filter((item: any) =>
                        Object.keys(tableHead).some((key) => {
                            if (item[key] !== undefined && item[key] !== null) {
                                return (
                                    item[key]
                                        .toString()
                                        .toLowerCase()
                                        .indexOf(query) > -1
                                )
                            }
                            return false
                        })
                    )
                    .slice(0, countPerPage)
            )
            setCollection(filteredData)
        }, 400)
    )

    /* The `React.useEffect` hook is used to perform side effects in a React component. In this case,
    the effect is triggered whenever the `value` state variable changes. */
    React.useEffect(() => {
        if (!value) {
            updatePage(1)
        } else {
            searchData.current(value)
        }
    }, [value])
    React.useEffect(() => {
        // Update the displayed data when the AllStore prop changes.
        if (allData) {
            const to = countPerPage * currentPage
            const from = to - countPerPage
            const newCollection = cloneDeep(allData.slice(from, to))
            setCollection(newCollection)
        }
    }, [allData])

    /**
     * The function `updatePage` updates the current page and updates the collection of data displayed
     * based on the current page number.
     * @param {any} p - The parameter `p` represents the current page number.
     */
    const updatePage = (p: any) => {
        setCurrentPage(p)
        const to = countPerPage * p
        const from = to - countPerPage
        setCollection(cloneDeep(allDataArray.slice(from, to)))
    }

    const navigate = useNavigate()

    /**
     * The function `handleEdit` sets the data, asset ID, disabled state, type, and modal state based
     * on the provided `rowData`.
     * @param {any} rowData - The `rowData` parameter is an object that contains data for a specific
     * row in a table or grid. It likely includes properties such as `asset_id`, which is used to
     * identify the asset being edited.
     */
    const handleEdit = (rowData: any) => {
        // navigate('/edit-assets-data', { state: { states: rowData.asset_id, disabled: false } })
        setData(rowData)
        setAssetId(rowData.asset_id)
        setDisabled(false)
        setType('Edit')
        setModal(true)
    }

    /**
     * The function `handleView` sets the data, asset ID, disabled state, type, and modal state based
     * on the provided `rowData` parameter.
     * @param {any} rowData - The `rowData` parameter is an object that contains data for a specific
     * row in a table or list.
     */
    const handleView = (rowData: any) => {
        // navigate('/admin-assets-details', { state: { states: rowData.asset_id, disabled: true } })
        setData(rowData)
        setAssetId(rowData.asset_id)
        setDisabled(true)
        setType('View')
        setModal(true)
    }

    /**
     * The function "handleLogs" sets the "rowData" state and opens the "AuditModal" component.
     * @param {any} rowData - The `rowData` parameter is of type `any`, which means it can be any data
     * type. It is used as an argument to the `handleLogs` function.
     */
    const handleLogs = (rowData: any) => {
        setRowData(rowData)
        setAuditModal(true)
    }

    /* The following code is defining a function called `tableRows` that takes in two parameters `rowData`
    and `index`. It is used to render the rows in the Audit Listing */
    const tableRows = (rowData: any, index: any) => {
        const tableCell = Object.keys(tableHead)

        const columnData = tableCell.map((key, i) => {
            if (key === 'id') {
                return (
                    <td className=" flex justify-center p-2 gap-3" key={i}>
                        {(currentPage - 1) * countPerPage + index + 1}
                    </td>
                )
            }
            if (key === 'status') {
                return (
                    <td className=" flex justify-center p-2 gap-3" key={i}>
                        {rowData?.status == 0
                            ? 'Pending'
                            : rowData?.status == 1
                            ? 'Accept'
                            : 'Rejected'}
                    </td>
                )
            }
            if (key === 'is_verified') {
                return (
                    <td className=" flex justify-center p-2 gap-3" key={i}>
                        {rowData?.is_verified === 1
                            ? 'Verified'
                            : 'Not Verified'}
                    </td>
                )
            }
            if (key === 'updated_by') {
                return (
                    <td key={i}>
                        {`${
                            userList?.filter(
                                (item: any, index: any) =>
                                    item?.id == rowData?.updated_by
                            )[0]?.first_name
                        } 
                   ${
                       userList?.filter(
                           (item: any, index: any) =>
                               item?.id == rowData?.updated_by
                       )[0]?.last_name != null
                           ? userList?.filter(
                                 (item: any, index: any) =>
                                     item?.id == rowData?.updated_by
                             )[0]?.last_name
                           : ''
                   }`}
                    </td>
                )
            }
            if (key === 'created_by') {
                return (
                    <td key={i}>
                        {`${
                            userList?.filter(
                                (item: any, index: any) =>
                                    item?.id == rowData?.created_by
                            )[0]?.first_name || 'Not Available'
                        } ${
                            userList?.filter(
                                (item: any, index: any) =>
                                    item?.id == rowData?.created_by
                            )[0]?.last_name != null
                                ? userList?.filter(
                                      (item: any, index: any) =>
                                          item?.id == rowData?.created_by
                                  )[0]?.last_name
                                : ''
                        }`}
                    </td>
                )
            }

            return (
                <td key={i} className="p-3">
                    {rowData[key]}
                </td>
            )
        })

        return (
            <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
                {columnData}
            </tr>
        )
    }

    /**
     * The function `tableData` returns an array of table rows based on the data in the `collection`
     * array.
     * @returns The function `tableData` is returning the result of calling the `map` method on the
     * `collection` array. The `map` method is used to iterate over each element in the `collection`
     * array and apply the `tableRows` function to each element. The result is an array of table rows.
     */
    // const tableData = () => {

    //     return collection.map((rowData: any, index: any) => tableRows(rowData, index));

    // };

    const tableData = () => {
        return collection?.length > 0 ? (
            collection?.map((rowData: any, index: any) =>
                tableRows(rowData, index)
            )
        ) : (
            <tr>
                <td colSpan={12}>
                    <h4>Data Not Found</h4>
                </td>
            </tr>
        )
    }

    /**
     * The function `headRow` returns an array of table header cells, with a special condition for the
     * "Action" header based on the user's permission role.
     * @returns The function `headRow` returns an array of `<td>` elements.
     */
    const headRow = () => {
        return Object.values(tableHead).map((title, index) => {
            if (title === 'Action') {
                if (
                    permission?.role === 'Add Assets' ||
                    permission?.role === 'Edit Assets' ||
                    permission?.role === 'View Assets'
                ) {
                    return (
                        <td className="p-2 text-center" key={index}>
                            {title}
                        </td>
                    )
                }
            } else {
                return (
                    <td className="p-2 text-center" key={index}>
                        {title}
                    </td>
                )
            }
        })
    }

    /* The below code is a TypeScript React component that renders a table with search functionality
    and pagination. */
    return (
        <>
            {AuditModal && (
                <AuditLogsModal setModal={setAuditModal} RowData={RowData} />
            )}
            {true ? (
                <>
                    <ToastContainer />
                    <div className="search bg-white pl-4 ">
                        <label className="font-bold">Search:</label>

                        <input
                            type="search"
                            placeholder="Search "
                            value={value}
                            className="p-2 border-2 m-2"
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="table-container">
                        <table className="w-[100%]">
                            <thead className=" w-[100%]">
                                <tr
                                    className={`
                                      bg-table-column text-white det-header rounded-[13px] my-2 h-[40px]`}
                                >
                                    {headRow()}
                                </tr>
                            </thead>

                            <tbody className="trhover bg-white text-center">
                                {tableData()}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-center bg-white p-4">
                        <Pagination
                            pageSize={countPerPage}
                            onChange={updatePage}
                            current={currentPage}
                            total={allDataArray.length}
                        />
                    </div>
                </>
            ) : (
                <DataNotFound title="No Title" />
            )}
        </>
    )
}

export default AuditLogsTableList
