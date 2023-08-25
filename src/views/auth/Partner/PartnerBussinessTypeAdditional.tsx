import { Button, Dropdown, FormContainer, FormItem, Input } from '@/components/ui'
import useApiUpload from '@/store/customeHook/uploadApi';
import axios from 'axios';
import { File } from 'buffer'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react';

const PartnerBussinessTypeAdditional = () => {
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
      const array=[
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
      const handleFileChange=(e:any)=>{
          console.log("FILE",e.target.files[0]);
          
          setSelectedFile(e.target.files[0]);
      }
      const handleUpload = async (item:any) => {
          const formData = new FormData();
          formData.append(item?.key, selectedFile);
          formData.append('key', item?.key);
          formData.append('asset_id', 1);
      
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://seal-app-uqxwl.ondigitalocean.app/partner/register-partner-upload-doc',
            data: formData
          };
      
          try {
            const response = await axios.request(config);
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
onChange={handleFileChange}
/>
<button onClick={()=>handleUpload(item)}>Upload</button>
   </FormItem>
                ))}
          
              
             </div>
            
           
                    <div className="flex justify-center">
                 <Button
                           style={{ borderRadius: "13px" }}
                           block
                           variant="solid"
                           type="button"
                         //   onClick={handleRoute}
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
