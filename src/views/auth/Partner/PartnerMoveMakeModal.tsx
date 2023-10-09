import usePostApi from '@/store/customeHook/postApi'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

const PartnerMoveMakeModal = ({setModal,fetchList,fetchmake}:any) => {
    const {
        result: MakeModelResponse,
        loading,
        sendPostRequest: AddMakeModel,
    }: any = usePostApi(`master/partner/move/add-make-model`)
    const [formData, setFormData] = useState({})

    const handleChange = (e:any) => {
        const newData:any = {...formData}
        newData[e.target.name] = e.target.value
        setFormData(newData)
        console.log("newData", newData)
    }

    const handleSave = () => {
        AddMakeModel(formData)
        setModal(false)
        fetchList();
        fetchmake();
    }
console.log("MakeModelResponse",MakeModelResponse);

    useEffect(() => {
        if(MakeModelResponse?.length>0){
            setModal(false)
            
           
        }
        fetchList();
            fetchmake();
    }, [MakeModelResponse,MakeModelResponse?.message])

  return (
    <div>
      <div>
            <ToastContainer />
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className="otp-modal fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="my-auto relative w-full max-w-[500px] max-h-full rounded-[13px]">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            onClick={() => setModal(false)}
                            type="button"
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            formformData-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className='p-4'>
                            <h4 className="text-head-title text-center mb-4">Add Make</h4>
                            <div className="border mx-auto flex h-11 w-1/2 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600 mb-3">
                            <input type="text" placeholder='Enter Make' name="make" className="w-2/3 border-0 focus:outline-0" onChange={handleChange} />
                            </div>
                            <div className="border mx-auto flex h-11 w-1/2 input input-md h-11 focus:ring-indigo-600 focus-within:ring-indigo-600 focus-within:border-indigo-600 focus:border-indigo-600">
                            <input type="text" placeholder='Enter Model' name="model" className="w-2/3 border-0 focus:outline-0" onChange={handleChange} />
                            </div>
                            <button onClick={handleSave} className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white radius-round h-11 px-8 py-2 indigo-btn m-4 !w-[200px] mx-auto rounded-[30px] w-full">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PartnerMoveMakeModal