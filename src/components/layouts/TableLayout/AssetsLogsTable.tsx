import React, { useEffect, useRef, useState } from 'react'; // Importing React to define React component and to use hooks
import throttle from "lodash/throttle";
import Pagination from "rc-pagination"; // Importing pagination component for showing table records in multiple pages
import "rc-pagination/assets/index.css"; // Importing pagination component styles
import { cloneDeep } from 'lodash';
import "rc-pagination/assets/index.css"; // Importing styles for UI
import { Button } from '@/components/ui'; // Imports a Button component.
import { useNavigate } from 'react-router-dom'; // For handling navigation
import TextSnippetIcon from '@mui/icons-material/TextSnippet'; // Importing icon to show in Table action column for viewing attached documents to a record
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'; // Importing icon to show in Table action column for viewing a record
import EditIcon from '@mui/icons-material/Edit'; // Importing icon to show in Table action column for editing a record
import usePutApi from '@/store/customeHook/putApi'; // Importing custom hook for API call
import { messageView, messageViewNew } from '@/store/customeHook/validate'; // Importing custom function to show toast message
import { ToastContainer } from 'react-toastify'; // Importing container to show Toast messages
import AssetsLogsModal from './AssetsLogsModal';
// Defines the table header with column names.
const tableHead = {
  asset_id: "Asset ID",
  transition_type: "Transition Type",
  transition_by: "Transition By",
  // is_deleted: "Is Deleted",
  // is_deletedBy: "Is Deleted By",
  created_at: "Created At",
  updated_at: "Updated At",
  comment: "Comments",
  Action: "Action"
};

// The AssetsLogsTable component takes a prop called AllStore, presumably for rendering data.

