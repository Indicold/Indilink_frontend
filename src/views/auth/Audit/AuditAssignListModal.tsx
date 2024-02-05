/* These lines of code are importing various custom hooks and libraries that are used in the component. */
import usePostApi from '@/store/customeHook/postApi';
import { TokenInfo, getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView } from '@/store/customeHook/validate';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuditAssignTableList from './AuditAssignTableList';
import DataNotFound from '@/components/layouts/DataNotFound';
import useApiFetch2 from '@/store/customeHook/useFetchApi2';

const AuditAssignListModal = ({setModal,assetData}:any) => {
    /* The line `const token:any = getToken();` is calling the `getToken()` function to retrieve the
    token value and assigning it to the `token` variable. The `any` type is used to indicate that
    the type of the `token` variable is not known at compile time. */
    const token:any = getToken();
    const {id}:any=useParams();
    const {user_id}:any=TokenInfo();
    const [gradeID, setGradeID] = useState('0')
    const {data:AuditAssignList} = useApiFetch2<any>(`audit/auditModulesss/${id}`, token.token);
    const {data:gradeByID} = useApiFetch2<any>(`audit/audit_grade/${gradeID}`, token.token);
    const { result: AddAssetOrderResponse, loading, sendPostRequest }:any = usePostApi('audit/addAssetOrder');
    const [AuditId,setAuditId]=useState<any>();
    const navigate:any=useNavigate();

    const handleRedirect = (rowData:any) => {
      console.log("TYYYYYYY",rowData);
      
      
        console.log("GGGGtttttttG",AuditId);
        if(rowData?.audit_module_id){
        //   const audit_temp_task_id:any=AuditList?.data?.filter((item:any)=>item?.id==AuditId)[0];
       localStorage.setItem('Asset_id',id);
      // localStorage.setItem("Asset_id",assetData?.data[0].id);
        // localStorage.setItem('audit_temp_task_id',audit_temp_task_id)
          navigate(`/audit-details/${rowData?.audit_module_id}`)

        }
     
    }

  /* The `return` statement is returning JSX (JavaScript XML) code, which represents the structure and
  content of the component's UI. */
  return (
    <div>
        <ToastContainer />
        <p>{AddAssetOrderResponse?.message}</p>
      <div className="flex justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none blur-bg-modal">
        <div className="relative w-full p-2 my-6 mx-auto lg:w-[800px] my-auto ">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-solid border-gray-300 rounded-t ">
              <h4 className="text-head-title w-full !text-center">Assign Audit To This Audit</h4>

              <button onClick={() => setModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="relative">
           {AuditAssignList?.data?.length>0 ? <AuditAssignTableList allData={AuditAssignList?.data} handleRedirect={handleRedirect} /> : <DataNotFound title="No Title" />}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuditAssignListModal
