import Tags from '@/components/layouts/smallComponents/Tags';
import useApiFetch from '@/store/customeHook/useApiFetch';
import { messageView, messageViewNew } from '@/store/customeHook/validate';
import { apiUrl, getToken } from '@/store/token';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import AnnouncementIcon from '@mui/icons-material/Announcement';


const PrepareDetails = () => {
    const {id}:any=useParams(); // Extracting endpoint of active URL to define payload for API call
    const {token}:any=getToken(); // Extracting token info to define payload for API call
    const location:any=useLocation();
    const [assetDetails,setAssetsDetails]=useState<any>({})
    const [status,setStatus]=useState<any>("")
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
            setStatus("Approved")
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
            setStatus("DisApproved")
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

if(fetchDetails?.data?.prepare){
    setAssetsDetails(fetchDetails?.data?.prepare)
}

  },[fetchDetails?.data?.prepare])
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

<div className='p-4 rounded-lg mx-0 shadow-2xl'>
                

                <div className="flex gap-4">
                    <div className='w-[70%]'>
                        <img className="h-[19rem] w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg" alt="" />
                    </div>
                    <div className="grid  grid-cols-2 w-[40%] gap-4">
                        <div>
                            <img className=" h-[9rem] w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
                        </div>
                        <div>
                            <img className="h-[9rem] max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
                        </div>
                    
                    </div>
                </div>

        <div className='grid mt-10 gap-4 my-6 lg:grid-cols-4'>
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


    </div>








            <div className='bg-white p-4 rounded-lg mx-0 shadow-2xl'>
                <div className="w-[100%] pl-4 mt-10 mb-2">
                    <h2 className="text-xl">Prepare Type Assets</h2>
                    <h2 className="text-gray-400 text-lg">{id}</h2>
                </div>
 
 
                <div className='w-[100%]  flex'>
                    <div className='w-[75%]'>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Prepare</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Address</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.address || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Hourly Throughput</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.hourly_throughput || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Prepare Type</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.prepare_type_id || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Throughput</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.throughput  || 'Not Available'}</h2>
                                </div>
                            </div>
                            
                        </div>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">avg Case Size</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.avg_case_size  || 'Not Available'}</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">No of Docks</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.no_of_docks || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Minimum Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.temperature_min || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Maximum Temperature</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.temperature_max || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Batch Size</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.batch_size  || 'Not Available'}</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-4 mb-4">
                                    <h2 className="text-sm">Area</h2>
                                    <h2 className="text-gray-400 text-sm">{assetDetails?.area  || 'Not Available'}</h2>
                                </div>
                            </div>
                            
                        </div>
                     
 
                   
 
 
 
 
                    </div>
                    <div className='w-[25%] p-10'>
                    {localStorage.getItem('user_type')==='Customer' && <div className='m-auto text-center'>
                    {status &&     <div className=''>
                                <div className="w-[100%] pl-4  mb-4">
                                    <h2 className="text-sm">Status</h2>
                                    <h2 className="text-gray-400 text-sm">{status}</h2>
                                </div>
                            </div>}
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



                <div className='p-4 bg-white rounded-lg mx-0 shadow-2xl'>
                    <div className='ml-4'>
                    <h1 className='text-lg text-blue-800 mt-10 mb-4'>
                            Asset Rules
                        </h1>
                        <p className='font-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius unde cumque nisi dolorum atque quas corporis, molestias maxime possimus officiis minima natus sit quasi mollitia accusantium voluptatem fuga blanditiis illum?</p>
                    </div>
                    <div className='grid px-6 gap-4 grid-cols-4'>
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
    </div>
  )
}

export default PrepareDetails
