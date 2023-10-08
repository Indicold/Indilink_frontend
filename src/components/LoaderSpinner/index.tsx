import React from 'react'

const LoaderSpinner = () => {
  return (
    <div className="my-auto otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="flex flex-row items-center space-x-16 space-y-16 bg-white vh-100">
 
  <div className="flex">
    <div className="relative">
      <div
        className="w-12 h-12 rounded-full absolute
                      border-8 border-dashed border-gray-200"
      />
      <div
        className="w-12 h-12 rounded-full animate-spin absolute
                      border-8 border-dashed border-purple-500 border-t-transparent"
      />
    </div>
  </div>
</div>

    </div>
  )
}

export default LoaderSpinner
