import React, { useRef, useState } from 'react'
import throttle from 'lodash/throttle'
import Pagination from 'rc-pagination'
import 'rc-pagination/assets/index.css'
import { cloneDeep } from 'lodash'
import 'rc-pagination/assets/index.css'
import { Button } from '@/components/ui' // Imports a Button component.
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// Defines the table header with column names.

// The MachineTable component takes a prop called AllStore, presumably for rendering data.

const MachineTable = ({ AllStore, tableHead,setModal,modal,setFormData }: any) => {
    
    let allData: any = AllStore;
    const countPerPage = 10
    const [value, setValue] = React.useState('')

    const [currentPage, setCurrentPage] = React.useState(1)
    const [collection, setCollection] = React.useState(
        cloneDeep(allData?.slice(0, countPerPage))
    )

    // Ref for a search function that filters data based on user input.
    const searchData = useRef(
        throttle((val) => {
            const query = val.toLowerCase()
            setCurrentPage(1)
            const filteredData = cloneDeep(
                allData
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

    React.useEffect(() => {
        // Update the displayed data when the search input value changes.
        if (!value) {
            updatePage(1)
        } else {
            searchData.current(value)
        }
    }, [value])

    React.useEffect(() => {
        // Update the displayed data when the AllStore prop changes.
        if (allData) {
          const to = countPerPage * currentPage;
          const from = to - countPerPage; 
            const newCollection = cloneDeep(allData.slice(from, to));
            setCollection(newCollection);
        }
      }, [allData]);

    const updatePage = (p: any) => {
        // Function to update the current page of data.
        setCurrentPage(p)
        const to = countPerPage * p
        const from = to - countPerPage
        setCollection(cloneDeep(allData.slice(from, to)))
    }


    const handleEdit = (rowData:any) => {
    setFormData({...rowData,type:"Edit"})
    
    // debugger

     setModal(true)
    }

    const handleView = (rowData:any) => {
    setFormData({...rowData,type:"View"})
    
    // debugger

     setModal(true)
    }

    const tableRows = (rowData: any, index: any) => {
        // Generates table rows based on data.
        const tableCell = Object.keys(tableHead)
        const columnData = tableCell?.map((key, i) => {
            // Renders table cells for each column in the header.
         
            if (key === 'Action') {
                return (
                    <td className="flex justify-center p-2 gap-3" key={i}>
                        <Button
                        type='button'
                            className="!p-3 pt-0 pb-0"
                            onClick={()=>handleEdit(rowData)}
                        >
                            <EditIcon />
                        </Button>
                        <Button
                          type='button'
                            className="!p-3 pt-0 pb-0"
                            onClick={()=>handleView(rowData)}
                        >
                           <VisibilityIcon />
                        </Button>
                    </td>
                )
            }
            return (
                <td key={i} className="text-center">
                    {rowData[key]}
                </td>
            )
        })

        return <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">{columnData}</tr>
    }

    const tableData = () => {
        // Generates table data rows.
       return collection?.length>0 ? collection?.map((rowData: any, index: any) => 
      tableRows(rowData, index)) :<tr>
         <td colSpan={12}><h4 className='text-center'>Data Not Found</h4></td>
       </tr>;
     
     };

    const headRow = () => {
        // Generates the header row.
        return Object.values(tableHead).map((title:any, index:any) => (
            <td key={index} className="text-center">
                {title}
            </td>
        ))
    }

    // JSX structure for rendering the table and pagination.

    return (
        <>
            <div className="search bg-white">
                <label className="font-bold m-4">Search:</label>
                <input
                    placeholder="Search here..."
                    value={value}
                    className="p-2 border-2 m-2"
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-[#0f3492] text-white det-header rounded-[13px] my-2 h-[40px]">
                        {headRow()}
                    </tr>
                </thead>
                <tbody className="trhover bg-white">{tableData()}</tbody>
            </table>
            <div className="flex justify-center bg-white p-4">
                <Pagination
                    pageSize={countPerPage}
                    onChange={updatePage}
                    current={currentPage}
                    total={allData.length}
                />
            </div>
        </>
    )
}

export default MachineTable
