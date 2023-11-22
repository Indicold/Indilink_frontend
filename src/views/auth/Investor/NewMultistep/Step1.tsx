/* The above code is a TypeScript React component that represents Step 1 of a form for an investor. It
includes form fields for the amount of investment, business type, type (active or passive), area of
land, and location. It also includes functionality for handling form submission and navigation to
the next step. */
import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next'

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
 
    /**
     * The function `handlechange` is used to update the form data and additional locations based on
     * user input.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handlechange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
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
    /**
     * The function `handleRoute` checks the value of the `bussiness_type` key in the localStorage and
     * navigates to different routes based on its value.
     */
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
    const { t, i18n }:any = useTranslation();
    return (
        <div  className="bg-white">
            <h4 className=" mb-2 text-head-title text-center">{t("Investor")}
</h4>
            {/* The above code is a form component written in TypeScript and React using the Formik
            library. It renders a form with various input fields and radio buttons. The form has
            initial values set for the "field" property. It also has an onSubmit function that logs
            a message when the form is submitted. The form is wrapped in the Formik component, which
            provides form handling and validation functionality. Inside the Formik component, the
            form is rendered using the render prop pattern, where the form fields and buttons are
            defined. */}
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
                            label={t("Ammount Of Investment")}
                            className='mx-auto text-label-title pl-[22px]'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="Cold_Storage_Name"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder={t("Cold Storage Name")}
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
                            label= {t("Bussiness Type")}

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
                          {t("Store")}

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
                           {t("Move")}

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
                          {t("Prepare")}

                        </label>
                      </div>
                      </div>
                        </FormItem>
                        <div className="flex">
                        <FormItem
                            label={t("Type")}
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
           {t("Active")}

        </span>
        <span
          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
            isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
          }`}
        >
         
        {t("Passive")}

        </span>
      </label>
                        </FormItem>
                      
                        </div>
                        
                        <FormItem
                            label={t("Area Of Land")}
                            className=' text-label-title pl-[22px]'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="city"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder={t("Area Of Land")}
                                component={Input}
                            />
                        </FormItem>
                      
                        <FormItem
                            label={t("Location")}
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
                                  {t("Next")}

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