/* The code is importing three things: */
import useApiFetch from '@/store/customeHook/useApiFetch'
import { getToken } from '@/store/token';
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
    // const {state}:any=useLocation();
    let state:any="Store"
    const {
        data: fetchDetails,
        loading: fetchDetailsloading,
        error: fetchDetailsSerror,
    } = useApiFetch<any>(state==='Store' ? `partner/store/${id}`: state==='Move' ? `partner/store/${id}` :`partner/store/${id}`, token)
  
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
                    <h2 className="text-xl">Title</h2>
                    <h2 className="text-gray-400 text-lg">Caption</h2>
                </div>
 
 
                <div className='w-[100%]  flex'>
                    <div className='w-[75%]'>
                        <div className='flex'>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Asset Type :</h2>
                                    <h2 className="text-gray-400 text-sm">Lorem Ipsum</h2>
                                </div>
                            </div >
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Year Running</h2>
                                    <h2 className="text-gray-400 text-sm">4</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Project Number</h2>
                                    <h2 className="text-gray-400 text-sm">PNB00001234</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Founder</h2>
                                    <h2 className="text-gray-400 text-sm">Even Yates</h2>
                                </div>
                            </div>
                            <div className='m-auto'>
                                <div className="w-[100%] pl-4 mt-10 mb-10">
                                    <h2 className="text-sm">Tranparancy</h2>
                                    <h2 className="text-gray-400 text-sm">Lorem Ipsum</h2>
                                </div>
                            </div>
                        </div>
 
 
                        <div className='flex'>
                            <div className='m-auto'>
 
 
                                <h2 className="text-xl">Contact</h2>
                                <h2 className="text-gray-400 text-sm">New Delhi , Inida </h2>
 
 
                            </div>
                            <div className='m-auto'>
                                <p>ravi@gmail.com</p>
 
                            </div>
                            <div className='m-auto'>
                                <p>+919393939393</p>
                            </div>
                            <div className='m-auto'>
                                <p>www.ravi.com</p>
                            </div>
                        </div>
 
                        <div className='p-4'>
                            <h2 className="text-xl">Status</h2>
                            <h2 className="text-yellow-500 text-sm">Medium</h2>
 
                        </div>
 
 
 
 
                    </div>
                    <div className='w-[25%] p-10'>
                        <div className='m-auto'>
                        <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Request Quote</button></div>
                        <div className='flex m-auto mt-4 bg-black gap-4'>
                            <div m-auto>1<img src="" alt="" /></div>
                            <div m-auto>1<img src="" alt="" /></div>
                            <div m-auto>1<img src="" alt="" /></div>
                        </div>
                    </div>
                </div>
 
 
 
 
            </div>
    </div>
  )
}

export default StoreDetails
