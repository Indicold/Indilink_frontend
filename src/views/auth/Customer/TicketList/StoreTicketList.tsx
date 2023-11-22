/* The code is importing various modules and components from different files and libraries. */
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React, { useState } from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';
import CustomerDetailModal from '@/components/layouts/Customer/CustomerDetailModal';

/**
 * The `StoreTicketList` component renders a table layout of store tickets fetched from an API,
 * displaying a loading spinner while the data is being fetched.
 * @returns The `StoreTicketList` component is returning a JSX element, which consists of a `<div>`
 * containing a `<h4>` heading, a conditional rendering of a `<TableLayoutCustomer>` component based on
 * the length of the `Store` data, and a `<div>` that displays a loading spinner if `StoreLoad` is
 * true.
 */
const StoreTicketList = () => {
    /* The line `const {token}:any =getToken();` is extracting the `token` value from the `getToken()`
    function and assigning it to the `token` variable. The `:any` type annotation is used to specify
    that the `token` variable can have any type. */
    const {token}:any =getToken();

    /* The line `const { data:Store, loading:StoreLoad, error,refetch:fetchagain } =
    useApiFetch<any>('customer/store/search', token);` is using the `useApiFetch` custom hook to
    fetch data from an API endpoint. */
    const { data:Store, loading:StoreLoad, error,refetch:fetchagain } = useApiFetch<any>('customer/store/search', token);
   
  return (
    <div>
        
      <>
        <h4 className='text-head-title text-center'>Store Ticket List</h4>
        {Store?.data?.length>0 ? <TableLayoutCustomer fetchagain={fetchagain} AllStore={Store?.data?.length>0 && Store?.data}/>
        :<p>No data found.</p>}
      </>
      <div>
        {StoreLoad && <LoaderSpinner />}
      </div>
    </div>
  )
}

export default StoreTicketList
