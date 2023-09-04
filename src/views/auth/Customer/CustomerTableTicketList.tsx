import LoaderSpinner from '@/components/LoaderSpinner';
import TableLayout from '@/components/layouts/TableLayout';
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'


const CustomerTableTicketList = () => {
  const {token}:any =getToken();
  const { data:Store, loading:StoreLoad, error } = useApiFetch<any>('partner/store', token);
  const { data:Move, loading:moveLoad, error:moveErr } = useApiFetch<any>('partner/move', token);
  const { data:Prepare, loading:prepLoad, error:prepErr } = useApiFetch<any>('partner/prepare', token);
  const { data:AllStore, loading:StoreRLoad, error:allerr }:any = useApiFetch<any>('master/asset', token);



  return (
    <>
  {AllStore?.data?.length>0 &&   
  <>
      <h4 className='text-head-title text-center'>Ticket List</h4>
  <TableLayout AllStore={AllStore?.data?.length>0 && AllStore?.data}/>
  </>
  }
    <div>
      {(moveLoad || prepLoad || StoreLoad ) && <LoaderSpinner />}
    
    </div>
    </>
  )
}

export default CustomerTableTicketList
