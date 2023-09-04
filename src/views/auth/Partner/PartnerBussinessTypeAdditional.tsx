import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import { getToken } from '@/store/customeHook/token';
import useApiUpload from '@/store/customeHook/uploadApi';
import axios from 'axios';
import { File } from 'buffer'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PartnerBussinessTypeAdditional = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const navigate=useNavigate();
  
      let array1=[
          {
              label:"No Lien Certificate",
              placeholder:"Upload",
              key:"no_lien_cert",
           },
           {
              label:"Latest Electricity Bill",
              placeholder:"Upload",
              key:"latest_electricity_bill",
           },
           {
              label:"Structural Load Safety",
              placeholder:"Upload",
              key:"structural_load_safety_cert",
           }, {
              label:"Pest Control Agency Contract",
              placeholder:"Upload",
              key:"pest_control_agency_contract",
           },
           {
              label:"Insurance Certificate",
              placeholder:"Upload",
              key:"insurance_cert",
           },
           {
              label:"Facility Layout",
              placeholder:"Upload",
              key:"facility_layout",
           },
           {
              label:"Storage Temperature Record for Last Couple of Month ",
              placeholder:"Upload",
              key:"storage_temp_record",
           },
           {
              label:"3D view of the assets",
              placeholder:"Upload",
              key:"three_d_view_of_asset",
           }, {
              label:"Photo of the Assets",
              placeholder:"Upload",
              key:"photos_of_asset",
           },
          
      ]
      const [array,setArray]=useState<any>(array1)
      const handleFileChange=(e:any,item:any)=>{
          console.log("FILE",e.target.files[0]);
          
          setSelectedFile(e.target.files[0]);
          handleUpload(item,e.target.files[0])
      }
      const handleUpload = async (item:any,file:any) => {
         let AssetsId=localStorage.getItem('AssetsId');
         let asset_type_id=localStorage.getItem('asset_id')
         const { token } = getToken();
          const formData = new FormData();
          formData.append(item?.key, file);
          formData.append('key', item?.key);
          formData.append('asset_id', AssetsId || 'INDI01AAAA9');
          formData.append('asset_type_id',asset_type_id || '1');
      
          const headers = new Headers();
          headers.append('Authorization', `Bearer ${token}`);
          
          const config = {
              method: 'POST',
              body: formData,
              headers: headers,
          };
      
          try {
            const response = await fetch('https://seal-app-uqxwl.ondigitalocean.app/partner/register-partner-upload-doc', config);
            const responseData = await response.json();
          if (responseData?.status) {
              const updatedArray = array.map((itemData: any) =>
                  itemData.key === item.key ? { ...itemData, view: true,url:responseData?.data } : itemData
              );
              setArray(updatedArray); // Update the state with the modified array
          }
            setResponse(response.data);
            setError(null);
          } catch (error:any) {
            setError(error);
            setResponse(null);
          }
        };
  return (
    <div>
    <div  className="bg-white">
     <h4 className=" mb-2 text-head-title text-center">Additional Submissions</h4>
     <div>
 <Formik>
     <Form className="py-2 multistep-form-step">
         <FormContainer>
             <div className="flex flex-wrap">
                {array?.map((item:any,index:any)=>(
       <FormItem label={item?.label} key={index}
       className=' w-1/2 rounded-lg pl-[22px] flex '>

<input
type="file"
name={item?.key}
id="file-input"
className="block w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400
file:bg-transparent file:border-0
file:bg-gray-100 file:mr-4
file:py-3 file:px-4
dark:file:bg-gray-700 dark:file:text-gray-400"
onChange={(e:any)=>handleFileChange(e,item)}
/>
<div className='flex'>
{item?.view && <b>Status:</b>}
{/* <button type='button' onClick={()=>handleUpload(item)}>Upload</button> */}
{item?.view && <a href={`https://seal-app-uqxwl.ondigitalocean.app/${item?.url}`} target='_blank' >View</a>}
               </div>             
   </FormItem>
                ))}
          
              
             </div>
            
           
                    <div className="flex justify-center w-[140px] mx-auto">
                 <Button
                           style={{ borderRadius: "13px" }}
                           block
                           variant="solid"
                           type="button"
                           onClick={()=>navigate('/asset_list')}
                           className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                       >
                    Next
                       </Button>
                       </div>
         </FormContainer>
     </Form>
 </Formik>
</div>
 </div>
</div>
  )
}

export default PartnerBussinessTypeAdditional
