/* The code is a React component called `PrepareTicketList`. */
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';

const PrepareTicketList = () => {
  const {token}:any =getToken();
  const { data:PrepareData, loading:PrepareLoad, error } = useApiFetch<any>('customer/prepare/search', token);
  console.log("FFFFFFF",PrepareData);
 
  return (
    <div>     
      {PrepareData?.data?.length>0 &&   
      <>
        <h4 className='text-head-title text-center'>Prepare Ticket List</h4>
        <TableLayoutCustomer AllStore={PrepareData?.data?.length>0 && PrepareData?.data}/>
      </>}
      <div>
        {PrepareLoad && <LoaderSpinner />}
      </div>
    </div>
  )
}

export default PrepareTicketList
