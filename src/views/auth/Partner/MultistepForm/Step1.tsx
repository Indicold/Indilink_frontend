import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import MajorityHolderModal from "./MajorityHolderModal";
interface Props {
    additionalLocations: number;
  }
const Step1 = (props:any) => {
    const [modal,setModal]=useState<any>(false)
    const [isSubmitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
    });
    const handleSaveData = () => {
        // update values
    }
    const handlechange=(e:any)=>{
const newData:any={...formData};
newData[e.target.name]=e.target.value;
if(e.target.name==='Number_of_Additional'){
    setAdditionalLocations(e.target.value);
}
setFormData(newData);
console.log("hhhh5555",formData)
    }
    const [additionalLocations, setAdditionalLocations] = useState(0);
    const handleAdditionalLocations = (e:any) => {
        setAdditionalLocations(e.target.value);
    }
    return (
        <div >
            <h4 className=" mb-2 text-head-title text-center">Basic Details (Section A)</h4>
            <Formik
            initialValues={{field: true}}
            onSubmit={() => console.log("Submited via my onSubmit function")}
            
            >

                {({ handleSubmit }) => (
                <Form className="py-2 partner-details-container">
       <MajorityHolderModal modal={modal} setModal={setModal} />

                    <FormContainer>
                        <FormItem
                            label="Cold Storage Name"
                            className='mx-auto text-label-title'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Cold_Storage_Name"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Cold Storage Name"
                                component={Input}
                            />
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
                        <Button
                        type="button"
                            block
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                           onClick={()=>setModal(true)}
                        >
                          Majority Holder 1
                        </Button>
                        <Button
                         type="button"
                            block
                            variant="solid"
                            onClick={()=>setModal(true)}
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                          Majority Holder 2
                        </Button>
                        <Button
                         type="button"
                            block
                            onClick={()=>setModal(true)}
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                          Majority Holder 3
                        </Button>
                        </div>
                        <h4 className="mb-2 text-head-title mt-4">KEY MANAGEMENT TEAM Member Details</h4>
                        <div className="flex ">
                        <Button
                        type="button"
                            block
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                           onClick={()=>console.log("hello")}
                        >
                     Plant Manager
                        </Button>
                        <Button
                         type="button"
                            block
                            variant="solid"
                            className='indigo-btn signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                         Quality Control Head
                        </Button>
                        <Button
                         type="button"
                            block
                            variant="solid"
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