/* The code is a React component called `MoveTicketList`. */
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';

const MoveTicketList = () => {
  const {token}:any =getToken();
  const { data:MoveData, loading:MoveLoad, error } = useApiFetch<any>('customer/move/search', token);
 console.log("FFFFFFF",MoveData);
  return (
    <div>
                 
      {MoveData?.data?.length>0 &&   
  <>
      <h4 className='text-head-title text-center'>Move Ticket List</h4>
  <TableLayoutCustomer AllStore={MoveData?.data?.length>0 && MoveData?.data}/>
  </>
  }
    <div>
      {MoveLoad && <LoaderSpinner />}
    
    </div>
    </div>
  )
}

export default MoveTicketList
