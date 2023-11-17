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
  /* The line `const {token}:any =getToken();` is extracting the `token` value from the `getToken()`
  function and assigning it to the `token` variable. The `:any` type annotation is used to specify
  that the `token` variable can have any type. */
  const {token}:any =getToken();

  /* The line `const { data:PrepareData, loading:PrepareLoad, error,refetch:refetchAgain } =
  useApiFetch<any>('customer/prepare/search', token);` is using the `useApiFetch` custom hook to
  fetch data from an API endpoint. */
  const { data:PrepareData, loading:PrepareLoad, error,refetch:refetchAgain } = useApiFetch<any>('customer/prepare/search', token);
 
  return (
    <div>     
        
      <>
        <h4 className='text-head-title text-center'>Prepare Ticket List</h4>
        {PrepareData?.data?.length>0 ? <TableLayoutCustomer refetchAgain={refetchAgain} AllStore={PrepareData?.data?.length>0 && PrepareData?.data}/>:<p>No Data found.</p>}
      </>
      <div>
        {PrepareLoad && <LoaderSpinner />}
      </div>
    </div>
  )
}

export default PrepareTicketList
