/* 
* The code you provided is a TypeScript React component called `PartnerStoreList`. 
*/
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React, { useState } from 'react'
import LoaderSpinner from '@/components/LoaderSpinner';
import CustomerDetailModal from '@/components/layouts/Customer/CustomerDetailModal';
import TableLayoutPartner from '../PartnerTableLayout';
const tableHead = {
    id:"S.No",
    facility_manager_name: "Manager Name",
    facility_manager_contact:"Contact No",
    address:"Address",
asset_id: "Asset Id",
installation_year: "Installation Year",
  Action: "Action"
};
const PartnerStoreList = () => {
    const {token}:any =getToken();

    const { data:Store, loading:StoreLoad, error } = useApiFetch<any>('partner/store', token);
   console.log("FFFFFFF",Store);
   
  
  return (
    <div>
    {Store?.data?.length>0 &&   
<>
    <h4 className='text-head-title text-center'>Store Support List</h4>
<TableLayoutPartner AllStore={Store?.data?.length>0 && Store?.data} tableHead={tableHead} type="Store"/>
</>
}
  <div>
    {StoreLoad && <LoaderSpinner />}
  
  </div>
  </div>
  )
}

export default PartnerStoreList
