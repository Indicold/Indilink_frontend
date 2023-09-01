import React, { useRef, useState } from 'react'
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { cloneDeep } from 'lodash';
import "rc-pagination/assets/index.css";
import { Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
const tableHead = {
  asset_id: "Asset ID",
  is_registration_complete: "Registration",
  is_verified: "Is Verified",
  // is_deleted: "Is Deleted",
  // is_deletedBy: "Is Deleted By",
  createdAt: "Created At",
  updatedAt: "Updated At",
  asset_type: "Asset Type",
  Action: "Action"
};


const TableLayout = ({ AllStore }: any) => {
  let allData: any = AllStore;
  const countPerPage = 10;
  const [value, setValue] = React.useState("");

  const [currentPage, setCurrentPage] = React.useState(1);
  const [collection, setCollection] = React.useState(
    cloneDeep(allData.slice(0, countPerPage))
  );
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
    if (!value) {
      updatePage(1);
    } else {
      searchData.current(value);
    }
  }, [value]);



  const updatePage = (p: any) => {
    setCurrentPage(p);
    const to = countPerPage * p;
    const from = to - countPerPage;
    setCollection(cloneDeep(allData.slice(from, to)));
  };
  const navigate = useNavigate();
  const handleEdit = (rowData: any) => {
    console.log('rowDatarowData', rowData)
    if (rowData?.asset_type?.type === 'Store') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-registration', { state:false })
    }
    if (rowData?.asset_type?.type === 'Prepare') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-bussiness-type-prepare', { state:false })
    }
    if (rowData?.asset_type?.type === 'Move') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-bussiness-type-move', { state:false })
    }
  };
  const handleView = (rowData: any) => {
    console.log('rowDatarowData', rowData)
    if (rowData?.asset_type?.type === 'Store') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-registration', { state: true })
    }
    if (rowData?.asset_type?.type === 'Prepare') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-bussiness-type-prepare', { state: true })
    }
    if (rowData?.asset_type?.type === 'Move') {
      localStorage.setItem('assets_list_id', rowData?.asset_id)
      navigate('/partner-bussiness-type-move', { state: true })
    }
  }
  const tableRows = (rowData: any, index: any) => {
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((key, i) => {
      if (key === 'asset_type') {
        return <td key={i} className='text-center'>{rowData.asset_type.type}</td>;
      }
      if (key === 'is_registration_complete') {
        return <td className='text-center' key={i} >{rowData.is_registration_complete ? "Complete" : "Pending"}</td>;
      }
      if (key === 'Action') {
        return <td className='text-center' key={i} >
          <Button className='!p-3 pt-0 pb-0' onClick={() => handleEdit(rowData)}>Edit</Button>
          <Button className='!p-2' onClick={() => handleView(rowData)}>View</Button>
        </td>;
      }
      return <td key={i} className='text-center'>{rowData[key]}</td>;
    });

    return <tr key={index}>{columnData}</tr>;
  };

  const tableData = () => {
    return collection.map((rowData: any, index: any) => tableRows(rowData, index));
  };
  const headRow = () => {
    return Object.values(tableHead).map((title, index) => (
      <td key={index} className='text-center'>{title}</td>
    ));
  };


  return (
    <>
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

export default TableLayout
