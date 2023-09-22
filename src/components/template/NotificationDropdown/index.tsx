import React, { useState } from 'react'

const NotificationPage = () => {
    const data:any=[1,2,3,4,5,6,7,8,'9'];
    const itemsPerPage:any=4; 

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
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
  return (
    <div>
   <div className=" grid place-items-center my-8">
  <div className="lg:w-full sm:w-full w-full   rounded-xl mx-auto  p-10 ">
    <div className="inline-flex items-center justify-between w-full">
      <h3 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-white">
        Notifications
      </h3>
    
    </div>
  
    {currentItems.map((item:any, index:any) => (
   <>
    <div className="mt-2 px-6 py-4 bg-white rounded-lg shadow w-full">
      <div className=" inline-flex items-center justify-between w-full">
        <div className="inline-flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/128/763/763812.png"
            alt="Training Icon"
            className="w-6 h-6 mr-3"
          />
          <h3 className="font-bold text-base text-gray-800">Training</h3>
        </div>
        <p className="text-xs text-gray-500">{getYesterdayTodayOrDate(inputDate)}</p>
      </div>
      <p className="mt-1 text-sm">
        Hey! Do you remember about choosing your training regime?
      </p>
    </div>
   </>
    ))}
  
 
  
  </div>
  <nav aria-label="Page navigation example">
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
    </nav>
</div>
<div>
    


    </div>
    </div>
  )
}

export default NotificationPage
