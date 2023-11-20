/* The above code is importing various components from different modules and libraries. It is using
TypeScript with React to create a form container and form items. It is also importing the Field,
Form, and Formik components from the Formik library. The useState hook from React is also imported. */
import { FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react";


const Step3 = (props:any) => {
    const [formData, setFormData] = useState({
    });
    
    /**
     * The function `handlechange` is used to update the `formData` object with the new value from the
     * input field.
     * @param {any} e - The parameter `e` is an event object that is passed to the `handlechange`
     * function. It represents the event that triggered the function, such as a change event on an
     * input field.
     */
    const handlechange=(e:any)=>{
        const newData:any={...formData};
        newData[e.target.name]=e.target.value;
        // if(e.target.name==='Number_of_Additional'){
        //     setAdditionalLocations(e.target.value);
        // }
        setFormData(newData);
        
            }
        
    return (
        <div>
            <h2>Compliance Details (Section C)</h2>
            <Formik 
            initialValues={{field: true}}
            onSubmit={() => console.log("Submited via my onSubmit function")}
            
            >
                <Form className=" partner-details-container">
                    <FormContainer>
                        <FormItem
                            label="FSSAI License"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="fauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="flicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="ISO"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="iauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="ilicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="HACCP"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="hauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="hlicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Pest Control Agency Contract"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="pauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="plicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="BRC Audit or any other certification"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="bauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="blicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Fire Safety NOC"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="fauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="flicense"
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Pollution NOC"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="pauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="plicense"
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="MCD License"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="mauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="mlicense"
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="UP Cold Storage License"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="uauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                onChange={(e:any)=>handlechange(e)}
                                name="ulicense"
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Factory License"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="fauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="flicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Panchayat NOC"
                            className='mx-auto'
                        >
                            <div className="">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="pauthority"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Company/ Certifying Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="plicense"
                                onChange={(e:any)=>handlechange(e)}
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        {/* <AirCoolingUnitDetailModal /> */}
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default Step3;