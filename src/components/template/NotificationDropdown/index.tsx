import useApiFetch from '@/store/customeHook/useApiFetch';
import { getToken } from '@/store/token';
import React, { useEffect, useState } from 'react'

const NotificationPage = () => {
    const data:any=[1,2,3,4,5,6,7,8,'9'];
    const {token}:any=getToken();
    const [inputData,setInputData]=useState<any>('')
    const [MapData,setMapData]=useState<any>([])
    const { data: ListOfNotification, loading: Notificationloading, error: PCerror } =
    useApiFetch<any>(`master/partner/prepare/get-product-category`, token);

    const itemsPerPage:any=4; 

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    let currentItems = MapData?.slice(indexOfFirstItem, indexOfLastItem) || [];
  
    const totalPages = Math.ceil(ListOfNotification?.data.length / itemsPerPage);
  
    const handlePageChange = (pageNumber:any) => {
      setCurrentPage(pageNumber);
    };
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
    const goToPreviousPage = () => {
        if (currentPage > 1) {
          handlePageChange(currentPage - 1);
        }
      };
    
      const goToNextPage = () => {
        if (currentPage < totalPages) {
          handlePageChange(currentPage + 1);
        }
      };
      function getYesterdayTodayOrDate(inputDate:any) {
        // Get the current date
        
        
        const currentDate = new Date();
      
        // Calculate yesterday's date
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
      
        // Check if the input date is equal to yesterday or today
        if (
          inputDate.getDate() === yesterday.getDate() &&
          inputDate.getMonth() === yesterday.getMonth() &&
          inputDate.getFullYear() === yesterday.getFullYear()
        ) {
          return "yesterday";
        } else if (
          inputDate.getDate() === currentDate.getDate() &&
          inputDate.getMonth() === currentDate.getMonth() &&
          inputDate.getFullYear() === currentDate.getFullYear()
        ) {
          return "today";
        } else {
          // If the input date is neither yesterday nor today, return the input date
          return inputDate;
        }
      }
      
      // Example usage:
      const inputDate = new Date(); // Replace this with your desired date
  
  function searchItems(query:any) {
    const results = [];
  
    for (const item of ListOfNotification?.data) {
      
      // Convert item name to lowercase and search query to lowercase for case-insensitive matching
      const itemName = item.name.toLowerCase();
      const searchQuery = query.toLowerCase();
  
      if (itemName.includes(searchQuery)) {
        results.push(item);
      }
    }
    currentItems=results;
  setMapData(results)
  }
  useEffect(()=>{
    if(ListOfNotification?.data){
      setMapData(ListOfNotification?.data)

    }
  },[ListOfNotification?.data])
      return (
    <div>
   <div className=" grid place-items-center">
  <div className="lg:w-full sm:w-full w-full   rounded-xl mx-auto  p-10 ">
    <div className="inline-flex items-center justify-between w-full">
      <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
        Notifications
      </h3>
      <form>
  <div className="flex">
    <label
      htmlFor="location-search"
      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
    >
      Your Email
    </label>
  
    <div
      id="dropdown-search-city"
      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
     
    </div>
    <div className="relative w-full">
      <input
        type="search"
        id='location-search"'
        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
        placeholder="Search..."
        onChange={(e:any)=>searchItems(e.target.value)}
        
        required
      />
      <button
        type="button"
        // onClick={()=>searchItems(inputData)}
        className="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span className="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>

    
    </div>
  
    {currentItems?.length>0 ? currentItems.map((item:any, index:any) => (
   <>
    <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
            alt="Training Icon"
            className="w-6 h-6 mr-3"
          />
          <h3 className="font-bold text-base text-gray-800">{item?.name}</h3>
        </div>
        <p className="text-xs text-gray-500">{item?.created_at}</p>
      </div>
      <p className="mt-1 text-sm">
        Hey! Do you remember about choosing your training regime?
      </p>
    </div>
   </>
    )) :<h3 className='mx-auto text-center my-auto'>No Data Found</h3>}
  
 
  
  </div>
{currentItems.length>0 &&  <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-8 text-sm  mx-auto w-full justify-center">
        <li>
          <a
             role='button'
         onClick={goToPreviousPage}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </a>
        </li>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <a
             role='button'
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === pageNumber
                  ? 'text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </a>
          </li>
        ))}
        <li>
          <a
             role='button'
          onClick={goToNextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-2.5 h-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </a>
        </li>
      </ul>
    </nav>}
</div>
<div>
    


    </div>
    </div>
  )
}

export default NotificationPage