import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom";

interface Props {
    additionalLocations: number;
  }
const Step1 = (props:any) => {
    const [modal,setModal]=useState<any>(false);
    const [num,setNum]=useState<any>(1)
    const [modalTeam,setModalTeam]=useState<any>(false);
    const [Holder,setHolder]=useState(1);
    const [Team,setTeam]=useState<any>(null);
    const [formData, setFormData] = useState({
    });
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }
 
    const handlechange=(e:any)=>{
const newData:any={...formData};
newData[e.target.name]=e.target.value;
if(e.target.name==='Number_of_Additional'){
    setAdditionalLocations(e.target.value);
}
setFormData(newData);
    }
    const [additionalLocations, setAdditionalLocations] = useState(0);
  
   
    const navigate=useNavigate();
    const handleRoute=()=>{
      if(localStorage.getItem('bussiness_type')==='Store'){
      navigate('/investor-bussiness-type-store')
        
      }
      if(localStorage.getItem('bussiness_type')==='Move'){
        navigate('/investor-bussiness-type-move')
          
        }
        if(localStorage.getItem('bussiness_type')==='Prepare'){
          navigate('/investor-bussiness-type-prepare')
            
          }
    }
    return (
        <div  className="bg-white">
            <h4 className=" mb-2 text-head-title text-center">Investor</h4>
            <Formik
            initialValues={{field: true}}
            onSubmit={() => console.log("Submited via my onSubmit function")}
            
            >

                {({ handleSubmit }) => (
                <Form className="py-2 partner-details-containerh ">
       {/* <MajorityHolderModal modal={modal} setModal={setModal} Holder={Holder}/> */}
       {/* <KeyTeamModal modal={modalTeam} setModal={setModalTeam} Team={Team} /> */}

                    <FormContainer>
                        <FormItem
                            label="Ammount Of Investment"
                            className='mx-auto text-label-title pl-[22px] pl-[22px]'
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
                        {/* <FormItem
                            label="Product Category"
                            className='mx-auto text-label-title pl-[22px]'
                        >
  
  <select
    id="countries"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  >
    <option selected>Choose a country</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
  </select>
                        </FormItem> */}
                        <FormItem
                            label="Bussiness Type"
                            className='mx-auto text-label-title pl-[22px]'
                        >
                            <div className="flex">
                            <div className="flex m-2 items-center mb-4 border-2 p-2 rounded-lg">
                        <input
                          id="default-radio-1"
                          type="radio"
                          defaultValue=""
                          checked={localStorage.getItem('bussiness_type')==='Store'}
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Store
                        </label>
                      </div>
                      <div className="flex m-2 items-center mb-4 border-2 p-2 rounded-lg">
                        <input
                          // defaultChecked
                          id="default-radio-2"
                          type="radio"
                          defaultValue=""
                          checked={localStorage.getItem('bussiness_type')==='Move'}
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Move
                        </label>
                      </div>
                      <div className="flex m-2 items-center mb-4 border-2 p-2 rounded-lg">
                        <input
                       checked={localStorage.getItem('bussiness_type')==='Prepare'}
                          id="default-radio-2"
                          type="radio"
                          defaultValue=""

                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Prepare
                        </label>
                      </div>
                      </div>
                        </FormItem>
                        <div className="flex">
                        <FormItem
                            label="Type"
                            className=' text-label-title pl-[22px]'
                        >
    <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
        <input
          type='checkbox'
          className='sr-only'
          onChange={handleCheckboxChange}
        />
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            !isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
          Active
        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
         
       Passive
        </span>
      </label>
                        </FormItem>
                      
                        </div>
                        
                        <FormItem
                            label="Area Of Land"
                            className=' text-label-title pl-[22px]'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="city"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Area of Land"
                                component={Input}
                            />
                        </FormItem>
                      
                        <FormItem
                            label="Location"
                            className='mx-auto text-label-title pl-[22px]'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="GPS"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="GPS"
                                component={Input}
                            />
                        </FormItem>
       <div className="flex justify-center">
                        <Button
                                  style={{ borderRadius: "13px" }}
                                  block
                                  variant="solid"
                                  type="button"
                                  onClick={handleRoute}
                                  className='indigo-btn w-[300px] mx-auto rounded-[30px]'
                              >
                                  Next
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