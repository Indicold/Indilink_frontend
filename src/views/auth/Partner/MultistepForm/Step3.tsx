import { FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import RefrigerationDetailModal from "./RefrigerationDetailModal";
import AirCoolingUnitDetailModal from "./AirCoolingUnitDetailModal";

const Step3 = (props:any) => {
    return (
        <div>
            <h2>Compliance Details (Section C)</h2>
            <Formik>
                <Form className="py-2 multistep-form-step">
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="flicense"
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="ilicense"
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="hlicense"
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="plicense"
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="blicense"
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
                                name="fauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
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
                                name="pauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
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
                                name="mauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
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
                                name="uauthority"
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
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
                                placeholder="Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="flicense"
                                placeholder="Validity upto"
                                component={Input}
                            />
                            </div>
                        </FormItem>
                        <FormItem
                            label="Panchayat NOC"
                            className='mx-auto'
                        >
                            <div className="flex">
                            <Field
                                type="text"
                                autoComplete="off"
                                name="pauthority"
                                placeholder="Company/ Certifying Authority"
                                component={Input}
                            />
                            <Field
                                type="text"
                                autoComplete="off"
                                name="plicense"
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