import Tags from '@/components/layouts/smallComponents/Tags';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView, messageViewNew } from '@/store/customeHook/validate';
import { apiUrl, getToken } from '@/store/token';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AnnouncementIcon from '@mui/icons-material/Announcement';

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
          messageViewNew({message:"Data Updated Successfully !",status:200})
    
        }else{
          messageViewNew(result)
    
        }
      })
      .catch((error:any) =>{
        messageViewNew(error)
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
            messageViewNew({message:"Data Updated Successfully !",status:200})
    
        }else{
          messageViewNew(result)
    
        }
      })
      .catch((error:any) =>{
        messageViewNew(error)
      });
      }
  useEffect(()=>{

if(fetchDetails?.data?.move){
    setAssetsDetails(fetchDetails?.data?.move)
}

  },[fetchDetails?.data?.move])
  return (
<div>
<div className='mb-4'>

<h5><b>Asset Details</b></h5>

{/* <p>Please add the Invoice</p> */}

</div>
      {/* <div className='bg-blue-100 p-4 rounded-lg mx-0 shadow-2xl'>
                <div className="w-[100%] mt-4 mb-4 flex justify-between">
                    <h2 className="m-auto">Asset Detail</h2>
                </div>
 
                <div className='bg-blue-300 w-[90%] rounded-xl m-auto'>
                    <img className='w-[100%] rounded-xl h-[200px] m-auto' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz4Ft-C32AGQOgksE_AH71m-cup0EGPI8Y2w&usqp=CAU" alt="" />
                </div>
                <div className='bg-white p-1 w-[15%] ml-[10%] -mt-10 rounded-md m-auto'>
 
                    <img src="https://media.istockphoto.com/id/944026020/photo/high-tech-industrie-production-of-solar-cells-production-rooms-and-machines.jpg?s=612x612&w=is&k=20&c=vLLVn2kqKrkkNp40dY-uepQvLwqWbilVSPdhXYkD3HQ=" alt="" />
 
                </div>
 
            </div> */}



<div className='p-4 rounded-lg bg-white mx-0 shadow-2xl'>
                

                <div className="lg:flex gap-4">
                    <div className='lg:w-[70%] mb-4 w-full'>
                        <img className="lg:h-[19rem] w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:w-[40%] gap-4">
                        <div>
                            <img className="h-auto lg:h-[9rem] w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto lg:h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto lg:h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-auto lg:h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                        </div>
                    
                    </div>
                </div>

        <div className='grid mt-10 gap-4 my-6 grid-cols-2 lg:grid-cols-4'>
                {[1,2,3,4,5,6,7].map((item:any , index:any)=>{
                    return <div key={index} className='flex'>
                    <div className='bg-green-50 mx-2'><AnnouncementIcon className='mx-2 my-2'/></div>
                    <div>
                        <p className='font font-semibold text-black'>Asset Type</p>
                        <p>Cold Storage</p>
                    </div>
                </div>
                })}
        </div>

        <div>

<h1 className='text-lg text-blue-800 my-10'>
    Facilities
</h1>


    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        {[1,2,3,4,5,6,7,8,9,0].map((item:any ,index:any)=>{
            return <div key={index} className='relative'>
            <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
            <div className='pl-4 pb-2 absolute font-bold text-white bottom-0 left-0'>
                <p>Cold</p>
                <p>Storage</p>
            </div>
        </div>
        })}
    
    
    </div>

</div>

        <div className='ml-4'>
                <h1 className='text-lg text-blue-800 mt-10 mb-4'>
                        Asset Rules
                    </h1>
                    <p className='font-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius unde cumque nisi dolorum atque quas corporis, molestias maxime possimus officiis minima natus sit quasi mollitia accusantium voluptatem fuga blanditiis illum?</p>
                </div>
                <div className='grid px-6 gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                {[1,2,3,4,5,6,7,8].map((item:any , index:any)=>{
                            return <div key={index} className='pt-6 '>
                            <div className='w-12 h-12 bg-orange-100 rounded-full'><AnnouncementIcon className='mx-3 my-3 '/></div>
                            <div className='py-4'>
                                <p className='font font-semibold text-black'>Asset Type</p>
                                <p className='w-full font-light'>Lorem ipsum dm quas cupas repellendus ea tenetur.</p>
                            </div>
                        </div>
                        })}
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
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Move</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Manufacture Year</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.mfg_month_year || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Chassis No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.chassis_no || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Vehical No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.vehicle_no || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Vehicle Class</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.vehicle_class || 'Not Available'}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Emission Norms</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.emission_norms || 'Not Available'}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Actual Payload</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.actual_payload || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Create Capacity</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.create_capacity || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Length</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.length || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Width</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.width  || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Height</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hight  || 'Not Available'}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">G V weight</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.gv_weight  || 'Not Available'}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Weight In RC</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.unladen_weight_in_rc || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Engine No</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.engine_no || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Side Door</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.side_door  || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Hatch Window</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hatch_window || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.dual_temp_bulkhead  || 'Not Available'}</h2>
                                </div>
                            </div>
                            
                        </div>
 
                   
 
 
 
 
                    </div>
                    <div className='w-[25%] p-10'>
                    {localStorage.getItem('user_type')==='Customer' && <div className='m-auto text-center'>
                        <button type="button" onClick={handleAccept} className="text-white bg-[green]  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Approved
                            </button>
                            <button type="button" onClick={handleReject} className="text-white bg-[red]  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Disapproved
                            </button>
                            </div>}
                            <div className='flex m-auto mt-4 gap-4'>
                      <Tags/>
                       </div>
                    </div>
                </div>
               
 
 
 
            </div>


          
    </div>
  )
}

export default MoveDetails
