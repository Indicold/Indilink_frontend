import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView } from '@/store/customeHook/validate';
import { apiUrl, getToken } from '@/store/token';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';

const MoveDetails = () => {
  const {id}:any=useParams(); // Extracting endpoint of active URL to define payload for API call
    const {token}:any=getToken(); // Extracting token info to define payload for API call
    const location:any=useLocation();
    const [assetDetails,setAssetsDetails]=useState<any>({})
    let state:any=location?.state?.type;
    
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/move/${id}`, token)
    const handleAccept=()=>{
        var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions :any= {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${apiUrl}/customer/accept-responses/${id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        if(result?.status===200){
          messageView("Data Updated Successfully !")
    
        }else{
          messageView(result?.message)
    
        }
      })
      .catch((error:any) =>{
        messageView(error?.message)
      });
      }
      const handleReject=()=>{
        var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    var requestOptions :any= {
      method: 'PUT',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch(`${apiUrl}/customer/reject-responses/${id}`, requestOptions)
      .then(response => response.json())
      .then(result =>{
        if(result?.status===200){
          messageView("Data Updated Successfully !")
    
        }else{
          messageView(result?.message)
    
        }
      })
      .catch((error:any) =>{
        messageView(error?.message)
      });
      }
  useEffect(()=>{

if(fetchDetails?.data?.move){
    setAssetsDetails(fetchDetails?.data?.move)
}

  },[fetchDetails?.data?.move])
  return (
<div>
      <div className='bg-blue-100 p-4 rounded-lg mx-0'>
                <div className="w-[100%] mt-10 mb-10 flex justify-between">
                    <h2 className="m-auto">Asset Detail</h2>
                </div>
 
                <div className='bg-blue-300 w-[90%] rounded-xl m-auto'>
                    <img className='w-[100%] rounded-xl h-[200px] m-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4Ft-C32AGQOgksE_AH71m-cup0EGPI8Y2w&usqp=CAU" alt="" />
                </div>
                <div className='bg-white p-1 w-[15%] ml-[10%] -mt-10 rounded-md m-auto'>
 
                    <img src="https://media.istockphoto.com/id/944026020/photo/high-tech-industrie-production-of-solar-cells-production-rooms-and-machines.jpg?s=612x612&w=is&k=20&c=vLLVn2kqKrkkNp40dY-uepQvLwqWbilVSPdhXYkD3HQ=" alt="" />
 
                </div>
 
            </div>
            <div className='bg-white p-4 rounded-lg mx-0'>
                <div className="w-[100%] pl-4 mt-10 mb-2">
                    <h2 className="text-xl">Move Type Assets</h2>
                    <h2 className="text-gray-400 text-lg">{id}</h2>
                </div>
 
 
                <div className='w-[100%]  flex'>
                    <div className='w-[75%]'>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Move</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Manufacture Year</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.mfg_month_year || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Chassis No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.chassis_no || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Vehical No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.vehicle_no || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Vehicle Class</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.vehicle_class}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Emission Norms</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.emission_norms}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Actual Payload</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.actual_payload || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Create Capacity</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.create_capacity || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Length</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.length || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Width</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.width}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Height</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hight}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">G V weight</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.gv_weight}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Weight In RC</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.unladen_weight_in_rc || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Engine No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.engine_no || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Side Door</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.side_door}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Hatch Window</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hatch_window || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.dual_temp_bulkhead}</h2>
                                </div>
                            </div>
                            
                        </div>
 
                   
 
 
 
 
                    </div>
                    <div className='w-[25%] p-10'>
                        <div className='m-auto'>
                        <button type="button" onClick={handleAccept} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Accept
                            </button>
                            <button type="button" onClick={handleReject} className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Reject
                            </button>
                          </div>
                        <div className='flex m-auto mt-4 gap-4'>
                            <div m-auto>1<img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/tag.png" alt="" /></div>
                            <div m-auto>2<img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/tag.png" alt="" /></div>
                            <div m-auto>3<img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/tag.png" alt="" /></div>
                        </div>
                    </div>
                </div>
               
 
 
 
            </div>
    </div>
  )
}

export default MoveDetails
