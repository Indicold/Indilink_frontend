/* 
* The code is a React component called `PartnerMoveList`. 
*/
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'
import LoaderSpinner from '@/components/LoaderSpinner';
import TableLayoutPartner from '../PartnerTableLayout';
const tableHead = {
    id:"S.No",
    permit_validity: "Permit Validity",
    pucc_validity:"PUCC Validity",
    chassis_no:"Chassis No",
asset_id: "Asset Id",
fitness_validity: "Fitness Validity",
  Action: "Action"
};

const PartnerMoveList = () => {
    const {token}:any =getToken();
    const { data:MoveData, loading:MoveLoad, error } = useApiFetch<any>('partner/move', token);
   console.log("FFFFFFF",MoveData);
  return (
    <div>
                 
      {MoveData?.data?.length>0 &&   
  <>
      <h4 className='text-head-title text-center'>Move Support List</h4>
  <TableLayoutPartner AllStore={MoveData?.data?.length>0 && MoveData?.data} tableHead={tableHead} type="Move"/>
  </>
  }
    <div>
      {MoveLoad && <LoaderSpinner />}
    
    </div>
    </div>
  )
}

export default PartnerMoveList
