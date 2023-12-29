/* The code is importing three things: */
import useApiFetch from '@/store/customeHook/useApiFetch'
import { messageView } from '@/store/customeHook/validate';
import { apiUrl, getToken } from '@/store/token';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom'

/**
 * The `StoreDetails` function is a React component that displays details of a store, including an
 * image, contact information, and status.
 * @returns The component `StoreDetails` is returning JSX elements that make up the UI of the
 * component. It includes div containers, headings, images, and text elements.
 */
const StoreDetails = () => {
    const {id}:any=useParams(); // Extracting endpoint of active URL to define payload for API call
    const {token}:any=getToken(); // Extracting token info to define payload for API call
    const location:any=useLocation();
    const [assetDetails,setAssetsDetails]=useState<any>({})
    let state:any=location?.state?.type;
    console.log("yyyyyyy",state);
    
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(`partner/store/${id}`, token);
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
if(fetchDetails?.data?.store){
    setAssetsDetails(fetchDetails?.data?.store)
}

  },[fetchDetails?.data?.store])
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
                    <h2 className="text-xl">Store Type Assets</h2>
                    <h2 className="text-gray-400 text-lg">{id}</h2>
                </div>
 
 
                <div className='w-[100%] lg:flex'>
                    <div className='w-[75%]'>
                        <div className='lg:flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Store</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Address</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.address}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Total Tonnage</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.total_tonnage}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">No Of Chamber</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.no_of_chambers || 0}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Ante Room Area</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.ante_room_area || 'N/A'}</h2>
                                </div>
                            </div>
                        </div>
                        <div className=' lg:flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Total office space</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.total_office_space || 'N/A'}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Type of dock</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.type_of_dock_id}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Processing Area</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.processing_area}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Parking Area</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.parking_area || 0}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Installation Year</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.installation_year || 'N/A'}</h2>
                                </div>
                            </div>
                        </div>
                        <div className='lg:flex justify-start'>
                            <div className=''>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Facility Manager Name</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.facility_manager_name || 'N/A'}</h2>
                                </div>
                            </div >
                            <div className=''>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Facility Manager Contact</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.facility_manager_contact || 'N/A'}</h2>
                                </div>
                            </div>
                           
                        </div>
 
 
                    </div>
                    <div className='lg:w-[25%] w-[100%] p-10'>
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

export default StoreDetails
