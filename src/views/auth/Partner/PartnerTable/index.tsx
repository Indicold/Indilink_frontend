/* 
* The above code is a TypeScript React component that renders a table of assets. It imports various
* components and custom hooks, such as LoaderSpinner, TableLayout, getToken, and useApiFetch. It also
* imports React. 
*/
import LoaderSpinner from '@/components/LoaderSpinner';
import TableLayout from '@/components/layouts/TableLayout';
import { getToken } from '@/store/customeHook/token';
import useApiFetch from '@/store/customeHook/useApiFetch';
import React from 'react'


const PartnerTableAssetsList = () => {
  const {token}:any =getToken();
  const { data:Store, loading:StoreLoad, error } = useApiFetch<any>('partner/store', token);
  const { data:Move, loading:moveLoad, error:moveErr } = useApiFetch<any>('partner/move', token);
  const { data:Prepare, loading:prepLoad, error:prepErr } = useApiFetch<any>('partner/prepare', token);
  const { data:AllStore, loading:StoreRLoad, error:allerr }:any = useApiFetch<any>('master/asset', token);



  return (
    <>
  {AllStore?.data?.length>0 &&   
  <>
      <h4 className='text-head-title text-center'>Assets List</h4>
  <TableLayout AllStore={AllStore?.data?.length>0 && AllStore?.data}/>
  </>
  }
    <div>
      {(moveLoad || prepLoad || StoreLoad ) && <LoaderSpinner />}
        {/* <h4 className='text-head-title text-center'>Assets List</h4>
        <h5 className='text-head-title text-center'>Store</h5>
        <div className='w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3'>
                        <div className='bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2'>
                            <div className='mx-auto'>Asset Id</div>
                            <div className='mx-auto'>Manager Name</div>
                            <div className='mx-auto'>Manager contact</div>
                            <div className='mx-auto'>Address</div>
                            <div className='mx-auto'> No of Chambers</div>
                            <div className='mx-auto'>Edit</div>
                        </div>
                      {Store?.data?.length > 0 ? Store?.data?.map((item:any,index:any)=>(
                        <div className='listt flex w-full bg-white py-4 rounded-[13px]'>
                            <div className='mx-auto'>{item?.asset_id}</div>
                            <div className='mx-auto'>{item?.facility_manager_name}</div>
                            <div className='mx-auto'>{item?.facility_manager_contact}</div>
                            <div className='mx-auto'>{item?.address}</div>
                            <div className='mx-auto'>{item?.no_of_chambers}</div>
                            <div className='mx-auto mr-0 pr-10'>
                                Edit
                            </div>
                        </div>
                      )) : <p className="text-center">No assets of type Store</p> }
                       
                    </div>
        <h5 className='text-head-title text-center'>Move</h5>
        <div className='w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3'>
                        <div className='bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2'>
                            <div className='mx-auto'>Asset Id</div>
                            <div className='mx-auto'>Manager Name</div>
                            <div className='mx-auto'>Manager contact</div>
                            <div className='mx-auto'>Address</div>
                            <div className='mx-auto'> No of Chambers</div>
                            <div className='mx-auto'>Edit</div>
                        </div>
                      { Move?.data?.length > 0 ? Move?.data?.map((item:any,index:any)=>(
                        <div className='listt flex w-full bg-white py-4 rounded-[13px]'>
                            <div className='mx-auto'>{item?.asset_id}</div>
                            <div className='mx-auto'>{item?.facility_manager_name}</div>
                            <div className='mx-auto'>{item?.facility_manager_contact}</div>
                            <div className='mx-auto'>{item?.address}</div>
                            <div className='mx-auto'>{item?.no_of_chambers}</div>
                            <div className='mx-auto mr-0 pr-10'>
                                Edit
                            </div>
                        </div>
                      )) : <p className="text-center">No assets of type Move</p> }
                       
                    </div>      
        <h5 className='text-head-title text-center'>Prepare</h5>
        <div className='w-full bg-[#E1EFFE] py-2 rounded-b-[13px] mb-3'>
                        <div className='bg-[#0f3492] text-white det-header flex w-full py-2 rounded-[13px] my-2'>
                            <div className='mx-auto'>Asset Id</div>
                            <div className='mx-auto'>Manager Name</div>
                            <div className='mx-auto'>Manager contact</div>
                            <div className='mx-auto'>Address</div>
                            <div className='mx-auto'> No of Chambers</div>
                            <div className='mx-auto'>Edit</div>
                        </div>
                      {Prepare?.data?.length > 0 ? Prepare?.data?.map((item:any,index:any)=>(
                        <div className='listt flex w-full bg-white py-4 rounded-[13px]'>
                            <div className='mx-auto'>{item?.asset_id || "INDI0004882"}</div>
                            <div className='mx-auto'>{item?.facility_manager_name || "New User"}</div>
                            <div className='mx-auto'>{item?.facility_manager_contact || "9584737293"}</div>
                            <div className='mx-auto'>{item?.address || "ABC - New Town"}</div>
                            <div className='mx-auto'>{item?.no_of_chambers || "5"}</div>
                            <div className='mx-auto mr-0 pr-10'>
                                Edit
                            </div>
                        </div>
                      )) : <p className="text-center">No assets of type Prepare</p> }
                       
                    </div> */}


      





    </div>
    </>
  )
}

export default PartnerTableAssetsList
