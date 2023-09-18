import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import MajorityHolderModal from "./MajorityHolderModal";
import KeyTeamModal from "./KeyTeamModal"

const Step1 = (props:any) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        coldStorageName: "",
        companyName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        pin: ""
    });
    const handleSaveData = () => {
        // update values
    }
    const [additionalLocations, setAdditionalLocations] = useState(0);
    const handleAdditionalLocations = (e:any) => {
        setAdditionalLocations(e.target.value);
    }
    return (
        <div>
            <h2>Basic Details (Section A)</h2>
            <Formik>
                <Form className="py-2 multistep-form-step">
                    <FormContainer>
                        <FormItem
                            label="Cold Storage Name"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Cold Storage Name"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Company Name"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Company Name"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Address (line 1)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Address (line 1)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Address (line 2)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Address (line 2)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="City"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="City"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="State"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="State"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="PIN Code"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="PIN Code"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Closest Highway"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Closest Highway"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Distance from Closest Highway"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Distance from Closest Highway"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Distance from City Centre"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Distance from City Centre"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Number of Additional locations"
                            className='mx-auto'
                        >
                            <Field
                                type="number"
                                onChange={handleAdditionalLocations}
                                value={additionalLocations}
                                autoComplete="off"
                                name="gst"
                                placeholder="Number of Additional locations"
                                component={Input}
                            />
                        </FormItem>
                        {Array.apply(null, { length: additionalLocations }).map((index) => {
                            return (
                                <FormItem
                                    label={`Additional location`}
                                    className='mx-auto'
                                    key={index}
                                >
                                    <Field
                                        type="number"
                                        autoComplete="off"
                                        name="gst"
                                        placeholder="Additional location"
                                        component={Input}
                                    />
                                </FormItem>
                            )
                        })}
                        <FormItem
                            label="Location started in year"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="Location started in year"
                                component={Input}
                            />
                        </FormItem>
                        <h4>Management Team Details</h4>
                        <h5>Details of major stake holders</h5>
                        

                    </FormContainer>
                    {/* <MajorityHolderModal /> */}
                    {/* <KeyTeamModal /> */}
                </Form>
            </Formik>
        </div>
    )
}

export default Step1;