const AssetsLogsTable = ({ AllStore,fetchApi }: any) => {
  let allData: any = AllStore;
  const countPerPage = 10;

  /* These lines of code are using the `useState` hook from React to create state variables in a
  functional component. */
  const [value, setValue] = React.useState("");
  const [Alert,setAlert]=useState<any>(false)
  const [RowData,setRowData]=useState<any>({});
  const [logsModal,setLogsModal]=useState<any>(false)

/* The line of code is using object destructuring to extract the `result`, `loading`, and
`sendPostRequest` properties from the return value of the `usePutApi` custom hook. */
let { result: SubmitResponse, loading: SubmitLoading, sendPostRequest: PostSubmitDetails }: any = usePutApi(`partner/asset-status-update/${RowData?.asset_id}`)

  /* The code snippet is using the `useState` hook from React to create state variables `currentPage`
  and `collection` in a functional component for handling pagination. */
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );


  // Ref for a search function that filters data based on user input.
  const searchData = useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const filteredData = cloneDeep(
        allData.filter((item: any) =>
          Object.keys(tableHead).some(key => {
            if (item[key] !== undefined && item[key] !== null) {
              return item[key].toString().toLowerCase().indexOf(query) > -1;
            }
            return false;
          })
        ).slice(0, countPerPage)
      );
      setCollection(filteredData);
    }, 400)
  );

  React.useEffect(() => {
    // Update the displayed data when the search input value changes.
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);

  const updatePage = (p: any) => {
    // Function to update the current page of data.
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage; 
    setCollection(cloneDeep(allData.slice(from, to)));
  };

  const navigate = useNavigate();

  const handleEdit = (rowData: any) => {
    // Handle edit action for different asset types.
    
    if (rowData?.asset_type_id === 1) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '1')
      navigate(`/partner-registration/${rowData?.asset_id}`, { state: false })
    }
    if (rowData?.asset_type_id === 3) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '3')
      navigate(`/partner-bussiness-type-prepare/${rowData?.asset_id}`, { state: false })
    }
    if (rowData?.asset_type_id === 2) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '2')
      navigate(`/partner-bussiness-type-move/${rowData?.asset_id}`, { state: false })
    }
  };
  
  const handleView = (rowData: any) => {
    
    // Handle view action for different asset types.
    if (rowData?.asset_type_id === 1) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '1')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-registration/${rowData?.asset_id}`, { state: true })
    }
    if (rowData?.asset_type_id === 3) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '3')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-bussiness-type-prepare/${rowData?.asset_id}`, { state: true })
    }
    if (rowData?.asset_type_id === 2) {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '2')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-bussiness-type-move/${rowData?.asset_id}`, { state: true })
    }
  }

  /**
   * The handleSubmit function updates the rowData state and sets the alert state to true.
   * @param {any} rowData - The rowData parameter is of type "any", which means it can accept any data
   * type. It is used to pass the data that needs to be set as the new value for the rowData state
   * variable.
   */
  const handleSubmit=(rowData:any)=>{
    
    setRowData(rowData)
    setAlert(true)
  }

  /**
   * The handleConfirm function calls the PostSubmitDetails function with a status of "Final".
   * Function will hit API to make the asset final
   */
  const handleConfirm=()=>{
    
    PostSubmitDetails({status:"Final"})
  }

/**
 * The function `handleDocs` navigates to a specific document list page based on the `asset_id`
 * property of the `rowData` object.
 * @param {any} rowData - The `rowData` parameter is an object that represents a row of data. It is of
 * type `any`, which means it can be any type of data.
 */
const handleDocs=(rowData:any)=>{
  navigate(`/documents-list/${rowData?.asset_id}`)
}
  const tableRows = (rowData: any, index: any) => {
    // Generates table rows based on data.
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((key, i) => {
      // Renders table cells for each column in the header.
      if (key === 'asset_type') {
        return <td key={i} className='text-center'>{rowData.asset_type.type}</td>;
      }
      if (key === 'is_registration_complete') {
        return <td className='text-center' key={i} >{rowData.is_registration_complete ? "Complete" : "Pending"}</td>;
      }
      if (key === 'is_verified') {
        return <td className='text-center' key={i} >{rowData.is_verified ? "Verified" : "Not Verified"}</td>;
      }
      if (key === 'created_at') {
        return <td className='text-center' key={i} >{new Date(rowData.created_at)?.toLocaleDateString()}</td>;
      }
      if (key === 'updated_at') {
        return <td className='text-center' key={i} >{new Date(rowData.updated_at)?.toLocaleDateString()}</td>;
      }
      if (key === 'Action') {
        return <td className='text-center flex' key={i} >
          {rowData?.status==='Final' ? null : <Button className='!p-3 pt-0 pb-0' onClick={() => handleEdit(rowData)}><EditIcon /></Button>}
          <Button className='!p-2' onClick={() => handleView(rowData)}><RemoveRedEyeIcon /></Button>
          <Button className='!p-2' onClick={() => handleDocs(rowData)}><TextSnippetIcon /></Button>
          <Button className='!p-2' onClick={()=>handleSubmit(rowData)}>Submit</Button>
        </td>;
      }
      return <td key={i} className='text-center'>{rowData[key]}</td>;
    });

    return <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">{columnData}</tr>;
  };

  const tableData = () => {
    // Generates table data rows.
   return collection?.length>0 ? collection?.map((rowData: any, index: any) => 
  tableRows(rowData, index)) :<tr>
     <td colSpan={12}><h4 className='text-center'>Data Not Found</h4></td>
   </tr>;
 
 };

  const headRow = () => {
    // Generates the header row.
    return Object.values(tableHead).map((title, index) => (
      <td key={index} className='text-center'>{title}</td>
    ));
  };

/* The above code is using the useEffect hook in a React component. It is triggering the effect
whenever the value of SubmitResponse changes. */
useEffect(()=>{
messageViewNew(SubmitResponse)
if(SubmitResponse?.status===200){
  setAlert(false)
  fetchApi();
  const to = countPerPage * currentPage;
  const from = to - countPerPage; 
  setCollection(cloneDeep(allData.slice(from, to)));
}
SubmitResponse=7676;
fetchApi();
},[SubmitResponse])

// JSX structure for rendering the table and pagination.
  return (
    <>
    <ToastContainer />
    {Alert &&
     <div
                    id="authentication-modal"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="my-auto relative w-full max-w-[600px] max-h-full rounded-[13px]">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      
                            <div className="px-6 py-6 lg:px-8">
                                <h6 className="text-center"> You cannot make changes after submitting.</h6>
                                    
                                
<div className='flex mt-4'>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    variant="solid"
                                    onClick={()=>setAlert(false)}
                                    type="button"
                                    className="indigo-btn !w-[30%] mx-auto rounded-[30px]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    style={{ borderRadius: '13px' }}
                                    block
                                    variant="solid"
                                    onClick={handleConfirm}
                                    type="button"
                                    className="indigo-btn !w-[30%] mx-auto rounded-[30px]"
                                >
                                    Submit
                                </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
      <div className="search bg-white">
        <label className='font-bold m-4'>Search:</label>
        <input
          placeholder="Search here..."
          value={value}
          className='p-2 border-2 m-2'
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <div className='overflow-auto'>
      <table className='w-full'>
        <thead>
          <tr className='bg-[#0f3492] text-white det-header rounded-[13px] my-2 h-[40px]'>{headRow()}</tr>
        </thead>
        <tbody className="trhover bg-white">{tableData()}</tbody>
      </table>
      </div>
      <div className='flex justify-center bg-white p-4'>
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

export default AssetsLogsTable;
