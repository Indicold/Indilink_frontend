import React, { useEffect, useRef, useState } from 'react';
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { cloneDeep } from 'lodash';
import "rc-pagination/assets/index.css";
import { Button } from '@/components/ui'; // Imports a Button component.
import { useNavigate } from 'react-router-dom';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import usePutApi from '@/store/customeHook/putApi';
import { messageView } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';
// Defines the table header with column names.
const tableHead = {
  asset_id: "Asset ID",
  is_registration_complete: "Registration",
  is_verified: "Verification Status",
  // is_deleted: "Is Deleted",
  // is_deletedBy: "Is Deleted By",
  created_at: "Created At",
  updated_at: "Updated At",
  assetType: "Asset Type",
  Action: "Action"
};

// The TableLayout component takes a prop called AllStore, presumably for rendering data.

const TableLayout = ({ AllStore,fetchApi }: any) => {
  let allData: any = AllStore;
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [Alert,setAlert]=useState<any>(false)
  const [RowData,setRowData]=useState<any>({})
  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );

let { result: SubmitResponse, loading: SubmitLoading, sendPostRequest: PostSubmitDetails }: any = usePutApi(`partner/asset-status-update/${RowData?.asset_id}`)

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
    console.log("TTTTTTTTTTTT",rowData,`/partner-registration/${rowData?.asset_id}`);
    
    if (rowData?.assetType === 'Store') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '1')
      navigate(`/partner-registration/${rowData?.asset_id}`, { state: false })
    }
    if (rowData?.assetType === 'Prepare') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '3')
      navigate(`/partner-bussiness-type-prepare/${rowData?.asset_id}`, { state: false })
    }
    if (rowData?.assetType === 'Move') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      localStorage.setItem('asset_id', '2')
      navigate(`/partner-bussiness-type-move/${rowData?.asset_id}`, { state: false })
    }
  };
  
  const handleView = (rowData: any) => {
    // Handle view action for different asset types.
    if (rowData?.assetType === 'Store') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '1')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-registration/${rowData?.asset_id}`, { state: true })
    }
    if (rowData?.assetType === 'Prepare') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '3')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-bussiness-type-prepare/${rowData?.asset_id}`, { state: true })
    }
    if (rowData?.assetType === 'Move') {
      localStorage.setItem('country_id', rowData?.country_id)
      localStorage.setItem('asset_id', '2')
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate(`/partner-bussiness-type-move/${rowData?.asset_id}`, { state: true })
    }
  }

  const handleSubmit=(rowData:any)=>{
    console.log("ttttttt",rowData);
    
    setRowData(rowData)
    setAlert(true)
  }
  const handleConfirm=()=>{
    console.log("tttttttt8888",);
    
    PostSubmitDetails({status:"Final"})
  }
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
        return <td className='text-center' key={i} >
          {rowData?.status==='Final' ? null : <Button className='!p-3 pt-0 pb-0' onClick={() => handleEdit(rowData)}><EditIcon /></Button>}
          <Button className='!p-2' onClick={() => handleView(rowData)}><RemoveRedEyeIcon /></Button>
          <Button className='!p-2' onClick={() => handleDocs(rowData)}><TextSnippetIcon /></Button>
          <Button className='!p-2' onClick={()=>handleSubmit(rowData)}>Submit</Button>
        </td>;
      }
      return <td key={i} className='text-center'>{rowData[key]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    // Generates table data rows.
    return collection.map((rowData: any, index: any) => tableRows(rowData, index));
  };

  const headRow = () => {
    // Generates the header row.
    return Object.values(tableHead).map((title, index) => (
      <td key={index} className='text-center'>{title}</td>
    ));
  };

  // JSX structure for rendering the table and pagination.
useEffect(()=>{
console.log("SubmitResponse",SubmitResponse);
messageView(SubmitResponse?.message)
if(SubmitResponse?.status===200){
  setAlert(false)
}
fetchApi()
},[SubmitResponse?.status])
  return (
    <>
    <ToastContainer />
    {Alert && <div
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
          placeholder="Search Campaign"
          value={value}
          className='p-2 border-2 m-2'
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table className=''>
        <thead>
          <tr className='bg-[#0f3492] text-white det-header rounded-[13px] my-2 h-[40px]'>{headRow()}</tr>
        </thead>
        <tbody className="trhover bg-white">{tableData()}</tbody>
      </table>
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

export default TableLayout;
