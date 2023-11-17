/* The code is a React component called `MoveTicketList`. */
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'
import TableLayoutCustomer from '../TableLayoutCustomer';
import LoaderSpinner from '@/components/LoaderSpinner';

/**
 * The MoveTicketList component renders a table layout of move tickets fetched from an API, displaying
 * a loader spinner while the data is being fetched.
 * @returns The MoveTicketList component is returning a JSX element. It consists of a div container
 * that contains a heading, a table component (TableLayoutCustomer) if there is data available, and a
 * paragraph element displaying "No Data found" if there is no data available. It also includes a div
 * container that displays a loader spinner if the data is still loading.
 */
const MoveTicketList = () => {
  /* The line `const {token}:any =getToken();` is extracting the `token` value from the `getToken()`
  function and assigning it to the `token` variable. The `:any` type annotation is used to specify
  that the `token` variable can have any type. */
  const {token}:any =getToken();

  /* The line `const { data:MoveData, loading:MoveLoad, error,refetch:fetchAgain } =
  useApiFetch<any>('customer/move/search', token);` is using the `useApiFetch` custom hook to fetch
  data from an API endpoint. */
  const { data:MoveData, loading:MoveLoad, error,refetch:fetchAgain } = useApiFetch<any>('customer/move/search', token);
  
  return (
    <div>
                 
        
      <>
        <h4 className='text-head-title text-center'>Move Ticket List</h4>
        {MoveData?.data?.length>0 ? <TableLayoutCustomer fetchAgain={fetchAgain} AllStore={MoveData?.data?.length>0 && MoveData?.data}/>
        :<p>No Data found.</p>}
      </>
      <div>
        {MoveLoad && <LoaderSpinner />}
      </div>
    </div>
  )
}

export default MoveTicketList
