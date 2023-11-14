import React, { useRef, useState } from 'react';
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { cloneDeep } from 'lodash';
import "rc-pagination/assets/index.css";
import { Button } from '@/components/ui'; // Imports a Button component.
import { useNavigate } from 'react-router-dom';
import { apiUrl, getToken } from '@/store/token';
import { messageView } from '@/store/customeHook/validate';
import { ToastContainer } from 'react-toastify';

// Defines the table header with column names.
const tableHead = {
    id:"S.No",
    // date: "Date",
    description: "Description",
    status_id:"Status",
    is_deleted: "Query Status",
created_at: "Created At",
updated_at: "Updated At",
  // asset_type: "Asset Type",
  Action: "Action"
};

// The CustomerGeneralTableList component takes a prop called AllStore, presumably for rendering data.

const CustomerGeneralTableList = ({ AllStore,fetchDataG }: any) => {
     const {token}:any=getToken()
  let allData: any = AllStore || [];
  const countPerPage = 10;
  const [value, setValue] = React.useState("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData?.slice(0, countPerPage))
  );

  // Ref for a search function that filters data based on user input.
  const searchData = useRef(
    throttle(val => {
      const query = val.toLowerCase();
      setCurrentPage(1);
      const filteredData = cloneDeep(
        allData?.filter((item: any) =>
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
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData?.slice(from, to)));
  };

  const navigate = useNavigate();

  /**
   * The function `handleEdit` handles the edit action for different asset types and navigates to
   * different routes based on the asset type.
   * @param {any} rowData - The `rowData` parameter is an object that represents a row of data in a
   * table. It contains information about the asset being edited, such as its type, ID, and other
   * properties.
   */

  
  /**
   * The function `handleView` navigates to different routes based on the `asset_type_id` of the
   * `rowData` object.
   * @param {any} rowData - The `rowData` parameter is an object that represents a row of data. It is
   * used to determine the `asset_type_id` and pass it to the appropriate navigation route.
   */
  const handleView = (rowData: any) => {
    if (rowData?.asset_type_id==3) {
      navigate('/customer-prepare', {state:{data:rowData,disabled:true,extraForm:true} });
    }
    if (rowData?.asset_type_id==2) {

      navigate('/customer-move', {state:{data:rowData,disabled:true,extraForm:true} });

    }
    if (rowData?.asset_type_id==1) {

      navigate('/customer-store', {state:{data:rowData,disabled:true,extraForm:true} });

    }
  
  }
  const handleDelete=(id:any)=>{
    var myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${token}`);

var requestOptions:any = {
  method: 'DELETE',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${apiUrl}/customer/search/${id}`, requestOptions)
  .then(response => response.json())
  .then((result:any)=> {
    messageView(result?.message)
    fetchDataG()

})
  .catch(error => console.log('error', error));
  fetchDataG();
  }

  const tableRows = (rowData: any, index: any) => {
    // Generates table rows based on data.
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((key, i) => {
      // Renders table cells for each column in the header.
      if (key === 'contract_name') {
        return <td key={i} className='text-center'>{rowData.contract_name ? rowData.contract_name : 'Not Available' }</td>;
      }
      if (key === 'is_deleted') {
        return <td className='text-center' key={i} >{rowData.is_deleted==1 ? "Close" : 'Open'}</td>;
      }
      if (key === 'id') {
        return <td className='text-center' key={i} >{index+1}</td>;
      }
      if (key === 'status_id') {
        return <td className='text-center' key={i} >{rowData.status_id===1 ? "Pending" : rowData.status_id==2 ? "Review":"Done"}</td>;
      }
      if (key === 'contract_download') {
        
        return <td className='text-center' key={i} >{rowData?.contract_download  ? <a href={rowData?.contract_download || 'data:image/jpeg;base64,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'} download>Download</a> : "Not Available"}</td>;
      }
      if (key === 'comment') {
        
        return <td className='text-center' key={i} >{rowData?.comment  ? rowData?.comment  : 'Not Available'}</td>;
      }
      if (key === 'admin') {
        
        return <td className='text-center' key={i} >{rowData?.admin?.first_name  ? `${rowData?.admin?.first_name } ${rowData?.admin?.last_name}` : 'Not Available'}</td>;
      }
      if (key === 'Action') {
        return <td className='text-center' key={i} >
          {/* <Button className='!p-3 pt-0 pb-0' onClick={() => handleEdit(rowData)}>Edit</Button> */}
          {/* <Button className='!p-2' onClick={() => handleView(rowData)}>View</Button> */}
          <Button className='!p-2' disabled={rowData?.is_deleted===1} onClick={()=>handleDelete(rowData?.master_query_id)} >Close</Button>
        </td>;
      }
      return <td key={i} className='text-center'>{rowData[key]}</td>;
    });

    return <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">{columnData}</tr>;
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

  return (
    <>
    <ToastContainer />
      <div className="search bg-white">
        <label className='font-bold m-4'>Search:</label>
        <input
          placeholder="Search here..."
          value={value}
          className='p-2 border-2 m-2'
          onChange={e => setValue(e.target.value)}
        />
      </div>
      <table className='w-full'>
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
          total={allData?.length}
        />
      </div>
    </>
  )
}

export default CustomerGeneralTableList;
