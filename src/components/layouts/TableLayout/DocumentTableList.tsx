import React, { useRef, useState } from 'react';
import throttle from "lodash/throttle";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { cloneDeep } from 'lodash';
import "rc-pagination/assets/index.css";
import { Button } from '@/components/ui'; // Imports a Button component.
import { useNavigate } from 'react-router-dom';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DocumentViewModal from '@/views/auth/Partner/AssetsDocumentsTable/DocumentViewModal';
import DocumentEditModal from '@/views/auth/Partner/AssetsDocumentsTable/DocumentEdit';
// Defines the table header with column names.
const tableHead = {
  Id: "ID",
    asset_owner: "Owner",
    doc_id: "Document ID",
  // is_deleted: "Is Deleted",
  // is_deletedBy: "Is Deleted By",
  created_at: "Created",

  status: "Status",
  updated_at: "Updated At",
  Action: "Action"
};

// The DocumentTableList component takes a prop called AllStore, presumably for rendering data.

const DocumentTableList = ({ AllStore }: any) => {
  let allData: any = AllStore?.map((item:any, index:any) => ({
    ...item,
    Id: index + 1
  }));
  const countPerPage = 10;
  const [value, setValue] = React.useState("");
  const [modal,setModal]=useState<any>(false)
  const [modalEdit,setModalEdit]=useState<any>(false)
  const [data,setData]=useState<any>({})


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

 
  
  const handleView = (rowData: any) => {
    
    // Handle view action for different asset types.
    setModal(true)
    setData(rowData)
  
  }
  const handleEdit=(rowData:any)=>{
    setModalEdit(true)
    setData(rowData)
  }

  const tableRows = (rowData: any, index: any) => {
    // Generates table rows based on data.
    const tableCell = Object.keys(tableHead);
    const columnData = tableCell.map((key, i) => {
      // Renders table cells for each column in the header.
     
      if (key === 'createdAt') {
        return <td className='text-center' key={i} >{new Date(rowData.createdAt)?.toLocaleString()}</td>;
      }
      if (key === 'updatedAt') {
        return <td className='text-center' key={i} >{new Date(rowData.updatedAt)?.toLocaleString()}</td>;
      }
      if (key === 'Action') {
        return <td className='text-center' key={i} >
          <Button className='!p-2' onClick={() => handleView(rowData)}><VisibilityIcon /></Button>
          <Button className='!p-2' onClick={() => handleEdit(rowData)}><TextSnippetIcon /></Button>
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

  return (
    <>
    <DocumentEditModal modal={modalEdit} setModal={setModalEdit} data={data} />
    <DocumentViewModal modal={modal} setModal={setModal} data={data} />
      <div className="search bg-white">
        <label className='font-bold m-4'>Search:</label>
        <input
          placeholder="Search Campaign"
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
          total={allData.length}
        />
      </div>
    </>
  )
}

export default DocumentTableList;
