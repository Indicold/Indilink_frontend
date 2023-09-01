import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import MajorityHolderModal from "./MajorityHolderModal";
import KeyTeamModal from "./KeyTeamModal";
import useApiFetch from "@/store/customeHook/useApiFetch";
import { getToken } from "@/store/customeHook/token";
interface Props {
    additionalLocations: number;
  }
const Step1 = (props:any) => {
    const {token}:any=getToken();
    
    const [modal,setModal]=useState<any>(false);
    const { data, loading, error } = useApiFetch<any>('master/partner/store/type-of-cold-storage', token);
    const [num,setNum]=useState<any>(1)
    const [modalTeam,setModalTeam]=useState<any>(false);
    const [Holder,setHolder]=useState(1);
    const [Team,setTeam]=useState<any>(null);
    const [formData, setFormData] = useState({
    });
 
    const handlechange=(e:any)=>{
const newData:any={...formData};
newData[e.target.name]=e.target.value;
if(e.target.name==='Number_of_Additional'){
    setAdditionalLocations(e.target.value);
}
setFormData(newData);
    }
    const [additionalLocations, setAdditionalLocations] = useState(0);
  
    const handleHolder=(value:any)=>{
        setHolder(value)
        setModal(true)
    }
    const handleTeam =(value:any)=>{
        setTeam(value);
        setModalTeam(true)
    }
    console.log("data",data?.data,error);
    
    return (
        <div >
            <h4 className=" mb-2 text-head-title text-center">Basic Details (Section A)</h4>
            <Formik
            initialValues={{field: true}}
            onSubmit={() => console.log("Submited via my onSubmit function")}
            
            >

                {({ handleSubmit }) => (
                <Form className="py-2 partner-details-container">
       <MajorityHolderModal modal={modal} setModal={setModal} Holder={Holder}/>
       <KeyTeamModal modal={modalTeam} setModal={setModalTeam} Team={Team} />

                    <FormContainer>
                        <FormItem
                            label="Cold Storage Name"
                            className='mx-auto text-label-title'
                        >
                            {/* <Field
                                type="text"
                                autoComplete="off"
                                name="Cold_Storage_Name"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Cold Storage Name"
                                component={Input}
                            />
                              <FormItem
                            label="Product Category"
                            className='mx-auto text-label-title'
                        > */}
  
  <select
    id="countries"
    name="Cold_Storage_Name"
    onChange={(e:any)=>handlechange(e)}
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected>Choose Cold Storage</option>
    {/* {dat} */}
    {data && data?.data.map((item:any,index:any)=>(
    <option value={item?.type}>{item?.type}</option>

    )

    )}
  
  </select>
                        </FormItem>
                        <FormItem
                            label="Company Name"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Company_Name"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Company Name"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Address (line 1)"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Address_line1"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Address (line 1)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Address (line 2)"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Address_line1"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Address (line 2)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="City"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="city"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="City"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="State"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="state"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="State"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="PIN Code"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="pin_code"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="PIN Code"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Closest Highway"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Closest_Highway"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Closest Highway"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Distance from Closest Highway"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Distance_from_closest"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Distance from Closest Highway"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Distance from City Centre"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Distance_from_City"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Distance from City Centre"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Number of Additional locations"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="number"
                                // onChange={handleAdditionalLocations}
                                value={additionalLocations}
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="Number_of_Additional"
                                placeholder="Number of Additional locations"
                                component={Input}
                            />
                        </FormItem>
         {Array.from({ length: additionalLocations }, (_, index) => (
    <FormItem
      label={`Additional location ${index + 1}`}
      className='mx-auto text-label-title'
      key={index}
    >
      <Field
        type="text"
        autoComplete="off"
        name={`additionalLocation${index}`}
        onChange={(e:any)=>handlechange(e)}
        placeholder={`Additional location ${index + 1}`}
        component={Input}
      />
    </FormItem>
  ))}
                        <FormItem
                            label="Location started in year"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Location_started"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Location started in year"
                                component={Input}
                            />
                        </FormItem>
                        <h4 className="mb-2 text-head-title">MANAGEMENT TEAM DETAILS - For a Private Limited Company</h4>
                        <div className="flex ">
                        {Array.apply(null, { length:num }).map((val, index) => {
                            return (
                                <Button type="button" className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg' onClick={() => handleHolder(index + 1)}>
                                    {` Majority Holder${index + 1}`}
                                </Button>
                            )
                        })}
                      
                      <Button
                        type="button"
                            block
                            variant="solid"
                            disabled={num==3}
                            className='w-[40px] indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                           onClick={()=>num<3 && setNum(num+1)}
                        >
                         +
                        </Button>
                       
                        </div>
                       
                        <h4 className="mb-2 text-head-title mt-4">KEY MANAGEMENT TEAM Member Details</h4>
                        <div className="flex ">
                        <Button
                        type="button"
                            block
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                           onClick={()=>handleTeam('plant-manger')}
                        >
                     Plant Manager
                        </Button>
                        <Button
                         type="button"
                            block
                            onClick={()=>handleTeam('quality-head')}
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                         Quality Control Head
                        </Button>
                        <Button
                         type="button"
                            block
                            variant="solid"
                            onClick={()=>handleTeam('marketing-Head')}
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                          Marketing Head
                        </Button>
                        </div>
                    </FormContainer>
                </Form>
                )}
            </Formik>
        </div>
    )
}

export default Step1;