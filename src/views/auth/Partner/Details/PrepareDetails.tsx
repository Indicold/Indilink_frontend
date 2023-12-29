import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView } from '@/store/customeHook/validate';
import { apiUrl, getToken } from '@/store/token';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
const PrepareDetails = () => {
    const {id}:any=useParams(); // Extracting endpoint of active URL to define payload for API call
    const {token}:any=getToken(); // Extracting token info to define payload for API call
    const location:any=useLocation();
    const [assetDetails,setAssetsDetails]=useState<any>({})
    let state:any=location?.state?.type;
    
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/prepare/${id}`, token)
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

if(fetchDetails?.data?.prepare){
    setAssetsDetails(fetchDetails?.data?.prepare)
}

  },[fetchDetails?.data?.prepare])
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
                    <h2 className="text-xl">Prepare Type Assets</h2>
                    <h2 className="text-gray-400 text-lg">{id}</h2>
                </div>
 
 
                <div className='w-[100%]  flex'>
                    <div className='w-[75%]'>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Prepare</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Address</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.address || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Hourly Throughput</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hourly_throughput || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Prepare Type</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.prepare_type_id || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Throughput</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.throughput}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">avg Case Size</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.avg_case_size}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">No of Docks</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.no_of_docks || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Minimum Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.temperature_min || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Maximum Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.temperature_max || 'N/A'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Batch Size</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.batch_size}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Area</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.area}</h2>
                                </div>
                            </div>
                            
                        </div>
                     
 
                   
 
 
 
 
                    </div>
                    <div className='w-[25%] p-10'>
                    {localStorage.getItem('user_type')==='Customer' && <div className='m-auto text-center'>
                        <button type="button" onClick={handleAccept} className="text-white bg-[green]  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Accept
                            </button>
                            <button type="button" onClick={handleReject} className="text-white bg-[red]  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Reject
                            </button>
                            </div>}
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

export default PrepareDetails
