/* The code is a React component called `PrepareTicketList`. */
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';

/**
 * The function `PrepareTicketList` is a React component that fetches data from an API and renders a
 * table layout with the fetched data, or a message if no data is found.
 * @returns The component `PrepareTicketList` is returning JSX elements. It includes a heading, a
 * conditional rendering of a `TableLayoutCustomer` component based on the length of
 * `PrepareData.data`, and a loading spinner displayed when `PrepareLoad` is true.
 */
const PrepareTicketList = () => {
  const {token}:any =getToken(); // Extracting token for API call
  const { data:PrepareData, loading:PrepareLoad, error } = useApiFetch<any>('customer/prepare/search', token);
 
  return (
    <div>     
        
      <>
        <h4 className='text-head-title text-center'>Prepare Ticket List</h4>
        {PrepareData?.data?.length>0 ? <TableLayoutCustomer AllStore={PrepareData?.data?.length>0 && PrepareData?.data}/>:<p>No Data found.</p>}
      </>
      <div>
        {PrepareLoad && <LoaderSpinner />}
      </div>
    </div>
  )
}

export default PrepareTicketList
