import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React, { useState } from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';
import CustomerDetailModal from '@/components/layouts/Customer/CustomerDetailModal';

const StoreTicketList = () => {
    const {token}:any =getToken();

    const { data:Store, loading:StoreLoad, error } = useApiFetch<any>('customer/store/search', token);
   console.log("FFFFFFF",Store);
   
  
  return (
    <div>
      {Store?.data?.length>0 &&   
  <>
      <h4 className='text-head-title text-center'>Store Ticket List</h4>
  <TableLayoutCustomer AllStore={Store?.data?.length>0 && Store?.data}/>
  </>
  }
    <div>
      {StoreLoad && <LoaderSpinner />}
    
    </div>
    </div>
  )
}

export default StoreTicketList
