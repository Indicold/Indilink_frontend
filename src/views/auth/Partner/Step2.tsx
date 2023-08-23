import { Button, FormContainer, FormItem, Input } from "@/components/ui"
import { Field, Form, Formik } from "formik"
import { useState } from "react"

const Step2= (props:any) => {
    const [isSubmitting, setSubmitting] = useState(false)
    return (
        <div>
            <Formik>
                <Form>
                    <FormContainer>
                        <FormItem
                            label="GST No."
                            className='mx-auto'
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="gst"
                                placeholder="CIN No"
                                component={Input}
                            />
                        </FormItem>
                        <Button
                            block
                            loading={isSubmitting}
                            variant="solid"
                            className='signup-submit-btn mx-auto rounded-xl px-4 shadow-lg'
                        >
                            {isSubmitting
                                ? 'Saving Information...'
                                : 'Save'}
                        </Button>
                    </FormContainer>
                </Form>
            </Formik>
        </div>
    )
}

export default Step2;