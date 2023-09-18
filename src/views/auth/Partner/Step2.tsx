import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"
import MHEDetailsModal from "./MultistepForm/MHEDetails";

const Step2= (props:any) => {
    const [isSubmitting, setSubmitting] = useState(false);
    const [numChambers, setNumChambers] = useState(0);
    const handleNumChambers = (e:any) => {
        setNumChambers(e.target.value);
    }
    return (
        <div>
            <h2>Infra Details (Section B)</h2>
            <Formik>
                <Form className="py-2 multistep-form-step">
                    <FormContainer>
                        <FormItem
                            label="Total area of facility (acres)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="area"
                                placeholder="Total area of facility (acres)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Built up area (sqft)"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="barea"
                                placeholder="Built up area (sqft)"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Total number of chambers"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Total number of chambers"
                                component={Input}
                            />
                        </FormItem>
                        {Array.apply(null, { length: numChambers }).map((val, index)=>{
                            return (
                                <Button>
                                    {`Add Chamber details ${index+1}`}
                                </Button>
                            )
                        })}
                        <h3>Other Equipment Details</h3>
                        <h4>Data Logger Details</h4>
                        <FormItem
                            label="Data Logger Make"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Data Logger Make"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Internet enabled"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Internet enabled"
                                component={Input}
                            />
                        </FormItem>
                        <h4>Power Backup Details</h4>
                        <FormItem
                            label="Genset make"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Genset make"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Genset AMC Company"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Genset AMC Company"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Genset capacity"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Genset capacity"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Genset AMC"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Genset AMC"
                                component={Input}
                            />
                        </FormItem>
                        <h4>MHE Details</h4>
                        {/* Modal */}
                        <h3>Other Infrastructure Details</h3>
                        <FormItem
                            label="Vehicle Parking Area"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Vehicle Parking Area"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Truck Parking Area"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Truck Parking Area"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Office space"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Office space"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Computer Workstation"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Computer Workstation"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Internet"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Internet"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Wifi"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Wifi"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Printer"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Printer"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Printer Type"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Printer Type"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Security Guard"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Security Guard"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="CCTV"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="CCTV"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Driver area for food and resting"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Driver area for food and resting"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Nearby Weighbridge"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Nearby Weighbridge"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Wall/ Ceiling condition"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Wall/ Ceiling condition"
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label="Road condition from Main Road to Cold Storage"
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="chambers"
                                placeholder="Road condition from main road to cold storage"
                                component={Input}
                            />
                        </FormItem>
                        {/* <MHEDetailsModal /> */}
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default Step2;